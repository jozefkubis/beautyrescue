"use server";

import { revalidatePath } from "next/cache";
import { getSupabaseServerClient } from "../supabase/server";

type ActionResult = {
  success: boolean;
  message: string;
  imageUrl?: string;
};

export async function updateMainImage(formData: FormData): Promise<ActionResult> {
  const supabase = await getSupabaseServerClient();

  // Overenie admina je hneď na začiatku, aby sa neautorizovaný upload vôbec nespracoval.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (
    !user ||
    (user.email !== process.env.ADMIN_EMAIL_1 &&
      user.email !== process.env.ADMIN_EMAIL_2)
  ) {
    return { success: false, message: "Nemáš oprávnenie na úpravu hlavnej fotky." };
  }

  const imageFile = formData.get("image_file");

  if (!(imageFile instanceof File) || imageFile.size <= 0) {
    return { success: false, message: "Najprv vyber obrázok na nahratie." };
  }

  // Jednoduchá validácia vstupu, aby sa do storage neposielali príliš veľké alebo nepodporované súbory.
  const maxFileSize = 5 * 1024 * 1024;
  const allowedMimeTypes = ["image/jpeg", "image/png", "image/webp"];

  if (imageFile.size > maxFileSize) {
    return { success: false, message: "Obrázok je príliš veľký (max 5 MB)." };
  }

  if (!allowedMimeTypes.includes(imageFile.type)) {
    return { success: false, message: "Podporované sú iba formáty JPG, PNG a WEBP." };
  }

  const fileName = `home-main-${Date.now()}-${imageFile.name}`.replace(/\s/g, "-");

  const { data: uploadData, error: uploadError } = await supabase.storage
    .from("BRImages")
    .upload(fileName, imageFile, {
      cacheControl: "3600",
      upsert: true,
    });

  if (uploadError) {
    return {
      success: false,
      message: `Chyba pri nahrávaní obrázka: ${uploadError.message}`,
    };
  }

  const { data: signedData, error: signedError } = await supabase.storage
    .from("BRImages")
    .createSignedUrl(uploadData.path, 157680000);

  if (signedError || !signedData?.signedUrl) {
    return {
      success: false,
      message: `Chyba pri generovaní signed URL: ${signedError?.message ?? "Neznáma chyba"}`,
    };
  }

  const uploadedImageUrl = signedData.signedUrl;

  // home_page_image je v projekte používaná ako single-row tabuľka.
  // Najprv sa pokúsime aktualizovať existujúci riadok, ak neexistuje, vložíme nový.
  const { data: existingRow, error: existingRowError } = await supabase
    .from("home_page_image")
    .select("image_url")
    .limit(1)
    .maybeSingle();

  if (existingRowError) {
    return {
      success: false,
      message: `Chyba pri načítaní hlavnej fotky: ${existingRowError.message}`,
    };
  }

  if (existingRow) {
    const updateQuery = existingRow.image_url
      ? supabase
          .from("home_page_image")
          .update({ image_url: uploadedImageUrl })
          .eq("image_url", existingRow.image_url)
      : supabase
          .from("home_page_image")
          .update({ image_url: uploadedImageUrl })
          .is("image_url", null);

    const { error: updateError } = await updateQuery;

    if (updateError) {
      return {
        success: false,
        message: `Chyba pri aktualizácii hlavnej fotky: ${updateError.message}`,
      };
    }
  } else {
    const { error: insertError } = await supabase
      .from("home_page_image")
      .insert({ image_url: uploadedImageUrl });

    if (insertError) {
      return {
        success: false,
        message: `Chyba pri vytvorení hlavnej fotky: ${insertError.message}`,
      };
    }
  }

  revalidatePath("/", "layout");
  revalidatePath("/admin/mainImage_settings");

  return {
    success: true,
    message: "Hlavná fotka bola úspešne aktualizovaná.",
    imageUrl: uploadedImageUrl,
  };
}