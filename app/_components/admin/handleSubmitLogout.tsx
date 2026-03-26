import { logOut } from "@/app/_lib/actions/auth_actions"
import toast from "react-hot-toast"

export default async function handleSubmitLogout() {
  try {
    if (!confirm("Naozaj sa chcete odhlásiť?")) {
      return
    }

    const result = await logOut()

    if (result?.success) {
      toast.success("Odhlásenie bolo úspešné!")
      window.location.href = "/"
    } else {
      toast.error(result?.message || "Odhlásenie nebolo úspešné!")
    }
  } catch {
    toast.error("Nastala chyba pri odhlasovaní.")
  }
}
