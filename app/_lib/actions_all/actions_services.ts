"use server";

import { revalidatePath } from "next/cache";
import { getSupabaseServerClient } from "../supabase/server";

type ServerSupabaseClient = Awaited<ReturnType<typeof getSupabaseServerClient>>;

type UpdateServicePayload = {
  title: string;
  text?: string;
  about_title?: string;
  about?: string;
  image_url?: string;
  image_gallery?: Array<{ src: string; alt?: string }>;
  is_active?: boolean;
  order_index?: number;
};

export type CmsActionResult =
  | {
      ok: true;
      message: string;
      imageUrl?: string;
      deletedSlug?: string;
    }
  | {
      ok: false;
      error: string;
    };

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Neznáma chyba";
}

function normalizeText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeNullableText(value: unknown) {
  const text = normalizeText(value);
  return text || null;
}

function normalizeBoolean(value: unknown, fallback = true) {
  return typeof value === "boolean" ? value : fallback;
}

function normalizeNumber(value: unknown, fallback = 0) {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

// Gallery cistime do jednoducheho a predvidatelneho tvaru pre DB.
function normalizeImageGallery(value: unknown) {
  if (!Array.isArray(value)) {
    return [] as Array<{ src: string; alt: string }>;
  }

  return value
    .map((item) => {
      if (!item || typeof item !== "object" || Array.isArray(item)) {
        return null;
      }

      const record = item as Record<string, unknown>;
      const src = normalizeText(record.src);
      const alt = normalizeText(record.alt);

      if (!src) {
        return null;
      }

      return { src, alt };
    })
    .filter((item): item is { src: string; alt: string } => Boolean(item));
}

// Vsetky zapisovacie operacie nech si idu cez jednu admin poistku.
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

// Pri zmene obsahu obnovime hlavne verejne a admin cesty.
function revalidateCmsPaths() {
  revalidatePath("/", "layout");
  revalidatePath("/about");
  revalidatePath("/pricing");
  revalidatePath("/promotion");
  revalidatePath("/cosmetics/microneedling");
  revalidatePath("/cosmetics/microneedling/tkn");
  revalidatePath("/admin");
}

// Spolocny helper pre upload obrazka do storage.
async function uploadImageIfProvided(
  supabase: ServerSupabaseClient,
  slug: string,
  imageFile: FormDataEntryValue | null,
) {
  if (!(imageFile instanceof File) || imageFile.size === 0) {
    return null;
  }

  const maxFileSize = 5 * 1024 * 1024;
  const allowedMimeTypes = ["image/jpeg", "image/png", "image/webp"];

  if (imageFile.size > maxFileSize) {
    throw new Error("Obrázok je príliš veľký (max 5 MB)");
  }

  if (!allowedMimeTypes.includes(imageFile.type)) {
    throw new Error("Podporované sú iba formáty JPG, PNG a WEBP");
  }

  const fileName = `${slug}-${Date.now()}-${imageFile.name}`.replace(/\s/g, "-");

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
      `Chyba pri generovaní signed URL: ${signedError?.message ?? "Neznáma chyba"}`,
    );
  }

  return signedData.signedUrl;
}

// Ulozi jednu sluzbu do novej tabulky `services`.
export async function updateServiceRecord(
  formData: FormData,
): Promise<CmsActionResult> {
  try {
    const supabase = await requireAdmin();
    const slug = normalizeText(formData.get("slug"));
    const rawData = formData.get("data")?.toString();
    const imageFile = formData.get("image_file");

    if (!slug) {
      throw new Error("Chýba slug služby");
    }

    if (!rawData) {
      throw new Error("Chýbajú dáta služby");
    }

    const payload = JSON.parse(rawData) as UpdateServicePayload;
    const uploadedImageUrl = await uploadImageIfProvided(supabase, slug, imageFile);

    if (!normalizeText(payload.title)) {
      throw new Error("Služba musí mať title");
    }

    const updateData: {
      title: string;
      text: string;
      about_title: string | null;
      about: string | null;
      is_active: boolean;
      order_index: number;
      image_url?: string;
      image_gallery?: Array<{ src: string; alt: string }>;
    } = {
      title: normalizeText(payload.title),
      text: normalizeText(payload.text),
      about_title: normalizeNullableText(payload.about_title),
      about: normalizeNullableText(payload.about),
      is_active: normalizeBoolean(payload.is_active, true),
      order_index: normalizeNumber(payload.order_index, 0),
    };

    if (typeof payload.image_url === "string" && payload.image_url.trim()) {
      updateData.image_url = payload.image_url.trim();
    }

    if (uploadedImageUrl) {
      updateData.image_url = uploadedImageUrl;
    }

    if (Object.prototype.hasOwnProperty.call(payload, "image_gallery")) {
      updateData.image_gallery = normalizeImageGallery(payload.image_gallery);
    }

    const { error } = await supabase
      .from("services")
      .update(updateData)
      .eq("slug", slug);

    if (error) {
      throw new Error(`Chyba pri ukladaní služby: ${error.message}`);
    }

    revalidateCmsPaths();

    return {
      ok: true,
      message: "Služba bola uložená.",
      ...(uploadedImageUrl ? { imageUrl: uploadedImageUrl } : {}),
    };
  } catch (error) {
    return {
      ok: false,
      error: getErrorMessage(error),
    };
  }
}

// Zmaze jednu sluzbu z novej tabulky `services`.
export async function deleteServiceRecord(slug: string): Promise<CmsActionResult> {
  try {
    const supabase = await requireAdmin();
    const safeSlug = normalizeText(slug);

    if (!safeSlug) {
      throw new Error("Chýba slug služby na zmazanie");
    }

    const { error } = await supabase
      .from("services")
      .delete()
      .eq("slug", safeSlug);

    if (error) {
      throw new Error(`Chyba pri mazaní služby: ${error.message}`);
    }

    revalidateCmsPaths();

    return {
      ok: true,
      message: "Služba bola zmazaná.",
      deletedSlug: safeSlug,
    };
  } catch (error) {
    return {
      ok: false,
      error: getErrorMessage(error),
    };
  }
}
