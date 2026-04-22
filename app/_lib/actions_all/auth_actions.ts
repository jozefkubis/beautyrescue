"use server"

import { unstable_noStore as noStore, revalidatePath } from "next/cache"
import { getSupabaseServerClient } from "../supabase/server"

type SignInParams = {
  email: string
  password: string
}

export async function logIn({ email, password }: SignInParams) {
  const supabase = await getSupabaseServerClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    console.error("logIn error:", error)
    return { success: false, message: error.message }
  }

  revalidatePath("/", "layout")
  return { success: true, message: "Prihlásenie bolo úspešné." }
}

export async function logOut() {
  const supabase = await getSupabaseServerClient()

  const { error } = await supabase.auth.signOut()

  if (error) {
    console.error("logOut error:", error)
    return { success: false, message: error.message }
  }

  revalidatePath("/", "layout")
  return { success: true, message: "Odhlásenie bolo úspešné." }
}

export async function getCurrentUser() {
  // Vypneme cache pre auth check, aby sa po login/logout v produkcii
  // hned zobrazil aktualny stav v navigacii.
  noStore()

  const supabase = await getSupabaseServerClient()

  const isRecoverableAuthError = (error: unknown) => {
    const authError = error as {
      name?: string
      message?: string
      code?: string
      status?: number
    }

    const errorMessage = authError?.message?.toLowerCase() ?? ""

    return (
      authError?.name === "AuthSessionMissingError" ||
      errorMessage.includes("auth session missing") ||
      authError?.code === "refresh_token_not_found" ||
      errorMessage.includes("invalid refresh token") ||
      errorMessage.includes("refresh token not found")
    )
  }

  try {
    const { data, error } = await supabase.auth.getUser()

    if (error) {
      if (!isRecoverableAuthError(error)) {
        console.error("getCurrentUser error:", error)
      }

      return null
    }

    return data.user ?? null
  } catch (error) {
    // Pri neplatnom refresh tokene nechceme spadnut, ale vratit stav odhlaseny.
    if (!isRecoverableAuthError(error)) {
      console.error("getCurrentUser unexpected error:", error)
    }

    return null
  }
}
