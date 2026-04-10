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

type TknDeleteResult =
  | {
      ok: true;
      deletedDbSlugs: string[];
      hiddenCategorySlug?: string;
      hiddenProductSlugs?: string[];
    }
  | {
      ok: false;
      error: string;
    };

// Z textarea alebo poľa pripravíme čisté odseky bez prázdnych hodnôt.
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

// Jednoduché pomocné čistenie riadkov pre zoznamy ako kontraindikácie.
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

// Jedna centrálna poistka: bez admin účtu sa žiadna zmena v DB nevykoná.
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

// Uloží hlavný obsah Microneedling sekcie a prípadne nahrá nový obrázok.
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

// TKN checkboxy zapisujeme priamo do DB cez `is_active`, bez ďalších obchádzok.
export async function updateTknVisibility(formData: FormData) {
  // Najprv si otvoríme serverový Supabase klient, ale iba ak je používateľ admin.
  const supabase = await requireAdmin();

  // Z formulára príde jeden JSON string so stavmi kategórií a produktov.
  const rawData = formData.get("data")?.toString();

  if (!rawData) {
    throw new Error("Chýbajú dáta pre TKN sekcie a produkty");
  }

  let payload: TknVisibilityPayload;
  try {
    // String z formulára prevedieme naspäť na objekt, s ktorým vieme pracovať.
    payload = JSON.parse(rawData);
  } catch {
    throw new Error("Neplatné dáta formulára TKN sekcií a produktov");
  }

  // Kategórie aj produkty si spojíme do jedného poľa dvojíc [slug, boolean].
  // Vďaka tomu máme jeden jednoduchý cyklus pre všetky zmeny.
  const updates = [
    ...Object.entries(payload.categories ?? {}),
    ...Object.entries(payload.products ?? {}),
  ];

  // Každý checkbox zapisujeme priamo do `service_items.is_active`.
  // `slug` identifikuje konkrétny riadok a `isActive` hovorí, či má byť aktívny.
  await Promise.all(
    updates.map(async ([slug, isActive]) => {
      const { error } = await supabase
        .from("service_items")
        .update({ is_active: Boolean(isActive) })
        .eq("slug", slug);

      // Ak zlyhá čo i len jedna položka, radšej spadneme s jasnou chybou.
      if (error) {
        throw new Error(`Chyba pri aktualizácii ${slug}: ${error.message}`);
      }
    }),
  );

  // Po uložení obnovíme verejnú aj admin stránku, aby sa nový stav hneď zobrazil.
  revalidatePath("/cosmetics/microneedling");
  revalidatePath("/cosmetics/microneedling/tkn");
  revalidatePath("/admin/cosmetics_settings/microneedling_settings");
}

// Trvalo vymaže jeden TKN produkt z `service_items` a obnoví verejné aj admin stránky.
export async function deleteTknProduct(
  productDbSlug: string,
  categorySlug: string,
  productSlug: string,
): Promise<TknDeleteResult> {
  // Aj mazanie musí ísť cez admin poistku.
  const supabase = await requireAdmin();

  // Slugy očistíme od medzier, aby sme neporovnávali nepresné hodnoty.
  const safeProductDbSlug = productDbSlug?.trim();
  const safeCategorySlug = categorySlug?.trim();
  const safeProductSlug = productSlug?.trim();

  // Keď chýba identifikátor produktu alebo cesty, nemá zmysel pokračovať.
  if (!safeProductDbSlug || !safeCategorySlug || !safeProductSlug) {
    return {
      ok: false,
      error: "Chýba slug produktu alebo kategórie.",
    };
  }

  // Tu prebehne samotný trvalý delete jedného DB riadku.
  const { error: deleteError } = await supabase
    .from("service_items")
    .delete()
    .eq("slug", safeProductDbSlug);

  // Klientovi vraciame konzistentný výsledok, aby vedel ukázať toast alebo chybu.
  if (deleteError) {
    return {
      ok: false,
      error: `Nepodarilo sa vymazať produkt: ${deleteError.message}`,
    };
  }

  // Po zmazaní obnovíme všetky stránky, kde sa tento produkt mohol zobrazovať.
  revalidatePath("/cosmetics/microneedling");
  revalidatePath("/cosmetics/microneedling/tkn");
  revalidatePath(`/cosmetics/microneedling/tkn/${safeCategorySlug}`);
  revalidatePath(
    `/cosmetics/microneedling/tkn/${safeCategorySlug}/${safeProductSlug}`,
  );
  revalidatePath("/admin/cosmetics_settings/microneedling_settings");

  return {
    ok: true,
    deletedDbSlugs: [safeProductDbSlug],
  };
}

// Trvalo vymaže celú TKN sekciu aj všetky produkty, ktoré pod ňu patria.
export async function deleteTknCategory(
  categoryDbSlug: string,
  categorySlug: string,
): Promise<TknDeleteResult> {
  // Najprv si znova overíme admin práva.
  const supabase = await requireAdmin();

  // Očistené slugy použijeme pri hľadaní sekcie aj jej produktov.
  const safeCategoryDbSlug = categoryDbSlug?.trim();
  const safeCategorySlug = categorySlug?.trim();

  if (!safeCategoryDbSlug || !safeCategorySlug) {
    return {
      ok: false,
      error: "Chýba slug TKN sekcie.",
    };
  }

  // Najprv si nájdeme všetky produkty, ktoré patria pod danú sekciu.
  // Potrebujeme ich slugs, aby sme vedeli zmazať všetko naraz jedným dopytom.
  const { data: productRows, error: productRowsError } = await supabase
    .from("service_items")
    .select("slug")
    .eq("category", "tkn")
    .eq("item_type", "product")
    .eq("subcategory", safeCategorySlug);

  if (productRowsError) {
    return {
      ok: false,
      error: `Nepodarilo sa načítať produkty sekcie: ${productRowsError.message}`,
    };
  }

  // Do jedného poľa si pripravíme slug sekcie aj slugy všetkých jej produktov.
  const dbSlugs = [
    safeCategoryDbSlug,
    ...((productRows ?? []) as Array<{ slug: string }>).map((row) => row.slug),
  ];

  // Tu prebehne skutočný trvalý delete celej skupiny riadkov.
  const { error: deleteError } = await supabase
    .from("service_items")
    .delete()
    .in("slug", dbSlugs);

  if (deleteError) {
    return {
      ok: false,
      error: `Nepodarilo sa vymazať sekciu: ${deleteError.message}`,
    };
  }

  // Po úspechu obnovíme stránky, kde sa sekcia mohla zobrazovať.
  revalidatePath("/cosmetics/microneedling");
  revalidatePath("/cosmetics/microneedling/tkn");
  revalidatePath(`/cosmetics/microneedling/tkn/${safeCategorySlug}`);
  revalidatePath("/admin/cosmetics_settings/microneedling_settings");

  return {
    ok: true,
    deletedDbSlugs: dbSlugs,
  };
}
