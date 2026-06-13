import { cache } from "react";
import { getSupabasePublicServerClient } from "../supabase/publicServer";

export type usersProps = {
  email: string;
  name: string;
  id: string;
  created_at: string;
  updated_at: string;
}[];

export const getAllUsers = cache(async () => {
  const supabase = getSupabasePublicServerClient();

  const { data, error } = await supabase.from("users").select("*");

  if (error) {
    console.error("Error fetching users data:", error);
    return null;
  }

  return data;
});
