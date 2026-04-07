import { getSupabaseServerClient } from "../supabase/server"

export type PricingProps = {
  id: string
  treatment: string
  price_before_discount: number
  price_after_discount: number
  discount: number | null
}

export type DiamondMicrodermabrasionMainProps = {
  diamondMicrodermabrasionData: {
    name: string
    image_url?: string
    summary: string
    metadata: {
      quoteAuthor: string
    }
    content: {
      intro?: string
      paragraphs?: string[]
    }
    attributes?: {
      benefits?: string[]
    }
    pricing: PricingProps[]
  }
}

export default async function getDiamondMicrodermabrasion(slug: string) {
  const supabase = await getSupabaseServerClient()

  const { data, error } = await supabase
    .from("service_items")
    .select("*, pricing(*)")
    .eq("slug", slug)
    .order("order_index", { referencedTable: "pricing", ascending: true })
    .single()

  if (error) {
    console.error("Error fetching diamond microdermabrasion data:", error)
    return null
  }

  return data
}

