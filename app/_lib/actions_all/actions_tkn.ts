"use server";

import { revalidatePath } from "next/cache";
import { getSupabaseServerClient } from "../supabase/server";

type ServerSupabaseClient = Awaited<ReturnType<typeof getSupabaseServerClient>>;

type UpdateTknCategoryPayload = {
  title: string;
  text?: string;
  image_url?: string;
  is_active?: boolean;
  order_index?: number;
};

type UpdateTknProductPayload = {
  title: string;
  text?: string;
  image_url?: string;
  category_id?: string;
  category_slug?: string;
  is_active?: boolean;
  order_index?: number;
};

type VisibilityPayload = {
  services?: Record<string, boolean>;
  categories?: Record<string, boolean>;
  products?: Record<string, boolean>;
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

function normalizeBoolean(value: unknown, fallback = true) {
  return typeof value === "boolean" ? value : fallback;
}

function normalizeNumber(value: unknown, fallback = 0) {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
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

// Pri TKN produkte vieme kategoriu poslat priamo ako ID alebo len ako slug.
async function resolveTknCategoryId(
  supabase: ServerSupabaseClient,
  payload: UpdateTknProductPayload,
) {
  const categoryId = normalizeText(payload.category_id);

  if (categoryId) {
    return categoryId;
  }

  const categorySlug = normalizeText(payload.category_slug);

  if (!categorySlug) {
    throw new Error("Chýba category_id alebo category_slug pre TKN produkt");
  }

  const { data, error } = await supabase
    .from("tkn_categories")
    .select("id")
    .eq("slug", categorySlug)
    .single();

  if (error || !data?.id) {
    throw new Error(`TKN kategória ${categorySlug} nebola nájdená`);
  }

  return data.id as string;
}

// Ulozi jednu TKN kategoriu do novej tabulky `tkn_categories`.
export async function updateTknCategoryRecord(
  formData: FormData,
): Promise<CmsActionResult> {
  try {
    const supabase = await requireAdmin();
    const slug = normalizeText(formData.get("slug"));
    const rawData = formData.get("data")?.toString();
    const imageFile = formData.get("image_file");

    if (!slug) {
      throw new Error("Chýba slug TKN kategórie");
    }

    if (!rawData) {
      throw new Error("Chýbajú dáta TKN kategórie");
    }

    const payload = JSON.parse(rawData) as UpdateTknCategoryPayload;
    const uploadedImageUrl = await uploadImageIfProvided(supabase, slug, imageFile);

    if (!normalizeText(payload.title)) {
      throw new Error("TKN kategória musí mať title");
    }

    const updateData: {
      title: string;
      text: string;
      is_active: boolean;
      order_index: number;
      image_url?: string;
    } = {
      title: normalizeText(payload.title),
      text: normalizeText(payload.text),
      is_active: normalizeBoolean(payload.is_active, true),
      order_index: normalizeNumber(payload.order_index, 0),
    };

    if (typeof payload.image_url === "string" && payload.image_url.trim()) {
      updateData.image_url = payload.image_url.trim();
    }

    if (uploadedImageUrl) {
      updateData.image_url = uploadedImageUrl;
    }

    const { error } = await supabase
      .from("tkn_categories")
      .update(updateData)
      .eq("slug", slug);

    if (error) {
      throw new Error(`Chyba pri ukladaní TKN kategórie: ${error.message}`);
    }

    revalidateCmsPaths();

    return {
      ok: true,
      message: "TKN kategória bola uložená.",
      ...(uploadedImageUrl ? { imageUrl: uploadedImageUrl } : {}),
    };
  } catch (error) {
    return {
      ok: false,
      error: getErrorMessage(error),
    };
  }
}

// Ulozi jeden TKN produkt a v pripade potreby doriesi aj jeho category_id.
export async function updateTknProductRecord(
  formData: FormData,
): Promise<CmsActionResult> {
  try {
    const supabase = await requireAdmin();
    const slug = normalizeText(formData.get("slug"));
    const rawData = formData.get("data")?.toString();
    const imageFile = formData.get("image_file");

    if (!slug) {
      throw new Error("Chýba slug TKN produktu");
    }

    if (!rawData) {
      throw new Error("Chýbajú dáta TKN produktu");
    }

    const payload = JSON.parse(rawData) as UpdateTknProductPayload;
    const uploadedImageUrl = await uploadImageIfProvided(supabase, slug, imageFile);
    const categoryId = await resolveTknCategoryId(supabase, payload);

    if (!normalizeText(payload.title)) {
      throw new Error("TKN produkt musí mať title");
    }

    const updateData: {
      category_id: string;
      title: string;
      text: string;
      is_active: boolean;
      order_index: number;
      image_url?: string;
    } = {
      category_id: categoryId,
      title: normalizeText(payload.title),
      text: normalizeText(payload.text),
      is_active: normalizeBoolean(payload.is_active, true),
      order_index: normalizeNumber(payload.order_index, 0),
    };

    if (typeof payload.image_url === "string" && payload.image_url.trim()) {
      updateData.image_url = payload.image_url.trim();
    }

    if (uploadedImageUrl) {
      updateData.image_url = uploadedImageUrl;
    }

    const { error } = await supabase
      .from("tkn_products")
      .update(updateData)
      .eq("slug", slug);

    if (error) {
      throw new Error(`Chyba pri ukladaní TKN produktu: ${error.message}`);
    }

    revalidateCmsPaths();

    return {
      ok: true,
      message: "TKN produkt bol uložený.",
      ...(uploadedImageUrl ? { imageUrl: uploadedImageUrl } : {}),
    };
  } catch (error) {
    return {
      ok: false,
      error: getErrorMessage(error),
    };
  }
}

// Jednym server action volanim vieme prepinat viditelnost sluzieb, kategorii aj produktov.
export async function updateAllVisibility(formData: FormData): Promise<CmsActionResult> {
  try {
    const supabase = await requireAdmin();
    const rawData = formData.get("data")?.toString();

    if (!rawData) {
      throw new Error("Chýbajú dáta pre visibility update");
    }

    const payload = JSON.parse(rawData) as VisibilityPayload;

    const updates = [
      ...Object.entries(payload.services ?? {}).map(([slug, isActive]) => ({
        table: "services",
        slug,
        isActive,
      })),
      ...Object.entries(payload.categories ?? {}).map(([slug, isActive]) => ({
        table: "tkn_categories",
        slug,
        isActive,
      })),
      ...Object.entries(payload.products ?? {}).map(([slug, isActive]) => ({
        table: "tkn_products",
        slug,
        isActive,
      })),
    ];

    await Promise.all(
      updates.map(async ({ table, slug, isActive }) => {
        const { error } = await supabase
          .from(table)
          .update({ is_active: Boolean(isActive) })
          .eq("slug", slug);

        if (error) {
          throw new Error(`Chyba pri aktualizácii ${slug}: ${error.message}`);
        }
      }),
    );

    revalidateCmsPaths();

    return {
      ok: true,
      message: "Viditeľnosť bola uložená.",
    };
  } catch (error) {
    return {
      ok: false,
      error: getErrorMessage(error),
    };
  }
}

// Zmaze TKN kategoriu aj jej produkty, aby foreign key neblokoval mazanie.
export async function deleteTknCategoryRecord(
  slug: string,
): Promise<CmsActionResult> {
  try {
    const supabase = await requireAdmin();
    const safeSlug = normalizeText(slug);

    if (!safeSlug) {
      throw new Error("Chýba slug TKN kategórie na zmazanie");
    }

    const { data: category, error: categoryError } = await supabase
      .from("tkn_categories")
      .select("id")
      .eq("slug", safeSlug)
      .single();

    if (categoryError || !category?.id) {
      throw new Error(`TKN kategória ${safeSlug} nebola nájdená`);
    }

    const { error: productDeleteError } = await supabase
      .from("tkn_products")
      .delete()
      .eq("category_id", category.id as string);

    if (productDeleteError) {
      throw new Error(`Chyba pri mazaní TKN produktov: ${productDeleteError.message}`);
    }

    const { error: categoryDeleteError } = await supabase
      .from("tkn_categories")
      .delete()
      .eq("id", category.id as string);

    if (categoryDeleteError) {
      throw new Error(`Chyba pri mazaní TKN kategórie: ${categoryDeleteError.message}`);
    }

    revalidateCmsPaths();

    return {
      ok: true,
      message: "TKN kategória bola zmazaná.",
      deletedSlug: safeSlug,
    };
  } catch (error) {
    return {
      ok: false,
      error: getErrorMessage(error),
    };
  }
}

// Zmaze jeden konkretny TKN produkt z novej tabulky.
export async function deleteTknProductRecord(
  slug: string,
): Promise<CmsActionResult> {
  try {
    const supabase = await requireAdmin();
    const safeSlug = normalizeText(slug);

    if (!safeSlug) {
      throw new Error("Chýba slug TKN produktu na zmazanie");
    }

    const { error } = await supabase
      .from("tkn_products")
      .delete()
      .eq("slug", safeSlug);

    if (error) {
      throw new Error(`Chyba pri mazaní TKN produktu: ${error.message}`);
    }

    revalidateCmsPaths();

    return {
      ok: true,
      message: "TKN produkt bol zmazaný.",
      deletedSlug: safeSlug,
    };
  } catch (error) {
    return {
      ok: false,
      error: getErrorMessage(error),
    };
  }
}
