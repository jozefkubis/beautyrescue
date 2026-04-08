"use server"

import { revalidatePath } from "next/cache"
import { getSupabaseServerClient } from "../supabase/server"

type JaluproMainUpdatePayload = {
  name: string
  paragraphs: string | string[]
  about: {
    title: string
    effectsTitle: string
    treatmentTitle: string
    aftercareTitle: string
    variants: string
  }
  attributes: {
    effects: string | string[]
    effectSummary: string
    treatmentParagraphs: string | string[]
    aftercareParagraphs: string | string[]
  }
  is_active: boolean
}

type JaluproParagraphsUpdatePayload = {
  name: string
  paragraphs: string | string[]
  is_active: boolean
}

type JaluproSuperHydroUpdatePayload = {
  name: string
  summary: string
  topBullets: string | string[]
  bottomBullets: string | string[]
  is_active: boolean
}

function normalizeToArray(value: string | string[]) {
  return Array.isArray(value)
    ? value.map((item) => item.trim()).filter(Boolean)
    : value
        .split(/\r?\n\s*\r?\n|\r?\n/)
        .map((item) => item.trim())
        .filter(Boolean)
}

// Ak formulár obsahuje nový obrázok, validujeme ho, nahráme do storage
// a vrátime podpísanú URL na uloženie do image_url.
async function uploadImageIfProvided(
  supabase: Awaited<ReturnType<typeof getSupabaseServerClient>>,
  formData: FormData,
  slug: string,
) {
  const imageFile = formData.get("image_file")

  if (!imageFile || !(imageFile instanceof File) || imageFile.size <= 0) {
    return null
  }

  const maxFileSize = 5 * 1024 * 1024
  const allowedMimeTypes = ["image/jpeg", "image/png", "image/webp"]

  if (imageFile.size > maxFileSize) {
    throw new Error("Obrázok je príliš veľký (max 5MB)")
  }

  if (!allowedMimeTypes.includes(imageFile.type)) {
    throw new Error("Nepovolený typ obrázka (povolené JPG, PNG alebo WebP)")
  }

  const fileName = `${slug}-${Date.now()}-${imageFile.name}`.replace(/\s/g, "-")

  const { data: uploadData, error: uploadError } = await supabase.storage
    .from("BRImages")
    .upload(fileName, imageFile, {
      cacheControl: "3600",
      upsert: true,
    })

  if (uploadError) {
    throw new Error(`Chyba pri nahrávaní obrázka: ${uploadError.message}`)
  }

  const { data: signedData, error: signedError } = await supabase.storage
    .from("BRImages")
    .createSignedUrl(uploadData.path, 157680000)

  if (signedError || !signedData?.signedUrl) {
    throw new Error(
      `Chyba pri vytváraní URL obrázka: ${signedError?.message ?? "Neznáma chyba"}`,
    )
  }

  return signedData.signedUrl
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

function revalidateJalupro() {
  revalidatePath("/", "layout")
  revalidatePath("/medical-cosmetics/jalupro")
  revalidatePath("/medical-cosmetics/jalupro/classic")
  revalidatePath("/medical-cosmetics/jalupro/hmw")
  revalidatePath("/medical-cosmetics/jalupro/super_hydro")
  revalidatePath("/medical-cosmetics/jalupro/young_eye")
  revalidatePath("/admin/medical-cosmetics_settings/jalupro_settings")
}

export async function updateJaluproMain(formData: FormData) {
  // Overenie admina robíme hneď na začiatku, aby sa ďalej nespracúvali neautorizované dáta.
  const supabase = await requireAdmin()

  const slug = formData.get("slug")?.toString() || "jalupro"
  const rawData = formData.get("data")?.toString()

  if (!rawData) {
    throw new Error("Chýbajú dáta pre Jalupro")
  }

  let payload: JaluproMainUpdatePayload
  try {
    payload = JSON.parse(rawData)
  } catch {
    throw new Error("Neplatné dáta formulára")
  }

  if (
    typeof payload.name !== "string" ||
    (!Array.isArray(payload.paragraphs) && typeof payload.paragraphs !== "string") ||
    typeof payload.about?.title !== "string" ||
    typeof payload.about?.effectsTitle !== "string" ||
    typeof payload.about?.treatmentTitle !== "string" ||
    typeof payload.about?.aftercareTitle !== "string" ||
    typeof payload.about?.variants !== "string" ||
    (!Array.isArray(payload.attributes?.effects) &&
      typeof payload.attributes?.effects !== "string") ||
    typeof payload.attributes?.effectSummary !== "string" ||
    (!Array.isArray(payload.attributes?.treatmentParagraphs) &&
      typeof payload.attributes?.treatmentParagraphs !== "string") ||
    (!Array.isArray(payload.attributes?.aftercareParagraphs) &&
      typeof payload.attributes?.aftercareParagraphs !== "string") ||
    typeof payload.is_active !== "boolean"
  ) {
    throw new Error("Neplatná štruktúra dát")
  }

  const normalizedParagraphs = normalizeToArray(payload.paragraphs)
  const normalizedEffects = normalizeToArray(payload.attributes.effects)
  const normalizedTreatmentParagraphs = normalizeToArray(
    payload.attributes.treatmentParagraphs,
  )
  const normalizedAftercareParagraphs = normalizeToArray(
    payload.attributes.aftercareParagraphs,
  )
  const uploadedImageUrl = await uploadImageIfProvided(supabase, formData, slug)

  const { data: existingItem, error: existingItemError } = await supabase
    .from("service_items")
    .select("content, attributes")
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

  const currentAttributes =
    existingItem?.attributes && typeof existingItem.attributes === "object"
      ? (existingItem.attributes as Record<string, unknown>)
      : {}

  const { data: updatedRows, error: updateError } = await supabase
    .from("service_items")
    .update({
      name: payload.name.trim(),
      is_active: payload.is_active,
      content: {
        ...currentContent,
        paragraphs: normalizedParagraphs,
        about: {
          ...currentAbout,
          title: payload.about.title.trim(),
          effectsTitle: payload.about.effectsTitle.trim(),
          treatmentTitle: payload.about.treatmentTitle.trim(),
          aftercareTitle: payload.about.aftercareTitle.trim(),
          variants: payload.about.variants.trim(),
        },
      },
      attributes: {
        ...currentAttributes,
        effects: normalizedEffects,
        effectSummary: payload.attributes.effectSummary.trim(),
        treatmentParagraphs: normalizedTreatmentParagraphs,
        aftercareParagraphs: normalizedAftercareParagraphs,
      },
      ...(uploadedImageUrl ? { image_url: uploadedImageUrl } : {}),
    })
    .eq("slug", slug)
    .select("slug")

  if (updateError) {
    throw new Error(`Chyba pri aktualizácii Jalupro: ${updateError.message}`)
  }

  if (!updatedRows || updatedRows.length === 0) {
    throw new Error("Žiadna položka nebola aktualizovaná")
  }

  revalidateJalupro()

  return { success: true, message: "Jalupro bolo aktualizované." }
}

async function updateJaluproParagraphSection(
  formData: FormData,
  fallbackSlug: string,
  label: string,
) {
  const supabase = await requireAdmin()

  const slug = formData.get("slug")?.toString() || fallbackSlug
  const rawData = formData.get("data")?.toString()

  if (!rawData) {
    throw new Error(`Chýbajú dáta pre ${label}`)
  }

  let payload: JaluproParagraphsUpdatePayload
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
  const uploadedImageUrl = await uploadImageIfProvided(supabase, formData, slug)

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
      ...(uploadedImageUrl ? { image_url: uploadedImageUrl } : {}),
    })
    .eq("slug", slug)
    .select("slug")

  if (updateError) {
    throw new Error(`Chyba pri aktualizácii ${label}: ${updateError.message}`)
  }

  if (!updatedRows || updatedRows.length === 0) {
    throw new Error("Žiadna položka nebola aktualizovaná")
  }

  revalidateJalupro()

  return { success: true, message: `${label} bolo aktualizované.` }
}

export async function updateJaluproClassic(formData: FormData) {
  return updateJaluproParagraphSection(formData, "jalupro-classic", "Jalupro Classic")
}

export async function updateJaluproHMW(formData: FormData) {
  return updateJaluproParagraphSection(formData, "jalupro-hmw", "Jalupro HMW")
}

export async function updateJaluproYoungEye(formData: FormData) {
  return updateJaluproParagraphSection(
    formData,
    "jalupro-young-eye",
    "Jalupro Young Eye",
  )
}

export async function updateJaluproSuperHydro(formData: FormData) {
  const supabase = await requireAdmin()

  const slug = formData.get("slug")?.toString() || "jalupro-super-hydro"
  const rawData = formData.get("data")?.toString()

  if (!rawData) {
    throw new Error("Chýbajú dáta pre Jalupro Super Hydro")
  }

  let payload: JaluproSuperHydroUpdatePayload
  try {
    payload = JSON.parse(rawData)
  } catch {
    throw new Error("Neplatné dáta formulára")
  }

  if (
    typeof payload.name !== "string" ||
    typeof payload.summary !== "string" ||
    (!Array.isArray(payload.topBullets) && typeof payload.topBullets !== "string") ||
    (!Array.isArray(payload.bottomBullets) &&
      typeof payload.bottomBullets !== "string") ||
    typeof payload.is_active !== "boolean"
  ) {
    throw new Error("Neplatná štruktúra dát")
  }

  const normalizedTop = normalizeToArray(payload.topBullets)
  const normalizedBottom = normalizeToArray(payload.bottomBullets)
  const uploadedImageUrl = await uploadImageIfProvided(supabase, formData, slug)

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
      summary: payload.summary.trim(),
      is_active: payload.is_active,
      content: {
        ...currentContent,
        topBullets: normalizedTop,
        bottomBullets: normalizedBottom,
      },
      ...(uploadedImageUrl ? { image_url: uploadedImageUrl } : {}),
    })
    .eq("slug", slug)
    .select("slug")

  if (updateError) {
    throw new Error(
      `Chyba pri aktualizácii Jalupro Super Hydro: ${updateError.message}`,
    )
  }

  if (!updatedRows || updatedRows.length === 0) {
    throw new Error("Žiadna položka nebola aktualizovaná")
  }

  revalidateJalupro()

  return { success: true, message: "Jalupro Super Hydro bolo aktualizované." }
}
