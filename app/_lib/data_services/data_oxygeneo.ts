import { getSupabaseServerClient } from "../supabase/server"

export type PricingProps = {
  id: string
  treatment: string
  price_before_discount: number
  price_after_discount: number
  discount: number | null
}

export type OxygeneoMainProps = {
  oxygeneoData: {
    name: string
    image_url?: string
    content: {
      intro?: string
      description?: string
      stepsTitle?: string
      steps?: string[]
      result?: string
    }
    metadata: {
      citationLabel?: string
      citationUrl?: string
    }
    pricing: PricingProps[]
  }
}

export default async function getOxygeneo(slug: string) {
  const supabase = await getSupabaseServerClient()

  const { data, error } = await supabase
    .from("service_items")
    .select("*, pricing(*)")
    .eq("slug", slug)
    .order("order_index", { referencedTable: "pricing", ascending: true })
    .single()

  if (error) {
    console.error("Error fetching oxygeneo data:", error)
    return null
  }

  return data
}

