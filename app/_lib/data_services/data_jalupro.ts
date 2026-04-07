import { getSupabaseServerClient } from "../supabase/server"

export type PricingProps = {
  id: string
  treatment: string
  price_before_discount: number
  price_after_discount: number
  discount: number | null
}

type JaluproAttributes = {
  effects?: string[]
  effectSummary?: string
  treatmentParagraphs?: string[]
  aftercareParagraphs?: string[]
}

type JaluproServiceData = {
  name: string
  gallery: { src: string; alt?: string }[]
  content: Record<string, unknown> & {
    paragraphs?: string[]
    about?: Record<string, string | string[]>
  }
  attributes?: JaluproAttributes
  pricing: PricingProps[]
  is_active?: boolean
}

export type JaluproMainProps = {
  jaluproData: JaluproServiceData
}

export type JaluproClassicProps = {
  jaluproClassicData: JaluproServiceData
}

export type JaluproHMWProps = {
  jaluproHMWData: JaluproServiceData
}

export type JaluproSuperHydroProps = {
  jaluproSuperHydroData: JaluproServiceData
}

export type JaluproYoungEyeProps = {
  jaluproYoungEyeData: JaluproServiceData
}

export async function getJalupro(slug: string) {
  const supabase = await getSupabaseServerClient()
  const { data, error } = await supabase
    .from("service_items")
    .select("*, pricing(*)")
    .eq("slug", slug)
    .order("order_index", { referencedTable: "pricing", ascending: true })
    .single()
  if (error) {
    console.error("Error fetching jalupro data:", error)
    return null
  }
  return data
}

export async function getJaluproClassic(slug: string) {
  const supabase = await getSupabaseServerClient()
  const { data, error } = await supabase
    .from("service_items")
    .select("*, pricing(*)")
    .eq("slug", slug)
    .order("order_index", { referencedTable: "pricing", ascending: true })
    .single()
  if (error) {
    console.error("Error fetching jalupro classic data:", error)
    return null
  }
  return data
}

export async function getJaluproHMW(slug: string) {
  const supabase = await getSupabaseServerClient()
  const { data, error } = await supabase
    .from("service_items")
    .select("*, pricing(*)")
    .eq("slug", slug)
    .order("order_index", { referencedTable: "pricing", ascending: true })
    .single()
  if (error) {
    console.error("Error fetching jalupro hmw data:", error)
    return null
  }
  return data
}

export async function getJaluproSuperHydro(slug: string) {
  const supabase = await getSupabaseServerClient()
  const { data, error } = await supabase
    .from("service_items")
    .select("*, pricing(*)")
    .eq("slug", slug)
    .order("order_index", { referencedTable: "pricing", ascending: true })
    .single()
  if (error) {
    console.error("Error fetching jalupro super hydro data:", error)
    return null
  }
  return data
}

export async function getJaluproYoungEye(slug: string) {
  const supabase = await getSupabaseServerClient()
  const { data, error } = await supabase
    .from("service_items")
    .select("*, pricing(*)")
    .eq("slug", slug)
    .order("order_index", { referencedTable: "pricing", ascending: true })
    .single()
  if (error) {
    console.error("Error fetching jalupro young eye data:", error)
    return null
  }
  return data
}

