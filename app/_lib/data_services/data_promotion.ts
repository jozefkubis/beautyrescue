import { getSupabaseServerClient } from "../supabase/server"



export type PromotionMainProps = {
  promotionData: {
    name: string
    is_active: boolean
    content: {
      paragraphs: string[]
    }
  }
  isAdmin?: boolean
}

export default async function getPromotion(slug: string) {
  const supabase = await getSupabaseServerClient()

  const { data, error } = await supabase
    .from("service_items")
    .select("*")
    .eq("slug", slug)   
    .single()

  if (error) {
    console.error("Error fetching promotion data:", error)
    return null
  }

  return data
}

