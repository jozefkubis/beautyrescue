"use server";

import { revalidatePath } from "next/cache";
import { getSupabaseServerClient } from "../supabase/server";

type PricingItem = {
  id: number | string;
  treatment: string;
  price: string;
  sale: string;
};

function parsePriceValue(value: string) {
  // Urobi z textu cenu v cislach (napr. "50 €", "50,-", "50,5").
  const normalized = value
    .replace(/\s|€/g, "")
    .replace(",-", "")
    .replace(",", ".");
  const parsed = Number(normalized);

  // Ak sa hodnota neda precitat, vratime 0, aby appka nespadla.
  if (Number.isNaN(parsed)) {
    return 0;
  }

  return parsed;
}

// MARK: UPDATE PRICING
export async function updatePricing(formData: FormData) {
  // Klient pre Supabase na serveri (pracuje s aktualnou session).
  const supabase = await getSupabaseServerClient();

  // Cennik moze menit len admin.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (
    !user ||
    (user.email !== process.env.ADMIN_EMAIL_1 &&
      user.email !== process.env.ADMIN_EMAIL_2)
  ) {
    throw new Error("Unauthorized");
  }

  // Z formulara pride cele pole poloziek ako JSON v kluci "data".
  const rawData = formData.get("data")?.toString();

  if (!rawData) {
    throw new Error("Missing pricing data");
  }

  // JSON text premenime na pole poloziek, cez ktore vieme prejst v cykle.
  const items: PricingItem[] = JSON.parse(rawData);

  for (const item of items) {
    // Ceny z inputov prevedieme na cisla pre databazu.
    const itemId = item.id.toString();
    const priceBeforeDiscount = parsePriceValue(item.price);
    const priceAfterDiscount = item.sale.trim()
      ? parsePriceValue(item.sale)
      : priceBeforeDiscount;

    // Aktualizujeme presne jeden riadok podla id.
    const { error } = await supabase
      .from("pricing")
      .update({
        treatment: item.treatment.trim(),
        price_before_discount: priceBeforeDiscount,
        price_after_discount: priceAfterDiscount,
        // Zlavu ulozime iba ak je akcna cena nizsia ako povodna.
        discount:
          priceAfterDiscount < priceBeforeDiscount
            ? priceBeforeDiscount - priceAfterDiscount
            : null,
      })
      .eq("id", itemId);

    if (error) {
      throw new Error(`Chyba pri ID ${itemId}: ${error.message}`);
    }
  }

  // Obnovi cache, aby sa po refreshi hned zobrazili nove data.
  revalidatePath("/", "layout");
}

// MARK: INSERT TREATMENT
export async function insertTreatment(service_id: string) {
  // Klient pre Supabase na serveri (pracuje s aktualnou session).
  const supabase = await getSupabaseServerClient();

  // Cennik moze menit len admin.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (
    !user ||
    (user.email !== process.env.ADMIN_EMAIL_1 &&
      user.email !== process.env.ADMIN_EMAIL_2)
  ) {
    throw new Error("Unauthorized");
  }

  // Pri vkladaní novej procedúry pridáme service_id priamo do objektu.
  // Trigger v databáze automaticky nastaví order_index podľa poradia v rámci service_id.
  const { data, error } = await supabase
    .from("pricing")
    .insert({
      service_id, // pridáme service_id
      treatment: "",
      price_before_discount: null,
      price_after_discount: null,
      // Zľavu uložíme iba ak je akčná cena nižšia ako pôvodná.
      discount: null,
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Chyba pri vkladani novej procedury: ${error.message}`);
  }

   return data;
}

// MARK: DELETE TREATMENT
export async function deleteTreatment(treatmentId: string) {
  // Klient pre Supabase na serveri (pracuje s aktualnou session).
  const supabase = await getSupabaseServerClient();
  // Cennik moze menit len admin.
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (
    !user ||
    (user.email !== process.env.ADMIN_EMAIL_1 &&
      user.email !== process.env.ADMIN_EMAIL_2)
  ) {
    throw new Error("Unauthorized");
  }

  const { error } = await supabase
    .from("pricing")
    .delete()
    .eq("id", treatmentId);

  if (error) {
    throw new Error(`Chyba pri mazani procedury: ${error.message}`);
  }
}
