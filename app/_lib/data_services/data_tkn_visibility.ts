import { getSupabaseServerClient } from "../supabase/server";

export type TknVisibility = {
  categories?: Record<string, boolean>;
  products?: Record<string, boolean>;
};

export default async function getTknVisibility(): Promise<TknVisibility> {
  const supabase = await getSupabaseServerClient();
  const { data, error } = await supabase
    .from("service_items")
    .select("metadata")
    .eq("slug", "dashboard-ui-content")
    .single();

  if (error) {
    console.error("Error fetching TKN visibility:", error);
    return { categories: {}, products: {} };
  }

  const metadata =
    data?.metadata && typeof data.metadata === "object"
      ? (data.metadata as Record<string, unknown>)
      : {};

  const ui =
    metadata.ui && typeof metadata.ui === "object"
      ? (metadata.ui as Record<string, unknown>)
      : {};

  const rawVisibility =
    ui.tknVisibility && typeof ui.tknVisibility === "object"
      ? (ui.tknVisibility as Record<string, unknown>)
      : {};

  const categories =
    rawVisibility.categories && typeof rawVisibility.categories === "object"
      ? (rawVisibility.categories as Record<string, boolean>)
      : {};

  const products =
    rawVisibility.products && typeof rawVisibility.products === "object"
      ? (rawVisibility.products as Record<string, boolean>)
      : {};

  return { categories, products };
}
