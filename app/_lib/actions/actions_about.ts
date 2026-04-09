"use server";

import { revalidatePath } from "next/cache";
import { getSupabaseServerClient } from "../supabase/server";

type AboutUpdatePayload = {
  name: string;
  summary: string;
  quoteAuthor: string;
  bodyIntro: string;
  bodyTeam: string;
  bodyServices: string;
  bodyPhilosophy: string;
};

export async function updateAboutUs(formData: FormData) {
  // Vytvoríme serverového Supabase klienta, aby sme vedeli pracovať
  // s aktuálnou session používateľa aj s databázou priamo na serveri.
  const supabase = await getSupabaseServerClient();

  // Zistíme, kto odoslal formulár. Ukladanie chceme povoliť iba adminovi,
  // aby obsah webu nemohol meniť neprihlásený alebo nesprávny používateľ.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (
    !user ||
    (user.email !== process.env.ADMIN_EMAIL_1 &&
      user.email !== process.env.ADMIN_EMAIL_2)
  ) {
    throw new Error("Unauthorized");
  }

  // Z formulára si vytiahneme slug záznamu, JSON string s dátami
  // a prípadný obrázok na nahratie.
  const slug = formData.get("slug")?.toString() || "about-us";
  const rawData = formData.get("data")?.toString();
  const imageFile = formData.get("image_file");

  if (!rawData) {
    throw new Error("Chýbajú dáta pre stránku O nás");
  }

  let payload: AboutUpdatePayload;

  // Formulár posiela obsah ako JSON text, preto ho musíme premeniť na objekt.
  try {
    payload = JSON.parse(rawData);
  } catch {
    throw new Error("Neplatné dáta formulára");
  }

  // Overíme základnú štruktúru payloadu, aby server nepracoval
  // s neúplnými alebo nesprávnymi dátami.
  if (
    typeof payload.name !== "string" ||
    typeof payload.summary !== "string" ||
    typeof payload.quoteAuthor !== "string" ||
    typeof payload.bodyIntro !== "string" ||
    typeof payload.bodyTeam !== "string" ||
    typeof payload.bodyServices !== "string" ||
    typeof payload.bodyPhilosophy !== "string"
  ) {
    throw new Error("Neplatná štruktúra dát");
  }

  // Načítame existujúce metadata a content, aby sme pri update zachovali
  // aj ostatné kľúče, ktoré sa v objekte už nachádzajú.
  const { data: existingItem, error: existingItemError } = await supabase
    .from("service_items")
    .select("metadata, content")
    .eq("slug", slug)
    .single();

  if (existingItemError) {
    throw new Error(`Chyba pri načítaní položky: ${existingItemError.message}`);
  }

  const currentMetadata =
    existingItem?.metadata && typeof existingItem.metadata === "object"
      ? (existingItem.metadata as Record<string, unknown>)
      : {};

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

    // Názov súboru skladáme zo slugu + času, aby sme minimalizovali kolízie.
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

    // Pre uložený súbor vygenerujeme signed URL, ktorú potom uložíme do image_url.
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

  // Uložíme nové hodnoty do databázy a zachováme ostatné metadata/content polia.
  const { data: updatedRows, error: updateError } = await supabase
    .from("service_items")
    .update({
      name: payload.name.trim(),
      summary: payload.summary.trim(),
      ...(uploadedImageUrl ? { image_url: uploadedImageUrl } : {}),
      metadata: {
        ...currentMetadata,
        quoteAuthor: payload.quoteAuthor.trim(),
      },
      content: {
        ...currentContent,
        bodyIntro: payload.bodyIntro.trim(),
        bodyTeam: payload.bodyTeam.trim(),
        bodyServices: payload.bodyServices.trim(),
        bodyPhilosophy: payload.bodyPhilosophy.trim(),
      },
    })
    .eq("slug", slug)
    .select("slug");

  if (updateError) {
    throw new Error(`Chyba pri aktualizácii O nás: ${updateError.message}`);
  }

  if (!updatedRows || updatedRows.length === 0) {
    throw new Error("Žiadna položka nebola aktualizovaná");
  }

  // Po úspešnom update vyčistíme cache dotknutých stránok.
  revalidatePath("/", "layout");
  revalidatePath("/about");
  revalidatePath("/admin/about_settings");

  return {
    success: true,
    message: "O nás bolo aktualizované.",
  };
}