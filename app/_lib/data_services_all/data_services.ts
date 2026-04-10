import { getSupabaseServerClient } from "../supabase/server";

type ImageGalleryItem = {
  src: string;
  alt: string;
};

export type ServiceRow = {
  id?: string;
  slug?: string;
  title?: string;
  text?: string | null;
  about_title?: string | null;
  about?: string | null;
  image_url?: string | null;
  image_gallery?: ImageGalleryItem[] | null; // JSONB pole v DB, bude parsované do ImageGalleryItem[]
  is_active?: boolean;
  order_index?: number | null;
};

export default async function getServiceBySlug(slug: string) {
  const supabase = await getSupabaseServerClient()

  const { data, error } = await supabase
    .from("services")
    // .select("*, pricing(*)")
    .select("*")
    .eq("slug", slug)
    // .order("order_index", { referencedTable: "pricing", ascending: true })
    .single()

  if (error) {
    console.error("Chyba pri nacítaní údajov služby:", error)
    return null
  }

  return data
}

