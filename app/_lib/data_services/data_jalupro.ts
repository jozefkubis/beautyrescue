import { getSupabaseServerClient } from "../supabase/server"

export type JaluproMainProps = {
  jaluproData: any
}

export type JaluproClassicProps = {
  jaluproClassicData: any
}

export type JaluproHMWProps = {
  jaluproHMWData: any
}

export type JaluproSuperHydroProps = {
  jaluproSuperHydroData: any
}

export type JaluproYoungEyeProps = {
  jaluproYoungEyeData: any
}

export async function getJalupro(slug: string) {
  const supabase = await getSupabaseServerClient()
  const { data, error } = await supabase
    .from("service_items")
    .select("*")
    .eq("slug", slug)
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
    .select("*")
    .eq("slug", slug)
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
    .select("*")
    .eq("slug", slug)
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
    .select("*")
    .eq("slug", slug)
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
    .select("*")
    .eq("slug", slug)
    .single()
  if (error) {
    console.error("Error fetching jalupro young eye data:", error)
    return null
  }
  return data
}
