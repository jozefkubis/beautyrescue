"use server";

import { revalidatePath } from "next/cache";
import { getSupabaseServerClient } from "../supabase/server";


// Slovenský komentár: Payload je univerzálny, môže obsahovať ľubovoľné polia zo ServiceRow
type UpdateServicePayload = {
  title?: string;
  text?: string;
  about_title?: string;
  about?: string;
  image_url?: string;
  image_gallery?: string[] | { src: string; alt: string }[]; // Môže být pole stringů nebo pole objektů s src a alt
  is_active?: boolean;
  order_index?: number | null;
};

// Slovenský komentár: Funkcia teraz akceptuje aj prípad, keď slug nie je zadaný
export async function updateServiceBySlug(formData: FormData, slug?: string) {
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

  // Skontrolujeme, či slug existuje, ak nie, vrátime chybu pre volajúceho
  if (!slug) {
    return { success: false, message: "Chýba slug." };
  }

  // Z formulára si vytiahneme slug záznamu a JSON string s dátami.
  // Slug určuje, ktorý riadok v services sa má aktualizovať.
  const rawData = formData.get("data")?.toString();
  const imageFile = formData.get("image_file");

  // Ak data vôbec neprišli, nemáme čo spracovať ani uložiť.
  if (!rawData) {
    throw new Error(`Chýbajú dáta pre ${slug}`);
  }

  let payload: UpdateServicePayload;

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

  // Slovenský komentár: Ak je prázdny payload alebo chýba aspoň title alebo text alebo about, vyhodíme chybu len ak nie je žiadne pole
  if (!payload || Object.keys(payload).length === 0) {
    throw new Error("Neplatná štruktúra dát");
  }
 

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
  // Slovenský komentár: Pripravíme update objekt dynamicky podľa toho, čo je v payload
  // Slovenský komentár: updateObj má dynamické kľúče podľa ServiceRow
  const updateObj: Record<string, unknown> = {};
  if (typeof payload.title === "string") updateObj.title = payload.title.trim();
  if (typeof payload.text === "string") updateObj.text = payload.text.trim();
  if (typeof payload.about_title === "string") updateObj.about_title = payload.about_title.trim();
  if (typeof payload.about === "string") updateObj.about = payload.about.trim();
  if (typeof payload.is_active === "boolean") updateObj.is_active = payload.is_active;
  if (typeof payload.order_index === "number" || payload.order_index === null) updateObj.order_index = payload.order_index;
  // image_gallery je pole objektov podľa ServiceRow, ak je prítomné
  if (payload.image_gallery) updateObj.image_gallery = payload.image_gallery as { src: string; alt: string }[];
  // Ak bol uploadnutý nový obrázok, prepíš image_url
  if (uploadedImageUrl) updateObj.image_url = uploadedImageUrl;
  else if (typeof payload.image_url === "string") updateObj.image_url = payload.image_url;

  const { data: updatedRows, error: updateError } = await supabase
    .from("services")
    .update(updateObj)
    .eq("slug", slug)
    .select("slug");

  if (updateError) {
    throw new Error(
      `Chyba pri aktualizácii ${slug}: ${updateError.message}`,
    );
  }

  if (!updatedRows || updatedRows.length === 0) {
    throw new Error(`Žiadna položka nebola aktualizovaná pre ${slug}`);
  }

  // Po úspešnom update vyčistíme cache dotknutých stránok,
  // aby sa nové dáta zobrazili hneď bez čakania na ďalší deploy alebo refresh cache.
  revalidatePath("/", "layout");
  revalidatePath("/about");
  revalidatePath(`/admin/${slug}`);

  // Klientovi vrátime jednoduchú úspešnú odpoveď, aby mohol zobraziť toast.
  return {
    success: true,
    message: `${slug} bolo aktualizované.`,
  };
}