"use server";

import { revalidatePath } from "next/cache";
import { getSupabaseServerClient } from "../supabase/server";

type OxygeneoData = {
  name: string;
  content: {
    intro?: string;
    description?: string;
    stepsTitle?: string;
    steps?: string[];
    result?: string;
  };
  metadata: {
    citationLabel?: string;
    citationUrl?: string;
  };
  is_active?: boolean;
};

export async function updateOxygeneo(formData: FormData) {
  const supabase = await getSupabaseServerClient();

  // Zistíme, kto odoslal formulár. Ukladanie chceme povoliť iba adminovi,
  // aby obsah webu nemohol meniť neprihlásený alebo nesprávny používateľ.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user.email !== process.env.ADMIN_EMAIL) {
    throw new Error("Unauthorized");
  }

  // Z formulára si vytiahneme slug záznamu a JSON string s dátami.
  // Slug určuje, ktorý riadok v service_items sa má aktualizovať.
  const slug = formData.get("slug")?.toString() || "oxygeneo";
  const rawData = formData.get("data")?.toString();

  // Ak data vôbec neprišli, nemáme čo spracovať ani uložiť.
  if (!rawData) {
    throw new Error("Chýbajú dáta pre Oxygeneo");
  }

  let payload: OxygeneoData;

  // Formulár posiela obsah ako JSON text, preto ho musíme premeniť
  // na objekt. Ak parse zlyhá, dáta prišli v neplatnom formáte.
  try {
    payload = JSON.parse(rawData);
  } catch {
    throw new Error("Neplatné dáta formulára");
  }

  // Overíme základnú štruktúru payloadu, aby sme na serveri nepracovali
  // s neúplnými alebo nesprávnymi dátami. Server si to kontroluje sám,
  // nestačí sa spoliehať len na klientský formulár.
  if (
    typeof payload.name !== "string" ||
    (typeof payload.content.intro !== "string" &&
      !Array.isArray(payload.content.steps)) ||
    (typeof payload.content.description !== "string" &&
      typeof payload.content.result !== "string") ||
    (typeof payload.metadata.citationLabel !== "string" &&
      typeof payload.metadata.citationUrl !== "string") ||
    typeof payload.is_active !== "boolean"
  ) {
    throw new Error("Neplatná štruktúra dát pre Oxygeneo");
  }

  // Text odsekov zjednotíme do poľa stringov.
  // Robí sa to preto, že formulár pracuje s textarea ako s jedným textom,
  // ale v databáze a na fronte sa paragraphs používa ako pole odsekov.
  const normalizedSteps = Array.isArray(payload.content.steps)
    ? payload.content.steps
        .map((step) => (typeof step === "string" ? step.trim() : ""))
        .filter(Boolean)
    : typeof payload.content.steps === "string"
      ? (payload.content.steps as string)
          .split(/\r?\n\s*\r?\n|\r?\n/)
          .map((step) => step.trim())
          .filter(Boolean)
      : [];

  // Načítame existujúci content, aby sme pri update neprepísali celý objekt,
  // ale zachovali aj ostatné kľúče, ktoré môžu byť v content uložené.
  const { data: existingItem, error: existingItemError } = await supabase
    .from("service_items")
    .select("content, metadata")
    .eq("slug", slug)
    .single();

  if (existingItemError) {
    throw new Error(`Chyba pri načítaní položky: ${existingItemError.message}`);
  }

  // Načítame existujúci content z databázy a bezpečne ho pretypujeme.
  // Ak content nie je objekt alebo neexistuje, použijeme prázdny objekt.
  // To umožňuje merge s novými dátami bez straty existujúcich kľúčov.
  const currentContent =
    existingItem?.content && typeof existingItem.content === "object"
      ? (existingItem.content as Record<string, unknown>)
      : {};

  // Rovnakú logiku aplikujeme aj na metadata.
  // Overujeme typ a v prípade neúspechu nastavíme prázdny objekt,
  // aby sme nezlyhal pri pokuse o merge s novými metadátami.
  const currentMetadata =
    existingItem?.metadata && typeof existingItem.metadata === "object"
      ? (existingItem.metadata as Record<string, unknown>)
      : {};

  // Uložíme nové hodnoty do databázy. Name a is_active prepíšeme priamo,
  // content poskladáme zo starého objektu a nahradíme len paragraphs,
  // aby sme zbytočne nevymazali iné uložené dáta.
  const { data: updatedRows, error: updateError } = await supabase
    .from("service_items")
    .update({
      name: payload.name,
      is_active: payload.is_active,
      content: {
        ...currentContent,
        intro: payload.content.intro,
        description: payload.content.description,
        stepsTitle: payload.content.stepsTitle,
        steps: normalizedSteps,
        result: payload.content.result,
      },
      metadata: {
        ...currentMetadata,
        citationLabel: payload.metadata.citationLabel,
        citationUrl: payload.metadata.citationUrl,
      },
    })
    .eq("slug", slug)
    .select("slug");

  if (!updatedRows || updatedRows.length === 0) {
    throw new Error("Žiadna položka nebola aktualizovaná");
  }

  // Po úspešnom update vyčistíme cache dotknutých stránok,
  // aby sa nové dáta zobrazili hneď bez čakania na ďalší deploy alebo refresh cache.
  revalidatePath("/", "layout");
  revalidatePath("/about");
  revalidatePath("/admin/oxygeneo");

  // Klientovi vrátime jednoduchú úspešnú odpoveď, aby mohol zobraziť toast.
  return {
    success: true,
    message: "Oxygeneo bola aktualizovaná.",
  };
}
