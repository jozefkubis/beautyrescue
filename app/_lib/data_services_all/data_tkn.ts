import { cache } from "react";
import { getSupabasePublicServerClient } from "../supabase/publicServer";

export type TknCategoryRow = {
  id: string;
  slug: string;
  title: string;
  intro: string | null;
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

// Vrati TKN kategorie z DB. Co sa ma zobrazit, riesi az konkretna stranka.
export const getTknCategories = cache(async () => {
  const supabase = getSupabasePublicServerClient();

  const { data, error } = await supabase
    .from("tkn_categories")
    .select("*")
    .order("order_index", { ascending: true });

  if (error) {
    console.error("Chyba pri nacitani TKN kategorii:", error);
    return [] as TknCategoryRow[];
  }

  return (data ?? []) as TknCategoryRow[];
});

// Vrati TKN kategoriu podla slugu.
export const getTknCategoriesBySlug = cache(async (slug: string) => {
  const supabase = getSupabasePublicServerClient();

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
});

// Vrati produkty pre jednu kategoriu z DB. Filtrovanie si riesi stranka.
export const getTknProductsByCategory = cache(async (categorySlug: string) => {
  const category = await getTknCategoriesBySlug(categorySlug);

  if (!category) {
    return [] as TknProductRow[];
  }

  return getTknProductsByCategoryId(category.id);
});

export const getTknProductsByCategoryId = cache(async (categoryId: string) => {
  const supabase = getSupabasePublicServerClient();

  const { data, error } = await supabase
    .from("tkn_products")
    .select("*")
    .eq("category_id", categoryId)
    .order("order_index", { ascending: true });

  if (error) {
    console.error("Chyba pri nacitani TKN produktov:", error);
    return [] as TknProductRow[];
  }

  return (data ?? []) as TknProductRow[];
});

export const getTknCategoriesWithProducts = cache(async () => {
  const categories = await getTknCategories();

  return Promise.all(
    categories.map(async (category) => ({
      ...category,
      products: await getTknProductsByCategoryId(category.id),
    })),
  );
});

// Vrati jeden produkt podla slugu.
export const getProductBySlug = cache(async (slug: string) => {
  const supabase = getSupabasePublicServerClient();

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
});


