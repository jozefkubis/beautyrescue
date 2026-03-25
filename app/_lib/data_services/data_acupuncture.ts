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

export default async function getAcupuncture(slug: string) {
  const supabase = await getSupabaseServerClient()

  const { data, error } = await supabase
    .from("service_items")
    .select("*")
    .eq("slug", slug)
    .single()

  if (error) {
    console.error("Error fetching acupuncture data:", error)
    return null
  }

  return data
}
