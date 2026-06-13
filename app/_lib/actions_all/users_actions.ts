"use server";

import { revalidatePath } from "next/cache";
import { getSupabaseAdminClient } from "../supabase/admin";
import { getSupabaseServerClient } from "../supabase/server";

export async function deleteUserById(userId: string) {
  const supabase = await getSupabaseServerClient();
  const adminSupabase = getSupabaseAdminClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (
    !user ||
    (user.email !== process.env.ADMIN_EMAIL_1 &&
      user.email !== process.env.ADMIN_EMAIL_2)
  ) {
    return { success: false, message: "Nemáš oprávnenie mazať používateľov." };
  }

  // Toto je ID z public.users tabuľky, napr. 1, 2, 3
  const normalizedUserId =
    typeof userId === "string" ? userId.trim() : String(userId ?? "").trim();

  if (!normalizedUserId) {
    return { success: false, message: "Chýba ID používateľa." };
  }

  // Najprv si vytiahneme auth_user_id podľa public.users.id
  const { data: dbUser, error: dbUserError } = await adminSupabase
    .from("users")
    .select("id, auth_user_id")
    .eq("id", normalizedUserId)
    .single();

  if (dbUserError || !dbUser?.auth_user_id) {
    console.error("dbUserError:", dbUserError);
    return {
      success: false,
      message: "Nenašiel som Auth UUID používateľa.",
    };
  }

  // Tu už posielame UUID, nie int8 id
  const { error: authDeleteError } =
    await adminSupabase.auth.admin.deleteUser(dbUser.auth_user_id);

  if (authDeleteError) {
    console.error("deleteUserById auth delete error:", authDeleteError);
    return { success: false, message: "Auth účet sa nepodarilo odstrániť." };
  }

  const { error } = await adminSupabase
    .from("users")
    .delete()
    .eq("id", normalizedUserId);

  if (error) {
    console.error("deleteUserById error:", error);
    return {
      success: false,
      message:
        "Auth účet bol odstránený, ale záznam v users sa nepodarilo dočistiť.",
    };
  }

  revalidatePath("/admin/pouzivatelia");

  return { success: true, message: "Používateľ bol odstránený." };
}