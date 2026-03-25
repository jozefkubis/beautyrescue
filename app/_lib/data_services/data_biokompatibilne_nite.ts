import { getSupabaseServerClient } from "../supabase/server"

export type BiokompatibilneNiteMainProps = {
  biokompatibilneNiteData: {
    name: string
    summary: string | null
    content: {
      paragraphs: string[]
    }
  }
}

export default async function getBiokompatibilneNite(slug: string) {
  const supabase = await getSupabaseServerClient()

  const { data, error } = await supabase
    .from("service_items")
    .select("*")
    .eq("slug", slug)
    .single()

  if (error) {
    console.error("Error fetching biokompatibilne nite data:", error)
    return null
  }

  return data
}
