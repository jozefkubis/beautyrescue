import { getSupabaseServerClient } from "../supabase/server"

export type DiamondMicrodermabrasionMainProps = {
  diamondMicrodermabrasionData: any
}

export default async function getDiamondMicrodermabrasion(slug: string) {
  const supabase = await getSupabaseServerClient()

  const { data, error } = await supabase
    .from("service_items")
    .select("*")
    .eq("slug", slug)
    .single()

  if (error) {
    console.error("Error fetching diamond microdermabrasion data:", error)
    return null
  }

  return data
}
