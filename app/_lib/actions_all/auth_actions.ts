"use server";

import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { getSupabaseAdminClient } from "../supabase/admin";
import { getSupabaseServerClient } from "../supabase/server";

type SignInParams = {
  email: string;
  password: string;
};

type SignUpParams = {
  name: string;
  email: string;
  password: string;
};

export async function signUp({ name, email, password }: SignUpParams) {
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
    return {
      success: false,
      message: "Nemáš oprávnenie registrovať používateľov.",
    };
  }

  const { error } = await adminSupabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: {
      name,
    },
  });

  if (error) {
    console.error("signUp error:", error);
    return { success: false, message: error.message };
  }

  revalidatePath("/", "layout");
  revalidatePath("/admin/pouzivatelia");
  return { success: true, message: "Registrácia bola úspešná." };
}

export async function logIn({ email, password }: SignInParams) {
  const supabase = await getSupabaseServerClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("logIn error:", error);
    return { success: false, message: error.message };
  }

  revalidatePath("/", "layout");
  return { success: true, message: "Prihlásenie bolo úspešné." };
}

export async function logOut() {
  const supabase = await getSupabaseServerClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("logOut error:", error);
    return { success: false, message: error.message };
  }

  // revalidatePath("/", "layout")
  return { success: true, message: "Odhlásenie bolo úspešné." };
}

export async function getCurrentUser() {
  // Vypneme cache pre auth check, aby sa po login/logout v produkcii
  // hned zobrazil aktualny stav v navigacii.
  noStore();

  const supabase = await getSupabaseServerClient();

  const isRecoverableAuthError = (error: unknown) => {
    const authError = error as {
      name?: string;
      message?: string;
      code?: string;
      status?: number;
    };

    const errorMessage = authError?.message?.toLowerCase() ?? "";

    return (
      authError?.name === "AuthSessionMissingError" ||
      errorMessage.includes("auth session missing") ||
      authError?.code === "refresh_token_not_found" ||
      errorMessage.includes("invalid refresh token") ||
      errorMessage.includes("refresh token not found")
    );
  };

  try {
    const { data, error } = await supabase.auth.getUser();

    if (error) {
      if (!isRecoverableAuthError(error)) {
        console.error("getCurrentUser error:", error);
      }

      return null;
    }

    return data.user ?? null;
  } catch (error) {
    // Pri neplatnom refresh tokene nechceme spadnut, ale vratit stav odhlaseny.
    if (!isRecoverableAuthError(error)) {
      console.error("getCurrentUser unexpected error:", error);
    }

    return null;
  }
}

export async function getCurrentAdminStatus() {
  const user = await getCurrentUser();
  const isAdmin =
    user?.email === process.env.ADMIN_EMAIL_1 ||
    user?.email === process.env.ADMIN_EMAIL_2;

  return {
    isAuthenticated: Boolean(user),
    isAdmin,
  };
}
