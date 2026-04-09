import { createClient } from "@supabase/supabase-js";

type ServiceItemRow = {
  slug: string;
  name: string;
  summary: string | null;
  description: string | null;
  subcategory: string | null;
  is_active: boolean;
  sort_order: number;
  item_type: "service" | "product" | "category" | "content";
  content: Record<string, unknown> | null;
  metadata: Record<string, unknown> | null;
};

export type TknProduct = {
  slug: string;
  dbSlug: string;
  name: string;
  summary: string;
  details: string;
  indications: string[];
  is_active: boolean;
};

export type TknCategory = {
  slug: string;
  dbSlug: string;
  name: string;
  description: string;
  intro: string;
  is_active: boolean;
  products: TknProduct[];
};

// Verejné TKN dáta čítame priamo z DB cez anon client, takže nepotrebujeme cookies ani session.
function getPublicSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL");
  }

  if (!supabaseAnonKey) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_ANON_KEY");
  }

  // Pre verejné TKN čítanie nepotrebujeme cookies ani session.
  return createClient(supabaseUrl, supabaseAnonKey);
}

// Bezpečne pretypuje JSON hodnotu na objekt, aby sme sa vyhli padaniu na `null` alebo poliach.
function getObject(value: unknown) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {} as Record<string, unknown>;
  }

  return value as Record<string, unknown>;
}

// Z JSON poľa vytiahne čisté textové položky pre indikácie.
function getStringArray(value: unknown) {
  if (!Array.isArray(value)) {
    return [] as string[];
  }

  return value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean);
}

// Pre URL používame krátky slug sekcie, nie celý DB slug s prefixom `tkn-`.
function getCategorySlug(row: ServiceItemRow) {
  return row.subcategory?.trim() || row.slug.replace(/^tkn-/, "");
}

// Pre produkt sa snažíme použiť pôvodný slug z metadata; keď chýba, spravíme fallback z DB slugu.
function getProductSlug(row: ServiceItemRow) {
  const metadata = getObject(row.metadata);
  const originalProductSlug = metadata.original_product_slug;

  if (typeof originalProductSlug === "string" && originalProductSlug.trim()) {
    return originalProductSlug.trim();
  }

  return row.slug.replace(/^tkn-[^-]+-/, "");
}

// Načíta všetky TKN kategórie a produkty z DB a zloží ich do jednoduchej stromovej štruktúry pre UI.
export async function getTknCategories(options?: { includeInactive?: boolean }) {
  const includeInactive = options?.includeInactive ?? false;
  const supabase = getPublicSupabaseClient();

  const { data, error } = await supabase
    .from("service_items")
    .select(
      "slug, name, summary, description, subcategory, is_active, sort_order, item_type, content, metadata",
    )
    .eq("category", "tkn")
    .in("item_type", ["category", "product"])
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Error fetching TKN categories from DB:", error);
    return [] as TknCategory[];
  }

  const rows = (data ?? []) as ServiceItemRow[];
  const categoryRows = rows.filter((row) => row.item_type === "category");
  const productRows = rows.filter((row) => row.item_type === "product");

  return categoryRows
    .map((categoryRow) => {
      const content = getObject(categoryRow.content);
      const categorySlug = getCategorySlug(categoryRow);

      // Keď sa v DB objavia dva rovnaké pôvodné slugs, druhému doplníme `-2`, `-3` atď.
      // Tým ostanú URL aj React keys jednoznačné a stránka nespadne na duplicate key warning.
      const slugCounts = new Map<string, number>();

      const products = productRows
        .filter((productRow) => (productRow.subcategory?.trim() ?? "") === categorySlug)
        .filter((productRow) => includeInactive || productRow.is_active)
        .map((productRow) => {
          const productContent = getObject(productRow.content);
          const baseSlug = getProductSlug(productRow);
          const currentCount = (slugCounts.get(baseSlug) ?? 0) + 1;

          slugCounts.set(baseSlug, currentCount);

          return {
            slug: currentCount === 1 ? baseSlug : `${baseSlug}-${currentCount}`,
            dbSlug: productRow.slug,
            name: productRow.name,
            summary: productRow.summary ?? "",
            details: productRow.description ?? "",
            indications: getStringArray(productContent.indications),
            is_active: productRow.is_active,
          } satisfies TknProduct;
        });

      return {
        slug: categorySlug,
        dbSlug: categoryRow.slug,
        name: categoryRow.name,
        description:
          categoryRow.summary ??
          (typeof content.description === "string" ? content.description : ""),
        intro:
          categoryRow.description ??
          (typeof content.intro === "string" ? content.intro : ""),
        is_active: categoryRow.is_active,
        products,
      } satisfies TknCategory;
    })
    .filter((category) => includeInactive || category.is_active)
    .filter((category) => includeInactive || category.products.length > 0);
}

// Vráti jednu konkrétnu TKN kategóriu podľa URL slugu.
export async function getTknCategory(
  categorySlug: string,
  options?: { includeInactive?: boolean },
) {
  const categories = await getTknCategories(options);
  return categories.find((category) => category.slug === categorySlug) ?? null;
}

// Vráti detail jedného produktu spolu s jeho materskou kategóriou pre detail page.
export async function getTknProduct(
  categorySlug: string,
  productSlug: string,
  options?: { includeInactive?: boolean },
) {
  const category = await getTknCategory(categorySlug, options);

  if (!category) {
    return null;
  }

  const product = category.products.find((item) => item.slug === productSlug);

  if (!product) {
    return null;
  }

  return { category, product };
}
