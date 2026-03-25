import { getSupabaseServerClient } from "../supabase/server"

export type ChemicalPeelingMainProps = {
  chemicalPeelingData: {
    name: string
    content: {
      paragraphs: string[]
    }
  }
}

export default async function getChemicalPeeling(slug: string) {
  const supabase = await getSupabaseServerClient()

  const { data, error } = await supabase
    .from("service_items")
    .select("*")
    .eq("slug", slug)
    .single()

  if (error) {
    console.error("Error fetching chemical peeling data:", error)
    return null
  }

  return data
}
