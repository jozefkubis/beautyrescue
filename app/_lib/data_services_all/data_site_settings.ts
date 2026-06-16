import { getSupabasePublicServerClient } from "../supabase/publicServer";

export type SiteSettingsProps = {
  is_public: boolean;
};

export async function getSiteSettings(): Promise<SiteSettingsProps | null> {
  const supabase = getSupabasePublicServerClient();
  const { data, error } = await supabase
    .from("site_access")
    .select("is_public")
    .single();

  if (error) {
    console.error("Error fetching site settings:", error);
    return null;
  }
  return data as SiteSettingsProps;
}
