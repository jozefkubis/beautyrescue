"use server"

import { revalidatePath } from "next/cache"
import { getSupabaseServerClient } from "../supabase/server"

type ProfhiloMainUpdatePayload = {
  name: string
  paragraphs: string | string[]
  is_active: boolean
}

type ProfhiloAboutSectionPayload = {
  product: string
  whatTitle: string
  whatItems: string | string[]
  howTitle: string
  howItems: string | string[]
  benefitsTitle: string
  benefitsItems: string | string[]
  suitableTitle: string
  suitableItems: string | string[]
}

function normalizeToArray(value: string | string[]) {
  return Array.isArray(value)
    ? value.map((item) => item.trim()).filter(Boolean)
    : value
        .split(/\r?\n\s*\r?\n|\r?\n/)
        .map((item) => item.trim())
        .filter(Boolean)
}

async function requireAdmin() {
  const supabase = await getSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user || user.email !== process.env.ADMIN_EMAIL) {
    throw new Error("Unauthorized")
  }

  return supabase
}

function revalidateProfhiloPaths() {
  revalidatePath("/", "layout")
  revalidatePath("/medical-cosmetics/profhilo")
  revalidatePath("/admin/medical-cosmetics_settings/profhilo_settings")
}

export async function updateProfhiloMain(formData: FormData) {
  // Overíme admina, aby sa k úprave obsahu nedostal neautorizovaný používateľ.
  const supabase = await requireAdmin()

  const slug = formData.get("slug")?.toString() || "profhilo"
  const rawData = formData.get("data")?.toString()

  if (!rawData) {
    throw new Error("Chýbajú dáta pre Profhilo")
  }

  let payload: ProfhiloMainUpdatePayload
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

  const normalizedParagraphs = normalizeToArray(payload.paragraphs)

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
    throw new Error(`Chyba pri aktualizácii Profhilo: ${updateError.message}`)
  }
  if (!updatedRows || updatedRows.length === 0) {
    throw new Error("Žiadna položka nebola aktualizovaná")
  }

  revalidateProfhiloPaths()

  return { success: true, message: "Profhilo bolo aktualizované." }
}

async function updateProfhiloAboutSection(
  formData: FormData,
  sectionIndex: number,
  label: string,
) {
  const supabase = await requireAdmin()

  const slug = formData.get("slug")?.toString() || "profhilo"
  const rawData = formData.get("data")?.toString()

  if (!rawData) {
    throw new Error(`Chýbajú dáta pre ${label}`)
  }

  let payload: ProfhiloAboutSectionPayload
  try {
    payload = JSON.parse(rawData)
  } catch {
    throw new Error("Neplatné dáta formulára")
  }

  if (
    typeof payload.product !== "string" ||
    typeof payload.whatTitle !== "string" ||
    (!Array.isArray(payload.whatItems) && typeof payload.whatItems !== "string") ||
    typeof payload.howTitle !== "string" ||
    (!Array.isArray(payload.howItems) && typeof payload.howItems !== "string") ||
    typeof payload.benefitsTitle !== "string" ||
    (!Array.isArray(payload.benefitsItems) &&
      typeof payload.benefitsItems !== "string") ||
    typeof payload.suitableTitle !== "string" ||
    (!Array.isArray(payload.suitableItems) &&
      typeof payload.suitableItems !== "string")
  ) {
    throw new Error("Neplatná štruktúra dát")
  }

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

  const currentAbout =
    currentContent.about && typeof currentContent.about === "object"
      ? (currentContent.about as Record<string, unknown>)
      : {}

  const currentSections = Array.isArray(
    (currentAbout as Record<string, unknown>).sections,
  )
    ? ([...(currentAbout as { sections: unknown[] }).sections] as Record<
        string,
        unknown
      >[])
    : []

  // Meníme iba vybranú sekciu v poli sections, ostatné sekcie ostávajú bez zmeny.
  currentSections[sectionIndex] = {
    ...(currentSections[sectionIndex] ?? {}),
    product: payload.product.trim(),
    whatTitle: payload.whatTitle.trim(),
    whatItems: normalizeToArray(payload.whatItems),
    howTitle: payload.howTitle.trim(),
    howItems: normalizeToArray(payload.howItems),
    benefitsTitle: payload.benefitsTitle.trim(),
    benefitsItems: normalizeToArray(payload.benefitsItems),
    suitableTitle: payload.suitableTitle.trim(),
    suitableItems: normalizeToArray(payload.suitableItems),
  }

  const { data: updatedRows, error: updateError } = await supabase
    .from("service_items")
    .update({
      content: {
        ...currentContent,
        about: {
          ...currentAbout,
          sections: currentSections,
        },
      },
    })
    .eq("slug", slug)
    .select("slug")

  if (updateError) {
    throw new Error(`Chyba pri aktualizácii ${label}: ${updateError.message}`)
  }
  if (!updatedRows || updatedRows.length === 0) {
    throw new Error("Žiadna položka nebola aktualizovaná")
  }

  revalidateProfhiloPaths()

  return { success: true, message: `${label} bolo aktualizované.` }
}

export async function updateProfhiloAboutSectionOne(formData: FormData) {
  return updateProfhiloAboutSection(formData, 0, "Profhilo sekcia 1")
}

export async function updateProfhiloAboutSectionTwo(formData: FormData) {
  return updateProfhiloAboutSection(formData, 1, "Profhilo sekcia 2")
}
