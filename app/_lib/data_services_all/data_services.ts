import { createClient } from "@supabase/supabase-js";

type ImageGalleryItem = {
  src: string;
  alt: string;
};

type ServiceRow = {
  id: string;
  slug: string;
  title: string;
  text: string | null;
  about_title: string | null;
  about: string | null;
  image_url: string | null;
  image_gallery: unknown;
  is_active: boolean;
  order_index: number | null;
};

export type CmsService = {
  id: string;
  slug: string;
  title: string;
  text: string;
  aboutTitle: string;
  about: string;
  imageUrl: string;
  imageGallery: ImageGalleryItem[];
  isActive: boolean;
  orderIndex: number;
};

// Pre nove citanie dat pouzivame verejny anon client.
// Je to jednoduche a neblokuje nas to na cookies alebo session.
function getPublicSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL");
  }

  if (!supabaseAnonKey) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_ANON_KEY");
  }

  return createClient(supabaseUrl, supabaseAnonKey);
}

// Bezpecne vrati string, aby UI nemuselo stale riesit null alebo undefined.
function getString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

// Ked order_index chyba, vratime 0 a zachovame stabilne poradie.
function getOrderIndex(value: number | null) {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

// Gallery v DB moze prist ako jsonb pole objektov. Tu si ho cistime do jednotneho tvaru.
function getImageGallery(value: unknown) {
  if (!Array.isArray(value)) {
    return [] as ImageGalleryItem[];
  }

  return value
    .map((item) => {
      if (!item || typeof item !== "object" || Array.isArray(item)) {
        return null;
      }

      const record = item as Record<string, unknown>;
      const src = getString(record.src);
      const alt = getString(record.alt);

      if (!src) {
        return null;
      }

      return { src, alt } satisfies ImageGalleryItem;
    })
    .filter((item): item is ImageGalleryItem => Boolean(item));
}

// Vrati vsetky sluzby z novej tabulky `services`.
export async function getAllServices(options?: { includeInactive?: boolean }) {
  const includeInactive = options?.includeInactive ?? false;
  const supabase = getPublicSupabaseClient();

  let query = supabase
    .from("services")
    .select(
      "id, slug, title, text, about_title, about, image_url, image_gallery, is_active, order_index",
    )
    .order("order_index", { ascending: true });

  if (!includeInactive) {
    query = query.eq("is_active", true);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching services from DB:", error);
    return [] as CmsService[];
  }

  return ((data ?? []) as ServiceRow[]).map((row) => ({
    id: row.id,
    slug: row.slug,
    title: getString(row.title),
    text: getString(row.text),
    aboutTitle: getString(row.about_title),
    about: getString(row.about),
    imageUrl: getString(row.image_url),
    imageGallery: getImageGallery(row.image_gallery),
    isActive: Boolean(row.is_active),
    orderIndex: getOrderIndex(row.order_index),
  }));
}

// Vrati jednu konkretnu sluzbu podla slugu.
export async function getServiceBySlug(
  slug: string,
  options?: { includeInactive?: boolean },
) {
  const services = await getAllServices(options);
  return services.find((service) => service.slug === slug) ?? null;
}
