"use server";

import { revalidatePath } from "next/cache";
import { getSupabaseServerClient } from "../supabase/server";

type MicroneedlingUpdatePayload = {
  name: string;
  image_url?: string;
  paragraphs: string | string[];
  contraindicationsTitle: string;
  contraindications: string | string[];
  is_active: boolean;
};

type TknVisibilityPayload = {
  categories: Record<string, boolean>;
  products: Record<string, boolean>;
};

function normalizeParagraphs(value: string | string[]) {
  if (Array.isArray(value)) {
    return value
      .map((paragraph) => (typeof paragraph === "string" ? paragraph.trim() : ""))
      .filter(Boolean);
  }

  return value
    .split(/\r?\n\s*\r?\n|\r?\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

function normalizeLines(value: string | string[]) {
  if (Array.isArray(value)) {
    return value
      .map((line) => (typeof line === "string" ? line.trim() : ""))
      .filter(Boolean);
  }

  return value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

async function requireAdmin() {
  const supabase = await getSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user.email !== process.env.ADMIN_EMAIL) {
    throw new Error("Unauthorized");
  }

  return supabase;
}

export async function updateMicroneedling(formData: FormData) {
  const supabase = await requireAdmin();
  const slug = formData.get("slug")?.toString() || "microneedling";
  const rawData = formData.get("data")?.toString();
  const imageFile = formData.get("image_file");

  if (!rawData) {
    throw new Error("Chýbajú dáta pre Microneedling");
  }

  let payload: MicroneedlingUpdatePayload;
  try {
    payload = JSON.parse(rawData);
  } catch {
    throw new Error("Neplatné dáta formulára");
  }

  if (typeof payload.name !== "string" || typeof payload.is_active !== "boolean") {
    throw new Error("Neplatná štruktúra dát");
  }

  const { data: existingItem, error: existingItemError } = await supabase
    .from("service_items")
    .select("content, attributes")
    .eq("slug", slug)
    .single();

  if (existingItemError || !existingItem) {
    throw new Error(`Položka Microneedling nebola nájdená: ${existingItemError?.message ?? "unknown"}`);
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

  const { error } = await supabase
    .from("service_items")
    .update({
      name: payload.name.trim(),
      // image_url meníme len vtedy, keď sa reálne nahral nový obrázok.
      // Ak upload neprebehol, tento kľúč neposielame a pôvodná hodnota zostane zachovaná.
      ...(uploadedImageUrl ? { image_url: uploadedImageUrl } : {}),
      is_active: payload.is_active,
      content: {
        ...currentContent,
        paragraphs: normalizeParagraphs(payload.paragraphs),
      },
      attributes: {
        ...currentAttributes,
        contraindicationsTitle: payload.contraindicationsTitle.trim(),
        contraindications: normalizeLines(payload.contraindications),
      },
    })
    .eq("slug", slug);

  if (error) {
    throw new Error(`Chyba pri aktualizácii Microneedling: ${error.message}`);
  }

  revalidatePath("/", "layout");
  revalidatePath("/cosmetics/microneedling");
  revalidatePath("/admin/cosmetics_settings/microneedling_settings");
}

export async function updateTknVisibility(formData: FormData) {
  const supabase = await requireAdmin();
  const rawData = formData.get("data")?.toString();

  if (!rawData) {
    throw new Error("Chýbajú dáta pre TKN visibility");
  }

  let payload: TknVisibilityPayload;
  try {
    payload = JSON.parse(rawData);
  } catch {
    throw new Error("Neplatné dáta formulára TKN visibility");
  }

  const { data: existingItem, error: existingItemError } = await supabase
    .from("service_items")
    .select("metadata")
    .eq("slug", "dashboard-ui-content")
    .single();

  if (existingItemError || !existingItem) {
    throw new Error(`Položka dashboard-ui-content nebola nájdená: ${existingItemError?.message ?? "unknown"}`);
  }

  const currentMetadata =
    existingItem?.metadata && typeof existingItem.metadata === "object"
      ? (existingItem.metadata as Record<string, unknown>)
      : {};

  const currentUi =
    currentMetadata.ui && typeof currentMetadata.ui === "object"
      ? (currentMetadata.ui as Record<string, unknown>)
      : {};

  const { error } = await supabase
    .from("service_items")
    .update({
      metadata: {
        ...currentMetadata,
        ui: {
          ...currentUi,
          tknVisibility: {
            categories: payload.categories,
            products: payload.products,
          },
        },
      },
    })
    .eq("slug", "dashboard-ui-content");

  if (error) {
    throw new Error(`Chyba pri aktualizácii TKN visibility: ${error.message}`);
  }

  // Revalidujeme IBA verejné stránky kde návštevníci vidia TKN katalóg.
  // Admin stránku zámerне NErevalidujeme — revalidatePath("/", "layout") by spôsobil
  // remount klient komponentu a reset checkbox state na staré server hodnoty.
  revalidatePath("/cosmetics/microneedling");
  revalidatePath("/cosmetics/microneedling/tkn");
}
