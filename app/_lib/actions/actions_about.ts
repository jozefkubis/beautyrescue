"use server"

import { revalidatePath } from "next/cache"
import { getSupabaseServerClient } from "../supabase/server"

type AboutUpdatePayload = {
  name: string
  summary: string
  quoteAuthor: string
  bodyIntro: string
  bodyTeam: string
  bodyServices: string
  bodyPhilosophy: string
}

export async function updateAboutUs(formData: FormData) {
  // Vytvorí serverového Supabase klienta s aktuálnou session používateľa.
  const supabase = await getSupabaseServerClient()

  // Overíme, kto je prihlásený.
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Ukladať môže iba admin účet definovaný v .env.
  if (
    !user ||
    (user.email !== process.env.ADMIN_EMAIL_1 &&
      user.email !== process.env.ADMIN_EMAIL_2)
  ) {
    throw new Error("Unauthorized")
  }

  // Z formulára berieme slug stránky a JSON dáta obsahu.
  const slug = formData.get("slug")?.toString() || "about-us"
  const rawData = formData.get("data")?.toString()

  if (!rawData) {
    throw new Error("Missing about content data")
  }

  // JSON text premeníme na objekt s typovanými poliami.
  const payload: AboutUpdatePayload = JSON.parse(rawData)

  // Načítame aktuálne metadata/content, aby sme pri update nezmazali iné kľúče.
  const { data: existingItem, error: existingItemError } = await supabase
    .from("service_items")
    .select("metadata, content")
    .eq("slug", slug)
    .single()

  if (existingItemError) {
    throw new Error(`Chyba pri načítaní položky: ${existingItemError.message}`)
  }

  // Ak metadata/content nie sú objekt, použijeme prázdny objekt ako fallback.
  const currentMetadata =
    existingItem?.metadata && typeof existingItem.metadata === "object"
      ? (existingItem.metadata as Record<string, unknown>)
      : {}

  const currentContent =
    existingItem?.content && typeof existingItem.content === "object"
      ? (existingItem.content as Record<string, unknown>)
      : {}

  const { error } = await supabase
    .from("service_items")
    .update({
      // Jednoduché textové polia uložíme priamo.
      name: payload.name.trim(),
      summary: payload.summary.trim(),
      metadata: {
        // Zachováme pôvodné metadata a prepíšeme iba quoteAuthor.
        ...currentMetadata,
        quoteAuthor: payload.quoteAuthor.trim(),
      },
      content: {
        // Zachováme pôvodný content a prepíšeme iba polia sekcie O nás.
        ...currentContent,
        bodyIntro: payload.bodyIntro.trim(),
        bodyTeam: payload.bodyTeam.trim(),
        bodyServices: payload.bodyServices.trim(),
        bodyPhilosophy: payload.bodyPhilosophy.trim(),
      },
    })
    .eq("slug", slug)

  if (error) {
    throw new Error(`Chyba pri aktualizácii O nás: ${error.message}`)
  }

  // Revalidácia vyčistí cache, aby boli po uložení hneď viditeľné nové dáta.
  revalidatePath("/", "layout")
  revalidatePath("/about")
  revalidatePath("/admin/about_settings")

  return { success: true, message: "O nás bolo aktualizované." }
}