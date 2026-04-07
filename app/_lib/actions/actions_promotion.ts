"use server";

import { revalidatePath } from "next/cache";
import { getSupabaseServerClient } from "../supabase/server";

type PromotionUpdatePayload = {
  name: string;
  summary: string;
  paragraphs: string | string[];
  is_active?: boolean;
  isActive?: boolean;
};

export async function updatePromotion(formData: FormData) {
  // Overíme admina hneď na začiatku, aby sa ďalej nespracúvali neautorizované dáta.
  const supabase = await getSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user.email !== process.env.ADMIN_EMAIL) {
    return { success: false, message: "Nemáš oprávnenie na úpravu Noviniek." };
  }

  const slug = formData.get("slug")?.toString() || "novinky";
  const rawData = formData.get("data")?.toString();

  if (!rawData) {
    return { success: false, message: "Chýbajú dáta formulára." };
  }

  let payload: PromotionUpdatePayload;
  try {
    payload = JSON.parse(rawData);
  } catch {
    return { success: false, message: "Neplatný formát dát formulára." };
  }

  if (
    typeof payload.name !== "string" ||
    typeof payload.summary !== "string" ||
    (!Array.isArray(payload.paragraphs) && typeof payload.paragraphs !== "string") ||
    (payload.is_active !== undefined && typeof payload.is_active !== "boolean") ||
    (payload.isActive !== undefined && typeof payload.isActive !== "boolean")
  ) {
    return { success: false, message: "Neplatná štruktúra dát." };
  }

  // Odseky zjednotíme na pole stringov, aby DB aj frontend používali rovnaký formát.
  const normalizedParagraphs = Array.isArray(payload.paragraphs)
    ? payload.paragraphs.map((item) => item.trim()).filter(Boolean)
    : payload.paragraphs
        .split(/\r?\n\s*\r?\n|\r?\n/)
        .map((item) => item.trim())
        .filter(Boolean);

  // Načítame existujúci content, aby sa zachovali aj ďalšie prípadné kľúče.
  const { data: existingItem, error: existingItemError } = await supabase
    .from("service_items")
    .select("content")
    .eq("slug", slug)
    .single();

  if (existingItemError) {
    return {
      success: false,
      message: `Chyba pri načítaní položky: ${existingItemError.message}`,
    };
  }

  const currentContent =
    existingItem?.content && typeof existingItem.content === "object"
      ? (existingItem.content as Record<string, unknown>)
      : {};

  // Zjednotíme oba názvy kľúča z klienta na jeden DB stĺpec is_active.
  const normalizedIsActive =
    payload.is_active ?? payload.isActive ?? false;

  const { data: updatedRows, error: updateError } = await supabase
    .from("service_items")
    .update({
      name: payload.name.trim(),
      summary: payload.summary.trim(),
      is_active: normalizedIsActive,
      content: {
        ...currentContent,
        paragraphs: normalizedParagraphs,
      },
    })
    .eq("slug", slug)
    .select("slug");

  if (updateError) {
    return {
      success: false,
      message: `Chyba pri aktualizácii Noviniek: ${updateError.message}`,
    };
  }

  if (!updatedRows || updatedRows.length === 0) {
    return { success: false, message: "Žiadna položka nebola aktualizovaná." };
  }

  revalidatePath("/", "layout");
  revalidatePath("/promotion");
  revalidatePath("/admin/promotions_settings");

  return { success: true, message: "Novinky boli úspešne aktualizované." };
}
