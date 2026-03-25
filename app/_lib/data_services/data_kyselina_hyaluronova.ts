import { getSupabaseServerClient } from "../supabase/server"

export type KyselinaHyaluronovaMainProps = {
  kyselinaHyaluronovaData: any
}

export type KyselinaHyaluronovaLipsProps = {
  kyselinaHyaluronovaLipsData: any
}

export type KyselinaHyaluronovaFaceProps = {
  kyselinaHyaluronovaFaceData: any
}

export async function getKyselinaHyaluronova(slug: string) {
  const supabase = await getSupabaseServerClient()
  const { data, error } = await supabase
    .from("service_items")
    .select("*")
    .eq("slug", slug)
    .single()
  if (error) {
    console.error("Error fetching kyselina hyaluronova data:", error)
    return null
  }
  return data
}

export async function getKyselinaHyaluronovaLips(slug: string) {
  const supabase = await getSupabaseServerClient()
  const { data, error } = await supabase
    .from("service_items")
    .select("*")
    .eq("slug", slug)
    .single()
  if (error) {
    console.error("Error fetching kyselina hyaluronova lips data:", error)
    return null
  }
  return data
}

export async function getKyselinaHyaluronovaFace(slug: string) {
  const supabase = await getSupabaseServerClient()
  const { data, error } = await supabase
    .from("service_items")
    .select("*")
    .eq("slug", slug)
    .single()
  if (error) {
    console.error("Error fetching kyselina hyaluronova face data:", error)
    return null
  }
  return data
}
