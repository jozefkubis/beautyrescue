import { getSupabaseServerClient } from "../supabase/server";

export type TknCategoryRow = {
  id: string;
  slug: string;
  title: string;
  text: string | null;
  image_url: string | null;
  is_active: boolean;
  order_index: number | null;
};

export type TknProductRow = {
  id: string;
  category_id: string;
  slug: string;
  image_url: string | null;
  is_active: boolean;
  order_index: number | null;
  name?: string | null;
  summary?: string | null;
  description?: string | null;
  subcategory?: string | null;
  content?: Record<string, unknown> | null;
  attributes?: Record<string, unknown> | null;
};

export type TknCategoryWithProducts = TknCategoryRow & {
  products: TknProductRow[];
};

// Pre verejné stránky necháme iba aktívne kategórie s aktívnymi produktmi.
export function getVisibleTknCategories(
  categories: TknCategoryWithProducts[],
) {
  return categories
    .filter((category) => category.is_active)
    .map((category) => ({
      ...category,
      products: category.products.filter((product) => product.is_active),
    }))
    .filter((category) => category.products.length > 0);
}

// Vrati TKN kategorie z DB. Co sa ma zobrazit, riesi az konkretna stranka.
export async function getTknCategories() {
  const supabase = await getSupabaseServerClient();

  const { data, error } = await supabase
    .from("tkn_categories")
    .select("*")
    .order("order_index", { ascending: true });

  if (error) {
    console.error("Chyba pri nacitani TKN kategorii:", error);
    return [] as TknCategoryRow[];
  }

  return (data ?? []) as TknCategoryRow[];
}

// Vrati TKN kategoriu podla slugu.
export async function getTknCategoriesBySlug(slug: string) {
  const supabase = await getSupabaseServerClient();

  const { data, error } = await supabase
    .from("tkn_categories")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Chyba pri nacitani TKN kategorie:", error);
    return null;
  }

  return data as TknCategoryRow;
}

// Vrati produkty pre jednu kategoriu z DB. Filtrovanie si riesi stranka.
export async function getTknProductsByCategory(categorySlug: string) {
  const supabase = await getSupabaseServerClient();
  const category = await getTknCategoriesBySlug(categorySlug);

  if (!category) {
    return [] as TknProductRow[];
  }

  const { data, error } = await supabase
    .from("tkn_products")
    .select("*")
    .eq("category_id", category.id)
    .order("order_index", { ascending: true });

  if (error) {
    console.error("Chyba pri nacitani TKN produktov:", error);
    return [] as TknProductRow[];
  }

  return (data ?? []) as TknProductRow[];
}

// Vrati jeden produkt podla slugu.
export async function getProductBySlug(slug: string) {
  const supabase = await getSupabaseServerClient();

  const { data, error } = await supabase
    .from("tkn_products")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Chyba pri nacitani TKN produktu:", error);
    return null;
  }

  return data as TknProductRow;
}
