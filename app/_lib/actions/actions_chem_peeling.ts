"use server";

import { revalidatePath } from "next/cache";
import { getSupabaseServerClient } from "../supabase/server";

type ChemicalPeelingUpdatePayload = {
  name: string;
  paragraphs: string | string[];
  is_active: boolean;
};

export async function updateChemicalPeeling(formData: FormData) {
  // Vytvoríme serverového Supabase klienta, aby sme vedeli pracovať
  // s aktuálnou session používateľa aj s databázou priamo na serveri.
  const supabase = await getSupabaseServerClient();

  // Zistíme, kto odoslal formulár. Ukladanie chceme povoliť iba adminovi,
  // aby obsah webu nemohol meniť neprihlásený alebo nesprávny používateľ.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user.email !== process.env.ADMIN_EMAIL) {
    throw new Error("Unauthorized");
  }

  // Z formulára si vytiahneme slug záznamu a JSON string s dátami.
  // Slug určuje, ktorý riadok v service_items sa má aktualizovať.
  const slug = formData.get("slug")?.toString() || "chemical-peeling";
  const rawData = formData.get("data")?.toString();
  const imageFile = formData.get("image_file");

  // Ak data vôbec neprišli, nemáme čo spracovať ani uložiť.
  if (!rawData) {
    throw new Error("Chýbajú dáta pre Chemical Peeling");
  }

  let payload: ChemicalPeelingUpdatePayload;

  // Formulár posiela obsah ako JSON text, preto ho musíme premeniť
  // na objekt. Ak parse zlyhá, dáta prišli v neplatnom formáte.
  try {
    payload = JSON.parse(rawData);
  } catch {
    throw new Error("Neplatné dáta formulára");
  }

  // Overíme základnú štruktúru payloadu, aby sme na serveri nepracovali
  // s neúplnými alebo nesprávnymi dátami. Server si to kontroluje sám,
  // nestačí sa spoliehať len na klientský formulár.
  if (
    typeof payload.name !== "string" ||
    (!Array.isArray(payload.paragraphs) &&
      typeof payload.paragraphs !== "string") ||
    typeof payload.is_active !== "boolean"
  ) {
    throw new Error("Neplatná štruktúra dát");
  }

  // Text odsekov zjednotíme do poľa stringov.
  // Robí sa to preto, že formulár pracuje s textarea ako s jedným textom,
  // ale v databáze a na fronte sa paragraphs používa ako pole odsekov.
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

  // Načítame existujúci content, aby sme pri update neprepísali celý objekt,
  // ale zachovali aj ostatné kľúče, ktoré môžu byť v content uložené.
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

  let uploadedImageUrl: string | undefined;

  if (imageFile && imageFile instanceof File && imageFile.size > 0) {
    // Jednoduchá ochrana pre veľkosť a typ súboru.
    const maxFileSize = 5 * 1024 * 1024;
    const allowedMimeTypes = ["image/jpeg", "image/png", "image/webp"];

    if (imageFile.size > maxFileSize) {
      throw new Error("Obrázok je príliš veľký (max 5 MB)");
    }

    if (!allowedMimeTypes.includes(imageFile.type)) {
      throw new Error("Podporované sú iba formáty JPG, PNG a WEBP");
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

    const { data: signed, error: signedError } = await supabase.storage
      .from("BRImages")
      .createSignedUrl(uploadData.path, 157680000);

    if (signedError) {
      throw new Error(
        `Chyba pri generovaní signed URL: ${signedError.message}`,
      );
    }

    uploadedImageUrl = signed.signedUrl;
  }

  // Uložíme nové hodnoty do databázy. Name a is_active prepíšeme priamo,
  // content poskladáme zo starého objektu a nahradíme len paragraphs,
  // aby sme zbytočne nevymazali iné uložené dáta.
  const { data: updatedRows, error: updateError } = await supabase
    .from("service_items")
    .update({
      name: payload.name.trim(),
      is_active: payload.is_active,
      ...(uploadedImageUrl ? { image_url: uploadedImageUrl } : {}),
      content: {
        ...currentContent,
        paragraphs: normalizedParagraphs,
      },
    })
    .eq("slug", slug)
    .select("slug");

  if (updateError) {
    throw new Error(
      `Chyba pri aktualizácii Chemical Peeling: ${updateError.message}`,
    );
  }

  if (!updatedRows || updatedRows.length === 0) {
    throw new Error("Žiadna položka nebola aktualizovaná");
  }

  // Po úspešnom update vyčistíme cache dotknutých stránok,
  // aby sa nové dáta zobrazili hneď bez čakania na ďalší deploy alebo refresh cache.
  revalidatePath("/", "layout");
  revalidatePath("/about");
  revalidatePath("/admin/chemical-peeling");

  // Klientovi vrátime jednoduchú úspešnú odpoveď, aby mohol zobraziť toast.
  return {
    success: true,
    message: "Chemical Peeling bolo aktualizované.",
  };
}