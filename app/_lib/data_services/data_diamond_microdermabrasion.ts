import { getSupabaseServerClient } from "../supabase/server"

export type PricingProps = {
  id: number
  treatment: string
  price_before_discount: number
  price_after_discount: number
  discount: number
}

export type DiamondMicrodermabrasionMainProps = {
  diamondMicrodermabrasionData: {
    name: string
    summary: string
    metadata: {
      quoteAuthor: string
    }
    content: {
      bodyIntro: string
      bodyBenefits: string
      bodyProcess: string
      bodyAftercare: string
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
    .single()

  if (error) {
    console.error("Error fetching diamond microdermabrasion data:", error)
    return null
  }

  return data
}
