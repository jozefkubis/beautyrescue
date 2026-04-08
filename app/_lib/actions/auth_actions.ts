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

  const { data, error } = await supabase.auth.getUser()

  if (error) {
    const isMissingSession =
      error.name === "AuthSessionMissingError" ||
      error.message?.toLowerCase().includes("auth session missing")

    if (!isMissingSession) {
      console.error("getCurrentUser error:", error)
    }

    return null
  }

  return data.user ?? null
}
