import { getSupabaseServerClient } from "../supabase/server";

export type AboutMainProps = {
  aboutUsData: {
    slug: string;
    title: string;
    quote: string;
    quote_author: string;
    body_intro: string;
    body_team: string;
    body_services: string;
    body_philosophy: string;
    image_url: string;
    is_active: boolean;
  };
};

// Jednoduché načítanie z novej tabuľky `about_us`.
// Rovnako ako v pôvodnom súbore vraciame riadok priamo z databázy.
export async function getAboutUs(slug: string) {
  const supabase = await getSupabaseServerClient();

  const { data, error } = await supabase
    .from("about_us")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Error fetching about us data:", error);
    return null;
  }

  return data;
}
