import { getSupabaseServerClient } from "../supabase/server"

export type ProfhiloMainProps = {
  profhiloData: any
}

export async function getProfhilo(slug: string) {
  const supabase = await getSupabaseServerClient()
  const { data, error } = await supabase
    .from("service_items")
    .select("*")
    .eq("slug", slug)
    .single()
  if (error) {
    console.error("Error fetching profhilo data:", error)
    return null
  }
  return data
}
