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
    slug: string
    name: string
    image_url?: string
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
    is_active: boolean
  }
}

export type BotulotoxinPotenieMainProps = {
  botulotoxinPotenieData: {
    slug: string
    name: string
    image_url?: string
    content: {
      paragraphs: string[]
    }
    metadata: {
      sourceUrl: string
    }
    is_active: boolean
  }
}

export type BotulotoxinVraskyMainProps = {
  botulotoxinVraskyData: {
    slug: string
    name: string
    summary: string | null
    image_url?: string
    content: {
      paragraphs: string[]
    }
    is_active: boolean
  }
}

export async function getBotulotoxin(slug: string) {
  const supabase = await getSupabaseServerClient()

  const { data, error } = await supabase
    .from("service_items")
    .select("*, pricing(*)")
    .eq("slug", slug)
    .order("order_index", { referencedTable: "pricing", ascending: true })
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
    .select("*, pricing(*)")
    .eq("slug", slug)
    .order("order_index", { referencedTable: "pricing", ascending: true })
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
    .select("*, pricing(*)")
    .eq("slug", slug)
    .order("order_index", { referencedTable: "pricing", ascending: true })
    .single()

  if (error) {
    console.error("Error fetching botulotoxin vrasky data:", error)
    return null
  }

  return data
}

