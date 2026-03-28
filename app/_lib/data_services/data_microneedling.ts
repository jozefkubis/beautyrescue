import { getSupabaseServerClient } from "../supabase/server"

export type PricingProps = {
  id: string
  treatment: string
  price_before_discount: number
  price_after_discount: number
  discount: number | null
}

export type MicroneedlingMainProps = {
  microneedlingData: {
    name: string
    content: {
      paragraphs: string[]
    }
    attributes: {
      contraindicationsTitle: string
      contraindications: string[]
    }
    pricing: PricingProps[]
  }
}

export default async function getMicroneedling(slug: string) {
  const supabase = await getSupabaseServerClient()

  const { data, error } = await supabase
    .from("service_items")
    .select("*, pricing(*)")
    .eq("slug", slug)
    .order("order_index", { referencedTable: "pricing", ascending: true })
    .single()

  if (error) {
    console.error("Error fetching microneedling data:", error)
    return null
  }

  return data
}

