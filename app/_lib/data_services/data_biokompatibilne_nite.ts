import { getSupabaseServerClient } from "../supabase/server"

export type PricingProps = {
  id: string
  treatment: string
  price_before_discount: number
  price_after_discount: number
  discount: number | null
}

export type BiokompatibilneNiteMainProps = {
  biokompatibilneNiteData: {
    name: string
    summary: string | null
    content: {
      paragraphs: string[]
    }
    pricing: PricingProps[]
  }
}

export default async function getBiokompatibilneNite(slug: string) {
  const supabase = await getSupabaseServerClient()

  const { data, error } = await supabase
    .from("service_items")
    .select("*, pricing(*)")
    .eq("slug", slug)
    .single()

  if (error) {
    console.error("Error fetching biokompatibilne nite data:", error)
    return null
  }

  return data
}
