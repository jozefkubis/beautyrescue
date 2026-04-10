import { createClient } from "@supabase/supabase-js";

type TknCategoryRow = {
  id: string;
  slug: string;
  title: string;
  text: string | null;
  image_url: string | null;
  is_active: boolean;
  order_index: number | null;
};

type TknProductRow = {
  id: string;
  category_id: string;
  slug: string;
  title: string;
  text: string | null;
  image_url: string | null;
  is_active: boolean;
  order_index: number | null;
};

export type CmsTknProduct = {
  id: string;
  categoryId: string;
  slug: string;
  title: string;
  text: string;
  imageUrl: string;
  isActive: boolean;
  orderIndex: number;
};

export type CmsTknCategory = {
  id: string;
  slug: string;
  title: string;
  text: string;
  imageUrl: string;
  isActive: boolean;
  orderIndex: number;
  products: CmsTknProduct[];
};

// Pre nove citanie dat pouzivame verejny anon client.
function getPublicSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL");
  }

  if (!supabaseAnonKey) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_ANON_KEY");
  }

  return createClient(supabaseUrl, supabaseAnonKey);
}

function getString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function getOrderIndex(value: number | null) {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

// Vrati vsetky TKN kategorie aj s produktmi z novych tabuliek.
export async function getAllTknCategories(options?: { includeInactive?: boolean }) {
  const includeInactive = options?.includeInactive ?? false;
  const supabase = getPublicSupabaseClient();

  const [categoriesResult, productsResult] = await Promise.all([
    supabase
      .from("tkn_categories")
      .select("id, slug, title, text, image_url, is_active, order_index")
      .order("order_index", { ascending: true }),
    supabase
      .from("tkn_products")
      .select("id, category_id, slug, title, text, image_url, is_active, order_index")
      .order("order_index", { ascending: true }),
  ]);

  if (categoriesResult.error) {
    console.error("Error fetching TKN categories from DB:", categoriesResult.error);
    return [] as CmsTknCategory[];
  }

  if (productsResult.error) {
    console.error("Error fetching TKN products from DB:", productsResult.error);
    return [] as CmsTknCategory[];
  }

  const categoryRows = (categoriesResult.data ?? []) as TknCategoryRow[];
  const productRows = (productsResult.data ?? []) as TknProductRow[];

  return categoryRows
    .filter((categoryRow) => includeInactive || categoryRow.is_active)
    .map((categoryRow) => ({
      id: categoryRow.id,
      slug: categoryRow.slug,
      title: getString(categoryRow.title),
      text: getString(categoryRow.text),
      imageUrl: getString(categoryRow.image_url),
      isActive: Boolean(categoryRow.is_active),
      orderIndex: getOrderIndex(categoryRow.order_index),
      products: productRows
        .filter((productRow) => productRow.category_id === categoryRow.id)
        .filter((productRow) => includeInactive || productRow.is_active)
        .map((productRow) => ({
          id: productRow.id,
          categoryId: productRow.category_id,
          slug: productRow.slug,
          title: getString(productRow.title),
          text: getString(productRow.text),
          imageUrl: getString(productRow.image_url),
          isActive: Boolean(productRow.is_active),
          orderIndex: getOrderIndex(productRow.order_index),
        })),
    }))
    .filter((category) => includeInactive || category.products.length > 0);
}

// Vrati jednu TKN kategoriu podla slugu.
export async function getTknCategoryBySlug(
  slug: string,
  options?: { includeInactive?: boolean },
) {
  const categories = await getAllTknCategories(options);
  return categories.find((category) => category.slug === slug) ?? null;
}

// Vrati detail jedneho TKN produktu spolu s jeho kategoriou.
export async function getTknProductBySlug(
  categorySlug: string,
  productSlug: string,
  options?: { includeInactive?: boolean },
) {
  const category = await getTknCategoryBySlug(categorySlug, options);

  if (!category) {
    return null;
  }

  const product = category.products.find((item) => item.slug === productSlug);

  if (!product) {
    return null;
  }

  return { category, product };
}
