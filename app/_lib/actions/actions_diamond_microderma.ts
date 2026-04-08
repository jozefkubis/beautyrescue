"use server";

import { revalidatePath } from "next/cache";
import { getSupabaseServerClient } from "../supabase/server";

type DiamondMicrodermabrasionUpdatePayload = {
  name?: string;
  content?: {
    intro?: string;
    paragraphs?: string[];
  };
  attributes?: {
    benefits?: string[];
  };
  is_active?: boolean;
};

export async function updateDiamondMicrodermabrasion(formData: FormData) {
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
  const slug = formData.get("slug")?.toString() || "diamond-microdermabrasion";
  const rawData = formData.get("data")?.toString();
  const imageFile = formData.get("image_file");

  // Ak data vôbec neprišli, nemáme čo spracovať ani uložiť.
  if (!rawData) {
    throw new Error("Chýbajú dáta pre Diamantová mikrodermabrázia");
  }

  let payload: DiamondMicrodermabrasionUpdatePayload;

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
    (!Array.isArray(payload.content?.paragraphs) &&
      typeof payload.content?.intro !== "string") ||
    (!Array.isArray(payload.attributes?.benefits) &&
      typeof payload.attributes?.benefits !== "string") ||
    typeof payload.is_active !== "boolean"
  ) {
    throw new Error("Neplatná štruktúra dát pre Diamantová mikrodermabrázia");
  }

  // Text odsekov zjednotíme do poľa stringov.
  // Robí sa to preto, že formulár pracuje s textarea ako s jedným textom,
  // ale v databáze a na fronte sa paragraphs používa ako pole odsekov.
  const normalizedParagraphs = Array.isArray(payload.content?.paragraphs)
    ? payload.content.paragraphs
        .map((paragraph) =>
          typeof paragraph === "string" ? paragraph.trim() : "",
        )
        .filter(Boolean)
    : typeof payload.content?.paragraphs === "string"
      ? (payload.content.paragraphs as string)
          .split(/\r?\n\s*\r?\n|\r?\n/)
          .map((paragraph) => paragraph.trim())
          .filter(Boolean)
      : [];

  const normalizedBenefits = Array.isArray(payload.attributes?.benefits)
    ? payload.attributes.benefits
        .map((benefit) => (typeof benefit === "string" ? benefit.trim() : ""))
        .filter(Boolean)
    : typeof payload.attributes?.benefits === "string"
      ? (payload.attributes.benefits as string)
          .split(/\r?\n\s*\r?\n|\r?\n/)
          .map((benefit) => benefit.trim())
          .filter(Boolean)
      : [];

  // Načítame existujúci content, aby sme pri update neprepísali celý objekt,
  // ale zachovali aj ostatné kľúče, ktoré môžu byť v content uložené.
  const { data: existingItem, error: existingItemError } = await supabase
    .from("service_items")
    .select("content, attributes")
    .eq("slug", slug)
    .single();

  if (existingItemError) {
    throw new Error(`Chyba pri načítaní položky: ${existingItemError.message}`);
  }

  const currentContent =
    existingItem?.content && typeof existingItem.content === "object"
      ? (existingItem.content as Record<string, unknown>)
      : {};

  const currentAttributes =
    existingItem?.attributes && typeof existingItem.attributes === "object"
      ? (existingItem.attributes as Record<string, unknown>)
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

    // Názov súboru skladáme zo slugu + času, aby sme minimalizovali kolízie.
    // Medzery nahradíme pomlčkami, aby bol názov bezpečný pre URL aj storage.
    const fileName = `${slug}-${Date.now()}-${imageFile.name}`.replace(
      /\s/g,
      "-",
    );

    // Obrázok uložíme do bucketu BRImages.
    // upsert: true znamená, že pri rovnakej ceste sa súbor prepíše.
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("BRImages")
      .upload(fileName, imageFile, {
        cacheControl: "3600",
        upsert: true,
      });

    if (uploadError) {
      throw new Error(`Chyba pri nahrávaní obrázka: ${uploadError.message}`);
    }

    // Pre uložený súbor vygenerujeme signed URL s dlhou platnosťou,
    // ktorú následne uložíme do image_url v databáze.
    const { data: signedData, error: signedError } = await supabase.storage
      .from("BRImages")
      .createSignedUrl(uploadData.path, 157680000);

    if (signedError || !signedData?.signedUrl) {
      throw new Error(
        `Chyba pri generovaní signed URL: ${signedError?.message ?? "Neznáma chyba"}`,
      );
    }

    uploadedImageUrl = signedData.signedUrl;
  }

  // Uložíme nové hodnoty do databázy. Name a is_active prepíšeme priamo,
  // content poskladáme zo starého objektu a nahradíme len paragraphs,
  // aby sme zbytočne nevymazali iné uložené dáta.
  const { data: updatedRows, error: updateError } = await supabase
    .from("service_items")
    .update({
      name: payload.name.trim(),
      is_active: payload.is_active,
       // image_url meníme len vtedy, keď sa reálne nahral nový obrázok.
      // Ak upload neprebehol, tento kľúč neposielame a pôvodná hodnota zostane zachovaná.
      ...(uploadedImageUrl ? { image_url: uploadedImageUrl } : {}),
      content: {
        ...currentContent,
        intro: payload.content?.intro ?? "",
        paragraphs: normalizedParagraphs,
      },
      attributes: {
        ...currentAttributes,
        benefits: normalizedBenefits,
      },
    })
    .eq("slug", slug)
    .select("slug");

  if (updateError) {
    throw new Error(
      `Chyba pri aktualizácii Diamantová mikrodermabrázia: ${updateError.message}`,
    );
  }

  if (!updatedRows || updatedRows.length === 0) {
    throw new Error("Žiadna položka nebola aktualizovaná");
  }

  // Po úspešnom update vyčistíme cache dotknutých stránok,
  // aby sa nové dáta zobrazili hneď bez čakania na ďalší deploy alebo refresh cache.
  revalidatePath("/", "layout");
  revalidatePath("/about");
  revalidatePath("/admin/diamond-microdermabrasion");

  // Klientovi vrátime jednoduchú úspešnú odpoveď, aby mohol zobraziť toast.
  return {
    success: true,
    message: "Diamantová mikrodermabrázia bola aktualizovaná.",
  };
}
