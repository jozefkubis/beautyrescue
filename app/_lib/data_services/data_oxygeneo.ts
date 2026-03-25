import { getSupabaseServerClient } from "../supabase/server"

export type OxygeneoMainProps = {
  oxygeneoData: any
}

export default async function getOxygeneo(slug: string) {
  const supabase = await getSupabaseServerClient()

  const { data, error } = await supabase
    .from("service_items")
    .select("*")
    .eq("slug", slug)
    .single()

  if (error) {
    console.error("Error fetching oxygeneo data:", error)
    return null
  }

  return data
}
