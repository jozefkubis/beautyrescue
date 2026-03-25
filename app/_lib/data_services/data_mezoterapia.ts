import { getSupabaseServerClient } from "../supabase/server"

export type MezoterapiaMainProps = {
  mezoterapiaData: any
}

export type MezoterapiaInvasiveProps = {
  mezoterapiaInvasiveData: any
}

export type MezoterapiaNonInvasiveProps = {
  mezoterapiaNonInvasiveData: any
}

export async function getMezoterapia(slug: string) {
  const supabase = await getSupabaseServerClient()
  const { data, error } = await supabase
    .from("service_items")
    .select("*")
    .eq("slug", slug)
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
    .select("*")
    .eq("slug", slug)
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
    .select("*")
    .eq("slug", slug)
    .single()
  if (error) {
    console.error("Error fetching mezoterapia non invasive data:", error)
    return null
  }
  return data
}
