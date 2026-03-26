import { getSupabaseServerClient } from "../supabase/server"

export type AcupunctureMainProps = {
  acupunctureData: {
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
  }
}

export type AcupuncturePricingProps = {
  id: number
  service: string
  price_before_discount: number
  price_after_discount: number
  discount: number
}

export default async function getAcupuncture(slug: string) {
  const supabase = await getSupabaseServerClient()

  const { data, error } = await supabase
    .from("service_items")
    .select("*, pricing(*)")
    .eq("slug", slug)
    .single()

  if (error) {
    console.error("Error fetching acupuncture data:", error)
    return null
  }

  return data
}
