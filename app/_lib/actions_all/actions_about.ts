"use server";

import { revalidatePath } from "next/cache";
import { getSupabaseServerClient } from "../supabase/server";

type AboutUpdatePayload = {
  title: string;
  quote: string;
  quoteAuthor: string;
  bodyIntro: string;
  bodyTeam: string;
  bodyServices: string;
  bodyPhilosophy: string;
};

function getText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

// Jedna centrálna poistka: bez admin účtu sa žiadna zmena neuloží.
async function requireAdmin() {
  const supabase = await getSupabaseServerClient();
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

  return supabase;
}

// Spoločný helper pre nahratie nového obrázka do storage.
async function uploadImageIfProvided(
  slug: string,
  imageFile: FormDataEntryValue | null,
) {
  const supabase = await getSupabaseServerClient();

  if (!(imageFile instanceof File) || imageFile.size === 0) {
    return null;
  }

  const maxFileSize = 500 * 1024;
  const allowedMimeTypes = ["image/jpeg", "image/png", "image/webp"];

  if (imageFile.size > maxFileSize) {
    throw new Error("Obrázok je príliš veľký (max 500 KB po kompresii)");
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
      cacheControl: "31536000",
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
      `Chyba pri generovaní signed URL: ${signedError?.message ?? "Neznáma chyba"}`,
    );
  }

  return signedData.signedUrl;
}

// Uloží obsah stránky O nás do novej tabuľky `about_us`.
// Zatiaľ je to pripravené bokom a nič iné v appke neprepájame.
export async function updateAboutUs(formData: FormData) {
  const supabase = await requireAdmin();
  const slug = getText(formData.get("slug")) || "about-us";
  const rawData = formData.get("data")?.toString();
  const imageFile = formData.get("image_file");

  if (!rawData) {
    throw new Error("Chýbajú dáta pre stránku O nás");
  }

  let payload: AboutUpdatePayload;

  try {
    payload = JSON.parse(rawData);
  } catch {
    throw new Error("Neplatné dáta formulára");
  }

  if (
    typeof payload.title !== "string" ||
    typeof payload.quote !== "string" ||
    typeof payload.quoteAuthor !== "string" ||
    typeof payload.bodyIntro !== "string" ||
    typeof payload.bodyTeam !== "string" ||
    typeof payload.bodyServices !== "string" ||
    typeof payload.bodyPhilosophy !== "string"
  ) {
    throw new Error("Neplatná štruktúra dát");
  }

  const uploadedImageUrl = await uploadImageIfProvided(slug, imageFile);

  const { error } = await supabase.from("about_us").upsert(
    {
      slug,
      title: getText(payload.title),
      quote: getText(payload.quote) || null,
      quote_author: getText(payload.quoteAuthor) || null,
      body_intro: getText(payload.bodyIntro) || null,
      body_team: getText(payload.bodyTeam) || null,
      body_services: getText(payload.bodyServices) || null,
      body_philosophy: getText(payload.bodyPhilosophy) || null,
      ...(uploadedImageUrl ? { image_url: uploadedImageUrl } : {}),
    },
    { onConflict: "slug" },
  );

  if (error) {
    throw new Error(`Chyba pri aktualizácii O nás: ${error.message}`);
  }

  revalidatePath("/", "layout");
  revalidatePath("/onas");
  revalidatePath("/admin/onas_nastavenia");

  return {
    success: true,
    message: "O nás bolo pripravené v tabuľke about_us.",
    ...(uploadedImageUrl ? { imageUrl: uploadedImageUrl } : {}),
  };
}
