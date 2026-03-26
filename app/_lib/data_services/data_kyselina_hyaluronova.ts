import { getSupabaseServerClient } from "../supabase/server"

export type PricingProps = {
  id: string
  treatment: string
  price_before_discount: number
  price_after_discount: number
  discount: number | null
}

type KyselinaServiceData = {
  name: string
  gallery: { src: string; alt?: string }[]
  content: {
    paragraphs?: string[]
  }
  pricing: PricingProps[]
}

export type KyselinaHyaluronovaMainProps = {
  kyselinaHyaluronovaData: KyselinaServiceData
}

export type KyselinaHyaluronovaLipsProps = {
  kyselinaHyaluronovaLipsData: KyselinaServiceData
}

export type KyselinaHyaluronovaFaceProps = {
  kyselinaHyaluronovaFaceData: KyselinaServiceData
}

export async function getKyselinaHyaluronova(slug: string) {
  const supabase = await getSupabaseServerClient()
  const { data, error } = await supabase
    .from("service_items")
    .select("*, pricing(*)")
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
    .select("*, pricing(*)")
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
    .select("*, pricing(*)")
    .eq("slug", slug)
    .single()
  if (error) {
    console.error("Error fetching kyselina hyaluronova face data:", error)
    return null
  }
  return data
}
