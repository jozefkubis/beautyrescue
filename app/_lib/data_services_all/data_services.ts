import { getSupabaseServerClient } from "../supabase/server";

type ImageGalleryItem = {
  src: string;
  alt: string;
};

export type PricingProps = {
  id: string
  service_id: string
  treatment: string
  price_before_discount: number
  price_after_discount: number
  discount: number | null
}

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
  pricing?: PricingProps[] | null; // Relace na tabulku "pricing", bude parsována do pole PricingProps[]
};

export default async function getServiceBySlug(slug: string) {
  const supabase = await getSupabaseServerClient()

  const { data, error } = await supabase
    .from("services")
    .select("*, pricing(*)")
    // .select("*")
    .eq("slug", slug)
    .order("order_index", { referencedTable: "pricing", ascending: true })
    .single()

  if (error) {
    console.error("Chyba pri nacítaní údajov služby:", error)
    return null
  }

  return data as ServiceRow | null;
}

