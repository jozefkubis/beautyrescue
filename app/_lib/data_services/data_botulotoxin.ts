import { getSupabaseServerClient } from "../supabase/server"

export type BotulotoxinMainProps = {
  botulotoxinData: {
    name: string
    gallery: { src: string; alt?: string }[]
    content: {
      about: {
        title: string
        paragraphs: string[]
      }
    }
    attributes: {
      intro: string
      contraindications: string
      complications: string
    }
  }
}

export type BotulotoxinPotenieMainProps = {
  botulotoxinPotenieData: {
    name: string
    content: {
      paragraphs: string[]
    }
    metadata: {
      sourceUrl: string
    }
  }
}

export type BotulotoxinVraskyMainProps = {
  botulotoxinVraskyData: {
    name: string
    summary: string | null
    content: {
      paragraphs: string[]
    }
  }
}

export async function getBotulotoxin(slug: string) {
  const supabase = await getSupabaseServerClient()

  const { data, error } = await supabase
    .from("service_items")
    .select("*")
    .eq("slug", slug)
    .single()

  if (error) {
    console.error("Error fetching botulotoxin data:", error)
    return null
  }

  return data
}

export async function getBotulotoxinPotenie(slug: string) {
  const supabase = await getSupabaseServerClient()

  const { data, error } = await supabase
    .from("service_items")
    .select("*")
    .eq("slug", slug)
    .single()

  if (error) {
    console.error("Error fetching botulotoxin potenie data:", error)
    return null
  }

  return data
}

export async function getBotulotoxinVrasky(slug: string) {
  const supabase = await getSupabaseServerClient()

  const { data, error } = await supabase
    .from("service_items")
    .select("*")
    .eq("slug", slug)
    .single()

  if (error) {
    console.error("Error fetching botulotoxin vrasky data:", error)
    return null
  }

  return data
}
