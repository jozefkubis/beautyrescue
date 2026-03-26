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

  const { data, error } = await supabase.auth.getUser()

  if (error) {
    console.error("getCurrentUser error:", error)
    return null
  }

  return data.user
}
