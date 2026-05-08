"use server";

import { revalidatePath } from "next/cache";
import { getSupabaseServerClient } from "../supabase/server";

type TknVisibilityPayload = {
  categories: Record<string, boolean>;
  products: Record<string, boolean>;
};

type TknDeleteResult =
  | {
      ok: true;
      deletedSlugs: string[];
      hiddenCategorySlug?: string;
      hiddenProductSlugs?: string[];
    }
  | {
      ok: false;
      error: string;
    };

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

  // Kategórie a produkty sú už v samostatných TKN tabuľkách,
  // preto každú skupinu zapisujeme priamo tam, kam patrí.
  const categoryUpdates = Object.entries(payload.categories ?? {});
  const productUpdates = Object.entries(payload.products ?? {});

  await Promise.all([
    ...categoryUpdates.map(async ([slug, isActive]) => {
      const { error } = await supabase
        .from("tkn_categories")
        .update({ is_active: Boolean(isActive) })
        .eq("slug", slug);

      if (error) {
        throw new Error(
          `Chyba pri aktualizácii kategórie ${slug}: ${error.message}`,
        );
      }
    }),
    ...productUpdates.map(async ([slug, isActive]) => {
      const { error } = await supabase
        .from("tkn_products")
        .update({ is_active: Boolean(isActive) })
        .eq("slug", slug);

      if (error) {
        throw new Error(
          `Chyba pri aktualizácii produktu ${slug}: ${error.message}`,
        );
      }
    }),
  ]);

  // Po uložení obnovíme verejnú aj admin stránku, aby sa nový stav hneď zobrazil.
  revalidatePath("/kozmetika/microneedling");
  revalidatePath("/kozmetika/microneedling/tkn");
  revalidatePath("/admin/cosmetics_settings/microneedling_settings");
}

// Trvalo vymaže jeden TKN produkt podľa jeho slugu.
export async function deleteTknProduct(
  productSlug: string,
  categorySlug: string,
): Promise<TknDeleteResult> {
  const supabase = await requireAdmin();

  const safeProductSlug = productSlug?.trim();
  const safeCategorySlug = categorySlug?.trim();

  if (!safeProductSlug || !safeCategorySlug) {
    return {
      ok: false,
      error: "Chýba slug produktu alebo kategórie.",
    };
  }

  const { error: deleteError } = await supabase
    .from("tkn_products")
    .delete()
    .eq("slug", safeProductSlug);

  // Klientovi vraciame konzistentný výsledok, aby vedel ukázať toast alebo chybu.
  if (deleteError) {
    return {
      ok: false,
      error: `Nepodarilo sa vymazať produkt: ${deleteError.message}`,
    };
  }

  // Po zmazaní obnovíme všetky stránky, kde sa tento produkt mohol zobrazovať.
  revalidatePath("/kozmetika/microneedling");
  revalidatePath("/kozmetika/microneedling/tkn");
  revalidatePath(`/kozmetika/microneedling/tkn/${safeCategorySlug}`);
  revalidatePath(
    `/kozmetika/microneedling/tkn/${safeCategorySlug}/${safeProductSlug}`,
  );
  revalidatePath("/admin/cosmetics_settings/microneedling_settings");

  return {
    ok: true,
    deletedSlugs: [safeProductSlug],
  };
}

// Trvalo vymaže celú TKN sekciu aj všetky produkty, ktoré pod ňu patria.
export async function deleteTknCategory(
  categorySlug: string,
): Promise<TknDeleteResult> {
  const supabase = await requireAdmin();

  const safeCategorySlug = categorySlug?.trim();

  if (!safeCategorySlug) {
    return {
      ok: false,
      error: "Chýba slug TKN sekcie.",
    };
  }

  // Najprv si nájdeme ID kategórie, aby sme vedeli korektne vymazať aj jej produkty.
  const { data: categoryRow, error: categoryError } = await supabase
    .from("tkn_categories")
    .select("id, slug")
    .eq("slug", safeCategorySlug)
    .single();

  if (categoryError || !categoryRow) {
    return {
      ok: false,
      error: `Nepodarilo sa načítať sekciu: ${categoryError?.message ?? "Sekcia neexistuje."}`,
    };
  }

  const { data: productRows, error: productRowsError } = await supabase
    .from("tkn_products")
    .select("slug")
    .eq("category_id", categoryRow.id);

  if (productRowsError) {
    return {
      ok: false,
      error: `Nepodarilo sa načítať produkty sekcie: ${productRowsError.message}`,
    };
  }

  const productSlugs = ((productRows ?? []) as Array<{ slug: string }>).map(
    (row) => row.slug,
  );

  if (productSlugs.length > 0) {
    const { error: deleteProductsError } = await supabase
      .from("tkn_products")
      .delete()
      .in("slug", productSlugs);

    if (deleteProductsError) {
      return {
        ok: false,
        error: `Nepodarilo sa vymazať produkty sekcie: ${deleteProductsError.message}`,
      };
    }
  }

  const { error: deleteError } = await supabase
    .from("tkn_categories")
    .delete()
    .eq("slug", safeCategorySlug);

  if (deleteError) {
    return {
      ok: false,
      error: `Nepodarilo sa vymazať sekciu: ${deleteError.message}`,
    };
  }

  // Po úspechu obnovíme stránky, kde sa sekcia mohla zobrazovať.
  revalidatePath("/kozmetika/microneedling");
  revalidatePath("/kozmetika/microneedling/tkn");
  revalidatePath(`/kozmetika/microneedling/tkn/${safeCategorySlug}`);
  revalidatePath("/admin/cosmetics_settings/microneedling_settings");

  return {
    ok: true,
    deletedSlugs: [safeCategorySlug, ...productSlugs],
  };
}
