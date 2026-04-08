"use server";

import { revalidatePath } from "next/cache";
import { getSupabaseServerClient } from "../supabase/server";

type KyselinaHyaluronovaUpdatePayload = {
  name: string;
  paragraphs: string | string[];
  is_active: boolean;
};

// Jedna spoločná update funkcia pre všetky sekcie kyseliny hyalurónovej,
// aby bola logika validácie, normalizácie a ukladania konzistentná.
async function updateKyselinaHyaluronovaGeneric(
  formData: FormData,
  slugDefault: string,
) {
  // Vytvoríme serverového Supabase klienta a overíme admina,
  // aby obsah nemohol meniť neprihlásený používateľ.
  const supabase = await getSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user.email !== process.env.ADMIN_EMAIL) {
    throw new Error("Unauthorized");
  }

  const slug = formData.get("slug")?.toString() || slugDefault;
  const rawData = formData.get("data")?.toString();
  const imageFile = formData.get("image_file");

  if (!rawData) {
    throw new Error("Chýbajú dáta pre Kyselina hyalurónová");
  }

  let payload: KyselinaHyaluronovaUpdatePayload;
  try {
    payload = JSON.parse(rawData);
  } catch {
    throw new Error("Neplatné dáta formulára");
  }

  if (
    typeof payload.name !== "string" ||
    (!Array.isArray(payload.paragraphs) &&
      typeof payload.paragraphs !== "string") ||
    typeof payload.is_active !== "boolean"
  ) {
    throw new Error("Neplatná štruktúra dát");
  }

  // Odseky z textarea prevedieme na čisté pole stringov,
  // aby sme mali v content.paragraphs rovnaký formát vo všetkých sekciách.
  const normalizedParagraphs = Array.isArray(payload.paragraphs)
    ? payload.paragraphs
        .map((paragraph) =>
          typeof paragraph === "string" ? paragraph.trim() : "",
        )
        .filter(Boolean)
    : payload.paragraphs
        .split(/\r?\n\s*\r?\n|\r?\n/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean);

  // Spracujeme nahratý obrázok iba vtedy, ak admin vybral nový súbor.
  let uploadedImageUrl: string | null = null;

  if (imageFile && imageFile instanceof File && imageFile.size > 0) {
    const maxFileSize = 5 * 1024 * 1024;
    const allowedMimeTypes = ["image/jpeg", "image/png", "image/webp"];

    if (imageFile.size > maxFileSize) {
      throw new Error("Obrázok je príliš veľký (max 5MB)");
    }

    if (!allowedMimeTypes.includes(imageFile.type)) {
      throw new Error("Nepovolený typ obrázka (povolené JPG, PNG alebo WebP)");
    }

    const fileName = `${slug}-${Date.now()}-${imageFile.name}`.replace(
      /\s/g,
      "-",
    );

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("BRImages")
      .upload(fileName, imageFile, {
        cacheControl: "3600",
        upsert: true,
      });

    if (uploadError) {
      throw new Error(`Chyba pri nahrávaní obrázka: ${uploadError.message}`);
    }

    const { data: signedData, error: signedError } = await supabase.storage
      .from("BRImages")
      .createSignedUrl(uploadData.path, 157680000);

    if (signedError || !signedData?.signedUrl) {
      throw new Error(
        `Chyba pri vytváraní URL obrázka: ${signedError?.message ?? "Neznáma chyba"}`,
      );
    }

    uploadedImageUrl = signedData.signedUrl;
  }

  const { data: existingItem, error: existingItemError } = await supabase
    .from("service_items")
    .select("content")
    .eq("slug", slug)
    .single();

  if (existingItemError) {
    throw new Error(`Chyba pri načítaní položky: ${existingItemError.message}`);
  }

  const currentContent =
    existingItem?.content && typeof existingItem.content === "object"
      ? (existingItem.content as Record<string, unknown>)
      : {};

  const { data: updatedRows, error: updateError } = await supabase
    .from("service_items")
    .update({
      name: payload.name.trim(),
      is_active: payload.is_active,
      content: {
        ...currentContent,
        paragraphs: normalizedParagraphs,
      },
      ...(uploadedImageUrl ? { image_url: uploadedImageUrl } : {}),
    })
    .eq("slug", slug)
    .select("slug");

  if (updateError) {
    throw new Error(
      `Chyba pri aktualizácii Kyselina hyalurónová: ${updateError.message}`,
    );
  }

  if (!updatedRows || updatedRows.length === 0) {
    throw new Error("Žiadna položka nebola aktualizovaná");
  }

  // Revalidujeme verejné aj admin stránky, aby sa zmeny prejavili hneď.
  revalidatePath("/", "layout");
  revalidatePath("/medical-cosmetics/kyselina-hyaluronova");
  revalidatePath("/medical-cosmetics/kyselina-hyaluronova/lips");
  revalidatePath("/medical-cosmetics/kyselina-hyaluronova/face");
  revalidatePath("/admin/medical-cosmetics_settings/kyselina-hyaluronova_settings");

  return {
    success: true,
    message: "Kyselina hyalurónová bola aktualizovaná.",
  };
}

export async function updateKyselinaHyaluronova(formData: FormData) {
  return updateKyselinaHyaluronovaGeneric(formData, "kyselina-hyaluronova");
}

export async function updateKyselinaHyaluronovaLips(formData: FormData) {
  return updateKyselinaHyaluronovaGeneric(
    formData,
    "kyselina-hyaluronova-lips",
  );
}

export async function updateKyselinaHyaluronovaFace(formData: FormData) {
  return updateKyselinaHyaluronovaGeneric(
    formData,
    "kyselina-hyaluronova-face",
  );
}
