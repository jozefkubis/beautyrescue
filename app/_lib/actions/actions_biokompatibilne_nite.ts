"use server"

import { revalidatePath } from "next/cache"
import { getSupabaseServerClient } from "../supabase/server"

type BiokompatibilneNiteUpdatePayload = {
  name: string
  paragraphs: string | string[]
  is_active: boolean
}

export async function updateBiokompatibilneNite(formData: FormData) {
  // Vytvoríme serverového Supabase klienta a overíme admina,
  // aby obsah nemohol meniť neprihlásený alebo nesprávny používateľ.
  const supabase = await getSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user || user.email !== process.env.ADMIN_EMAIL) {
    throw new Error("Unauthorized")
  }

  const slug = formData.get("slug")?.toString() || "biokompatibilne-nite"
  const rawData = formData.get("data")?.toString()

  if (!rawData) {
    throw new Error("Chýbajú dáta pre Biokompatibilné nite")
  }

  let payload: BiokompatibilneNiteUpdatePayload
  try {
    payload = JSON.parse(rawData)
  } catch {
    throw new Error("Neplatné dáta formulára")
  }

  if (
    typeof payload.name !== "string" ||
    (!Array.isArray(payload.paragraphs) && typeof payload.paragraphs !== "string") ||
    typeof payload.is_active !== "boolean"
  ) {
    throw new Error("Neplatná štruktúra dát")
  }

  // Odseky z textarea normalizujeme na pole stringov,
  // aby frontend aj databáza pracovali s jednotným formátom.
  const normalizedParagraphs = Array.isArray(payload.paragraphs)
    ? payload.paragraphs
        .map((paragraph) => (typeof paragraph === "string" ? paragraph.trim() : ""))
        .filter(Boolean)
    : payload.paragraphs
        .split(/\r?\n\s*\r?\n|\r?\n/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean)

  // Načítame existujúci content, aby sme pri update nezmazali iné kľúče.
  const { data: existingItem, error: existingItemError } = await supabase
    .from("service_items")
    .select("content")
    .eq("slug", slug)
    .single()

  if (existingItemError) {
    throw new Error(`Chyba pri načítaní položky: ${existingItemError.message}`)
  }

  const currentContent =
    existingItem?.content && typeof existingItem.content === "object"
      ? (existingItem.content as Record<string, unknown>)
      : {}

  const { data: updatedRows, error: updateError } = await supabase
    .from("service_items")
    .update({
      name: payload.name.trim(),
      is_active: payload.is_active,
      content: {
        ...currentContent,
        paragraphs: normalizedParagraphs,
      },
    })
    .eq("slug", slug)
    .select("slug")

  if (updateError) {
    throw new Error(
      `Chyba pri aktualizácii Biokompatibilné nite: ${updateError.message}`,
    )
  }

  if (!updatedRows || updatedRows.length === 0) {
    throw new Error("Žiadna položka nebola aktualizovaná")
  }

  revalidatePath("/", "layout")
  revalidatePath("/medical-cosmetics/biokompatibilne-nite")
  revalidatePath("/admin/medical-cosmetics_settings/biokompatibilne-nite_settings")

  return {
    success: true,
    message: "Biokompatibilné nite boli aktualizované.",
  }
}
