import { cache } from "react";
import { getSupabasePublicServerClient } from "../supabase/publicServer";

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
export const getAboutUs = cache(async (slug: string) => {
  const supabase = getSupabasePublicServerClient();

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
});
