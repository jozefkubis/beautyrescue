import { getSupabaseServerClient } from "../supabase/server"

export type PricingProps = {
  id: string
  treatment: string
  price_before_discount: number
  price_after_discount: number
  discount: number | null
}

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
    pricing: PricingProps[]
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
    .select("*, pricing(*)")
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
