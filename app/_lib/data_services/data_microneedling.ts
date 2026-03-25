import { getSupabaseServerClient } from "../supabase/server"

export type MicroneedlingMainProps = {
  microneedlingData: {
    name: string
    content: {
      paragraphs: string[]
    }
    attributes: {
      contraindicationsTitle: string
      contraindications: string[]
    }
  }
}

export default async function getMicroneedling(slug: string) {
  const supabase = await getSupabaseServerClient()

  const { data, error } = await supabase
    .from("service_items")
    .select("*")
    .eq("slug", slug)
    .single()

  if (error) {
    console.error("Error fetching microneedling data:", error)
    return null
  }

  return data
}
