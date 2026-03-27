"use server"

import { revalidatePath } from "next/cache"
import { getSupabaseServerClient } from "../supabase/server"

type PricingItem = {
  id: number | string
  treatment: string
  price: string
  sale: string
}

function parsePriceValue(value: string) {
  const normalized = value
    .replace(/\s|€/g, "")
    .replace(",-", "")
    .replace(",", ".")
  const parsed = Number(normalized)

  if (Number.isNaN(parsed)) {
    return 0
  }

  return parsed
}

export async function updatePricing(formData: FormData) {
  const supabase = await getSupabaseServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user || user.email !== process.env.ADMIN_EMAIL) {
    throw new Error("Unauthorized")
  }

  const rawData = formData.get("data")?.toString()

  if (!rawData) {
    throw new Error("Missing pricing data")
  }

  const items: PricingItem[] = JSON.parse(rawData)

  for (const item of items) {
    const itemId = item.id.toString()
    const priceBeforeDiscount = parsePriceValue(item.price)
    const priceAfterDiscount = item.sale.trim()
      ? parsePriceValue(item.sale)
      : priceBeforeDiscount

    const { error } = await supabase
      .from("pricing")
      .update({
        treatment: item.treatment.trim(),
        price_before_discount: priceBeforeDiscount,
        price_after_discount: priceAfterDiscount,
        discount:
          priceAfterDiscount < priceBeforeDiscount
            ? priceBeforeDiscount - priceAfterDiscount
            : null,
      })
      .eq("id", itemId)

    if (error) {
      throw new Error(`Chyba pri ID ${itemId}: ${error.message}`)
    }
  }

  revalidatePath("/", "layout")
}
