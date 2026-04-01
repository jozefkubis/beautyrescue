
"use server";

// --- IMPORTY A TYPY ---
import { revalidatePath } from "next/cache";
import { getSupabaseServerClient } from "../supabase/server";

// Typ pre payload, ktorý očakávame z formulára
type MezoterapiaUpdatePayload = {
	name: string;
	paragraphs: string | string[];
	is_active: boolean;
};

// --- GENERICKÁ UPDATE FUNKCIA ---
// Aktualizuje ľubovoľnú sekciu mezoterapie podľa slug a cesty na revalidáciu
async function updateMezoterapiaGeneric(
	formData: FormData,
	slugDefault: string,
	revalidateAdminPath: string
) {
	// 1. Overenie administrátora
	const supabase = await getSupabaseServerClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();
	if (!user || user.email !== process.env.ADMIN_EMAIL) {
		throw new Error("Unauthorized");
	}

	// 2. Získanie slug a dát z formulára
	const slug = formData.get("slug")?.toString() || slugDefault;
	const rawData = formData.get("data")?.toString();
	if (!rawData) {
		throw new Error("Chýbajú dáta pre Mezoterapia");
	}

	// 3. Parsovanie a validácia payloadu
	let payload: MezoterapiaUpdatePayload;
	try {
		payload = JSON.parse(rawData);
	} catch {
		throw new Error("Neplatné dáta formulára");
	}
	if (
		typeof payload.name !== "string" ||
		(!Array.isArray(payload.paragraphs) && typeof payload.paragraphs !== "string") ||
		typeof payload.is_active !== "boolean"
	) {
		throw new Error("Neplatná štruktúra dát");
	}

	// 4. Normalizácia odsekov (pole stringov)
	const normalizedParagraphs = Array.isArray(payload.paragraphs)
		? payload.paragraphs.map((paragraph) => (typeof paragraph === "string" ? paragraph.trim() : "")).filter(Boolean)
		: payload.paragraphs.split(/\r?\n\s*\r?\n|\r?\n/).map((paragraph) => paragraph.trim()).filter(Boolean);

	// 5. Načítanie existujúceho obsahu (aby sa nezmazali iné kľúče v content)
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

	// 6. Uloženie nových hodnôt do databázy
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
		.select("slug");
	if (updateError) {
		throw new Error(`Chyba pri aktualizácii Mezoterapia: ${updateError.message}`);
	}
	if (!updatedRows || updatedRows.length === 0) {
		throw new Error("Žiadna položka nebola aktualizovaná");
	}

	// 7. Revalidácia cache stránok, aby sa zmeny prejavili hneď
	revalidatePath("/", "layout");
	revalidatePath("/about");
	revalidatePath(revalidateAdminPath);
}

// --- EXPORTOVANÉ FUNKCIE PRE KAŽDÚ SEKCIU ---

// Aktualizuje hlavnú sekciu mezoterapie
export async function updateMezoterapia(formData: FormData) {
	return updateMezoterapiaGeneric(formData, "mezoterapia", "/admin/cosmetics_settings/mezoterapia_settings");
}

// Aktualizuje invazívnu sekciu mezoterapie
export async function updateMezoterapiaInvasive(formData: FormData) {
	return updateMezoterapiaGeneric(formData, "mezoterapia-invasive", "/admin/cosmetics_settings/mezoterapia_settings");
}

// Aktualizuje neinvazívnu sekciu mezoterapie
export async function updateMezoterapiaNonInvasive(formData: FormData) {
	return updateMezoterapiaGeneric(formData, "mezoterapia-non-invasive", "/admin/cosmetics_settings/mezoterapia_settings");
}
