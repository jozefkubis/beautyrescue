import { getSupabaseServerClient } from "../supabase/server"

export type PricingProps = {
  id: string
  treatment: string
  price_before_discount: number
  price_after_discount: number
  discount: number | null
}

type MezoterapiaServiceData = {
  name: string
  gallery: { src: string; alt?: string }[]
  content: {
    paragraphs?: string[]
  }
  pricing: PricingProps[]
}

export type MezoterapiaMainProps = {
  mezoterapiaData: MezoterapiaServiceData
}

export type MezoterapiaInvasiveProps = {
  mezoterapiaInvasiveData: MezoterapiaServiceData
}

export type MezoterapiaNonInvasiveProps = {
  mezoterapiaNonInvasiveData: MezoterapiaServiceData
}

export async function getMezoterapia(slug: string) {
  const supabase = await getSupabaseServerClient()
  const { data, error } = await supabase
    .from("service_items")
    .select("*, pricing(*)")
    .eq("slug", slug)
    .order("order_index", { referencedTable: "pricing", ascending: true })
    .single()
  if (error) {
    console.error("Error fetching mezoterapia data:", error)
    return null
  }
  return data
}

export async function getMezoterapiaInvasive(slug: string) {
  const supabase = await getSupabaseServerClient()
  const { data, error } = await supabase
    .from("service_items")
    .select("*, pricing(*)")
    .eq("slug", slug)
    .order("order_index", { referencedTable: "pricing", ascending: true })
    .single()
  if (error) {
    console.error("Error fetching mezoterapia invasive data:", error)
    return null
  }
  return data
}

export async function getMezoterapiaNonInvasive(slug: string) {
  const supabase = await getSupabaseServerClient()
  const { data, error } = await supabase
    .from("service_items")
    .select("*, pricing(*)")
    .eq("slug", slug)
    .order("order_index", { referencedTable: "pricing", ascending: true })
    .single()
  if (error) {
    console.error("Error fetching mezoterapia non invasive data:", error)
    return null
  }
  return data
}

