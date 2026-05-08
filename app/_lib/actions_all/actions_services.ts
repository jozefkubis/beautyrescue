"use server";

import { revalidatePath } from "next/cache";
import { getSupabaseServerClient } from "../supabase/server";

type UpdateServicePayload = {
  title?: string;
  text?: string;
  about_title?: string;
  about?: string;
  image_url?: string;
  image_gallery?: string[] | { src: string; alt: string }[];
  is_active?: boolean;
  order_index?: number | null;
};

function getAdminSettingsPathForSlug(slug: string) {
  const normalizedSlug = slug.trim();

  // Viacero podstranok patri do jednej admin sekcie, preto mapujeme slug na nadradenu settings route.
  if (normalizedSlug.startsWith("mezoterapia")) {
    return "/admin/kozmetika_nastavenia/mezoterapia_nastavenia";
  }

  if (normalizedSlug.startsWith("botulotoxin")) {
    return "/admin/lekarska_kozmetika_nastavenia/botulotoxin_nastavenia";
  }

  if (normalizedSlug.startsWith("jalupro")) {
    return "/admin/lekarska_kozmetika_nastavenia/jalupro_nastavenia";
  }

  if (normalizedSlug.startsWith("kyselina-hyaluronova")) {
    return "/admin/lekarska_kozmetika_nastavenia/kyselina_hyaluronova_nastavenia";
  }

  if (normalizedSlug.startsWith("profhilo")) {
    return "/admin/lekarska_kozmetika_nastavenia/profhilo_nastavenia";
  }

  const directPaths: Record<string, string> = {
    acupuncture: "/admin/lekarska_akupunktura_nastavenia",
    "biokompatibilne-nite":
      "/admin/lekarska_kozmetika_nastavenia/biokompatibilne_nite_nastavenia",
    "chemical-peeling":
      "/admin/kozmetika_nastavenia/chemicky_peeling_nastavenia",
    "diamond-microdermabrasion":
      "/admin/kozmetika_nastavenia/diamantova_mikrodermabrazia_nastavenia",
    microneedling: "/admin/kozmetika_nastavenia/microneedling_nastavenia",
    oxygeneo: "/admin/kozmetika_nastavenia/oxygeneo_nastavenia",
    promotion: "/admin/novinky_nastavenia",
  };

  return directPaths[normalizedSlug] ?? "/admin";
}

export async function updateServiceBySlug(formData: FormData, slug?: string) {
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

  if (!slug) {
    throw new Error("Chýba slug");
  }

  const rawData = formData.get("data")?.toString();
  if (!rawData) {
    throw new Error("Chýbajú dáta formulára");
  }

  let payload: UpdateServicePayload;

  try {
    payload = JSON.parse(rawData);
  } catch {
    throw new Error("Neplatné dáta formulára");
  }

  const imageFile = formData.get("image_file") as File | null;

  let imageUrl = payload.image_url;

  if (imageFile && imageFile.size > 0) {
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
      throw new Error("Nepodarilo sa vytvoriť URL obrázka");
    }

    imageUrl = signedData.signedUrl;
  }

  const updateObj: Record<string, unknown> = {
    ...(typeof payload.title === "string" && { title: payload.title.trim() }),
    ...(typeof payload.text === "string" && { text: payload.text.trim() }),
    ...(typeof payload.about_title === "string" && {
      about_title: payload.about_title.trim(),
    }),
    ...(typeof payload.about === "string" && { about: payload.about.trim() }),
    ...(typeof payload.is_active === "boolean" && {
      is_active: payload.is_active,
    }),
    ...((typeof payload.order_index === "number" ||
      payload.order_index === null) && {
      order_index: payload.order_index,
    }),
    ...(payload.image_gallery && { image_gallery: payload.image_gallery }),
    ...(typeof imageUrl === "string" && { image_url: imageUrl }),
  };

  const { data, error } = await supabase
    .from("services")
    .update(updateObj)
    .eq("slug", slug)
    .select("slug");

  if (error) {
    throw new Error(`Chyba pri aktualizácii ${slug}: ${error.message}`);
  }

  if (!data || data.length === 0) {
    throw new Error(`Žiadna položka nebola aktualizovaná pre ${slug}`);
  }

  revalidatePath("/", "layout");
  revalidatePath("/onas");
  revalidatePath(getAdminSettingsPathForSlug(slug));

  return {
    success: true,
    message: `${slug} bolo aktualizované.`,
  };
}
