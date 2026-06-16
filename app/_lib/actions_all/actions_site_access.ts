"use server";

import { revalidatePath } from "next/cache";
import { getSupabaseServerClient } from "../supabase/server";

type ToggleSiteAccessResult =
  | {
      success: true;
      is_public: boolean;
      message: string;
    }
  | {
      success: false;
      message: string;
    };

export async function toggleSiteAccess(): Promise<ToggleSiteAccessResult> {
  const supabase = await getSupabaseServerClient();

  const { data: currentSettings, error: fetchError } = await supabase
    .from("site_access")
    .select("is_public")
    .eq("id", 1)
    .single();

  if (fetchError || !currentSettings) {
    console.error("Error fetching site access:", fetchError);
    return { success: false, message: "Nepodarilo sa načítať nastavenie webu." };
  }

  const nextIsPublic = !currentSettings.is_public;

  const { error } = await supabase
    .from("site_access")
    .update({ is_public: nextIsPublic })
    .eq("id", 1);

  if (error) {
    console.error("Error updating site access:", error);
    return { success: false, message: "Nastavenie sa nepodarilo uložiť." };
  }

  revalidatePath("/", "layout");

  return {
    success: true,
    is_public: nextIsPublic,
    message: nextIsPublic ? "Web je sprístupnený." : "Web je zamknutý.",
  };
}
