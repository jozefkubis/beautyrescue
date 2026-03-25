import { getSupabaseServerClient } from "../supabase/server"

export type AboutMainProps = {
  aboutUsData: {
    name: string
    summary: string
    metadata: {
      quoteAuthor: string
    }
    content: {
      bodyIntro: string
      bodyTeam: string
      bodyServices: string
      bodyPhilosophy: string
    }
  }
}

export async function getAboutUs(slug: string) {
  const supabase = await getSupabaseServerClient()

  const { data, error } = await supabase
    .from("service_items")
    .select("*")
    .eq("slug", slug)
    .single()

  if (error) {
    console.error("Error fetching about us data:", error)
    return null
  }

  return data
}
