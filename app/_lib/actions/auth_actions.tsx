"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
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
  redirect("/admin")
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
  const supabase = await getSupabaseServerClient()

  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession()

  if (sessionError) {
    // Missing session is expected for public users.
    if (sessionError.message.toLowerCase().includes("auth session missing")) {
      return null
    }

    console.error("getCurrentUser session error:", sessionError)
    return null
  }

  if (!session) {
    return null
  }

  const { data, error } = await supabase.auth.getUser()

  if (error) {
    if (error.message.toLowerCase().includes("auth session missing")) {
      return null
    }

    console.error("getCurrentUser error:", error)
    return null
  }

  return data.user
}
