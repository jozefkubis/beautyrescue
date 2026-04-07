"use server";

import { revalidatePath } from "next/cache";
import { getSupabaseServerClient } from "../supabase/server";

type BtoulotoxinMainUpdatePayload = {
  name: string;
  attributes: {
    intro: string | string[];
    complications: string | string[];
    contraindications: string | string[];
  };
  content: {
    about: {
      title: string;
      paragraphs: string | string[];
    };
  };
  is_active: boolean;
};

type BtoulotoxinPotenieUpdatePayload = {
  name: string;
  content: {
    paragraphs: string | string[];
  };
  metadata?: {
    sourceUrl?: string;
  };
  is_active: boolean;
};

type BtoulotoxinVraskyUpdatePayload = {
  name: string;
  summary: string;
  content: {
    paragraphs: string | string[];
  };
  is_active: boolean;
};

export async function updateBotulotoxinMain(formData: FormData) {
  // Vytvoríme serverového Supabase klienta, aby sme vedeli pracovať
  // s aktuálnou session používateľa aj s databázou priamo na serveri.
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
  const slug = formData.get("slug")?.toString() || "botulotoxin";
  const rawData = formData.get("data")?.toString();

  // Ak data vôbec neprišli, nemáme čo spracovať ani uložiť.
  if (!rawData) {
    throw new Error("Chýbajú dáta pre Botulotoxín");
  }

  let payload: BtoulotoxinMainUpdatePayload;

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
    (!Array.isArray(payload.attributes.intro) &&
      typeof payload.attributes.intro !== "string") ||
    (!Array.isArray(payload.attributes.complications) &&
      typeof payload.attributes.complications !== "string") ||
    (!Array.isArray(payload.attributes.contraindications) &&
      typeof payload.attributes.contraindications !== "string") ||
    typeof payload.content.about.title !== "string" ||
    (!Array.isArray(payload.content.about.paragraphs) &&
      typeof payload.content.about.paragraphs !== "string") ||
    typeof payload.is_active !== "boolean"
  ) {
    throw new Error("Neplatná štruktúra dát");
  }

  // Text odsekov zjednotíme do poľa stringov.
  // Robí sa to preto, že formulár pracuje s textarea ako s jedným textom,
  // ale v databáze a na fronte sa paragraphs používa ako pole odsekov.
  const normalizedParagraphs = Array.isArray(payload.content.about.paragraphs)
    ? payload.content.about.paragraphs
        .map((paragraph) =>
          typeof paragraph === "string" ? paragraph.trim() : "",
        )
        .filter(Boolean)
    : payload.content.about.paragraphs
        .split(/\r?\n\s*\r?\n|\r?\n/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean);

  const normalizedIntro = Array.isArray(payload.attributes.intro)
    ? payload.attributes.intro
        .map((paragraph) =>
          typeof paragraph === "string" ? paragraph.trim() : "",
        )
        .filter(Boolean)
    : payload.attributes.intro
        .split(/\r?\n\s*\r?\n|\r?\n/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean);

  const normalizedComplications = Array.isArray(
    payload.attributes.complications,
  )
    ? payload.attributes.complications
        .map((paragraph) =>
          typeof paragraph === "string" ? paragraph.trim() : "",
        )
        .filter(Boolean)
    : payload.attributes.complications
        .split(/\r?\n\s*\r?\n|\r?\n/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean);

  const normalizedContraindications = Array.isArray(
    payload.attributes.contraindications,
  )
    ? payload.attributes.contraindications
        .map((paragraph) =>
          typeof paragraph === "string" ? paragraph.trim() : "",
        )
        .filter(Boolean)
    : payload.attributes.contraindications
        .split(/\r?\n\s*\r?\n|\r?\n/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean);

  // Načítame existujúci content a artikle, aby sme pri update neprepísali celý objekt,
  // ale zachovali aj ostatné kľúče, ktoré môžu byť v content uložené.
  const { data: existingItem, error: existingItemError } = await supabase
    .from("service_items")
    .select("content, attributes")
    .eq("slug", slug)
    .single();

  if (existingItemError) {
    throw new Error(`Chyba pri načítaní položky: ${existingItemError.message}`);
  }

  const currentContent =
    existingItem?.content && typeof existingItem.content === "object"
      ? (existingItem.content as Record<string, unknown>)
      : {};

  const currentAbout =
    currentContent.about && typeof currentContent.about === "object"
      ? (currentContent.about as Record<string, unknown>)
      : {};

  // Uložíme nové hodnoty do databázy. Name a is_active prepíšeme priamo,
  // content poskladáme zo starého objektu a nahradíme len paragraphs,
  // aby sme zbytočne nevymazali iné uložené dáta.
  const { data: updatedRows, error: updateError } = await supabase
    .from("service_items")
    .update({
      name: payload.name.trim(),
      is_active: payload.is_active,
      content: {
        ...currentContent,
        about: {
          ...currentAbout,
          title: payload.content.about.title.trim(),
          paragraphs: normalizedParagraphs,
        },
      },
      attributes: {
        ...existingItem?.attributes,
        intro: normalizedIntro,
        complications: normalizedComplications,
        contraindications: normalizedContraindications,
      },
    })
    .eq("slug", slug)
    .select("slug");

  if (updateError) {
    throw new Error(
      `Chyba při aktualizaci Botulotoxín: ${updateError.message}`,
    );
  }
  if (!updatedRows || updatedRows.length === 0) {
    throw new Error("Žiadna položka nebola aktualizovaná");
  }

  // Po úspešnom update vyčistíme cache dotknutých stránok,
  // aby sa nové dáta zobrazili hneď bez čakania na ďalší deploy alebo refresh cache.
  revalidatePath("/", "layout");
  revalidatePath("/about");
  revalidatePath("/admin/botulotoxin");

  // Klientovi vrátime jednoduchú úspešnú odpoveď, aby mohol zobraziť toast.
  return {
    success: true,
    message: "Botulotoxín bolo aktualizované.",
  };
}

// MARK: POTENIE
export async function updateBotulotoxinPotenie(formData: FormData) {
  // Vytvoríme serverového Supabase klienta, aby sme vedeli pracovať
  // s aktuálnou session používateľa aj s databázou priamo na serveri.
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
  const slug = formData.get("slug")?.toString() || "botulotoxin-potenie";
  const rawData = formData.get("data")?.toString();

  // Ak data vôbec neprišli, nemáme čo spracovať ani uložiť.
  if (!rawData) {
    throw new Error("Chýbajú dáta pre Botulotoxín Potenie");
  }

  let payload: BtoulotoxinPotenieUpdatePayload;

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
    (!Array.isArray(payload.content.paragraphs) &&
      typeof payload.content.paragraphs !== "string") ||
    typeof payload.is_active !== "boolean" ||
    (typeof payload.metadata?.sourceUrl !== "string" &&
      payload.metadata?.sourceUrl !== undefined)
  ) {
    throw new Error("Neplatná štruktúra dát");
  }

  // Text odsekov zjednotíme do poľa stringov.
  // Robí sa to preto, že formulár pracuje s textarea ako s jedným textom,
  // ale v databáze a na fronte sa paragraphs používa ako pole odsekov.
  const normalizedParagraphs = Array.isArray(payload.content.paragraphs)
    ? payload.content.paragraphs
        .map((paragraph) =>
          typeof paragraph === "string" ? paragraph.trim() : "",
        )
        .filter(Boolean)
    : payload.content.paragraphs
        .split(/\r?\n\s*\r?\n|\r?\n/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean);

  // Načítame existujúci content a artikle, aby sme pri update neprepísali celý objekt,
  // ale zachovali aj ostatné kľúče, ktoré môžu byť v content uložené.
  const { data: existingItem, error: existingItemError } = await supabase
    .from("service_items")
    .select("content")
    .eq("slug", slug)
    .single();

  if (existingItemError) {
    throw new Error(`Chyba pri načítaní položky: ${existingItemError.message}`);
  }

  const currentContent =
    existingItem?.content && typeof existingItem.content === "object"
      ? (existingItem.content as Record<string, unknown>)
      : {};

  // Uložíme nové hodnoty do databázy. Name a is_active prepíšeme priamo,
  // content poskladáme zo starého objektu a nahradíme len paragraphs,
  // aby sme zbytočne nevymazali iné uložené dáta.
  const { data: updatedRows, error: updateError } = await supabase
    .from("service_items")
    .update({
      name: payload.name.trim(),
      is_active: payload.is_active,
      content: {
        ...currentContent,
        paragraphs: normalizedParagraphs,
      },
      metadata: {
        ...currentContent,
        sourceUrl: payload.metadata?.sourceUrl?.trim() || "",
      },
    })
    .eq("slug", slug)
    .select("slug");

  if (updateError) {
    throw new Error(
      `Chyba při aktualizaci Botulotoxín: ${updateError.message}`,
    );
  }
  if (!updatedRows || updatedRows.length === 0) {
    throw new Error("Žiadna položka nebola aktualizovaná");
  }

  // Po úspešnom update vyčistíme cache dotknutých stránok,
  // aby sa nové dáta zobrazili hneď bez čakania na ďalší deploy alebo refresh cache.
  revalidatePath("/", "layout");
  revalidatePath("/admin/botulotoxin/potenie");

  // Klientovi vrátime jednoduchú úspešnú odpoveď, aby mohol zobraziť toast.
  return {
    success: true,
    message: "Botulotoxín potenie bolo aktualizované.",
  };
}

// MARK: VRASKY
export async function updateBotulotoxinVrasky(formData: FormData) {
  // Vytvoríme serverového Supabase klienta, aby sme vedeli pracovať
  // s aktuálnou session používateľa aj s databázou priamo na serveri.
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
  const slug = formData.get("slug")?.toString() || "botulotoxin-vrasky";
  const rawData = formData.get("data")?.toString();

  // Ak data vôbec neprišli, nemáme čo spracovať ani uložiť.
  if (!rawData) {
    throw new Error("Chýbajú dáta pre Botulotoxín Vrásky");
  }

  let payload: BtoulotoxinVraskyUpdatePayload;

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
    typeof payload.summary !== "string" ||
    (!Array.isArray(payload.content.paragraphs) &&
      typeof payload.content.paragraphs !== "string") ||
    typeof payload.is_active !== "boolean"
  ) {
    throw new Error("Neplatná štruktúra dát");
  }

  // Text odsekov zjednotíme do poľa stringov.
  // Robí sa to preto, že formulár pracuje s textarea ako s jedným textom,
  // ale v databáze a na fronte sa paragraphs používa ako pole odsekov.
  const normalizedParagraphs = Array.isArray(payload.content.paragraphs)
    ? payload.content.paragraphs
        .map((paragraph) =>
          typeof paragraph === "string" ? paragraph.trim() : "",
        )
        .filter(Boolean)
    : payload.content.paragraphs
        .split(/\r?\n\s*\r?\n|\r?\n/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean);

  // Načítame existujúci content a artikle, aby sme pri update neprepísali celý objekt,
  // ale zachovali aj ostatné kľúče, ktoré môžu byť v content uložené.
  const { data: existingItem, error: existingItemError } = await supabase
    .from("service_items")
    .select("content")
    .eq("slug", slug)
    .single();

  if (existingItemError) {
    throw new Error(`Chyba pri načítaní položky: ${existingItemError.message}`);
  }

  const currentContent =
    existingItem?.content && typeof existingItem.content === "object"
      ? (existingItem.content as Record<string, unknown>)
      : {};

  // Uložíme nové hodnoty do databázy. Name a is_active prepíšeme priamo,
  // content poskladáme zo starého objektu a nahradíme len paragraphs,
  // aby sme zbytočne nevymazali iné uložené dáta.
  const { data: updatedRows, error: updateError } = await supabase
    .from("service_items")
    .update({
      name: payload.name.trim(),
      summary: payload.summary.trim(),
      is_active: payload.is_active,
      content: {
        ...currentContent,
        paragraphs: normalizedParagraphs,
      },
    })
    .eq("slug", slug)
    .select("slug");

  if (updateError) {
    throw new Error(
      `Chyba při aktualizaci Botulotoxín Vrásky: ${updateError.message}`,
    );
  }
  if (!updatedRows || updatedRows.length === 0) {
    throw new Error("Žiadna položka nebola aktualizovaná");
  }

  // Po úspešnom update vyčistíme cache dotknutých stránok,
  // aby sa nové dáta zobrazili hneď bez čakania na ďalší deploy alebo refresh cache.
  revalidatePath("/", "layout");
  revalidatePath("/admin/botulotoxin/vrasky");

  // Klientovi vrátime jednoduchú úspešnú odpoveď, aby mohol zobraziť toast.
  return {
    success: true,
    message: "Botulotoxín Vrásky bolo aktualizované.",
  };
}
