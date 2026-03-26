import Diamond_microdermabrasion from "@/app/_components/products/diamond-microdermabrasion/Diamond_microdermabrasion"
import { getCurrentUser } from "@/app/_lib/actions/auth_actions"
import getDiamondMicrodermabrasion from "@/app/_lib/data_services/data_diamond_microdermabrasion"

export default async function Page() {
  const diamondMicrodermabrasionData = await getDiamondMicrodermabrasion(
    "diamond-microdermabrasion",
  )
  const user = await getCurrentUser()
  const isAdmin = user?.email === process.env.ADMIN_EMAIL

  return (
    <Diamond_microdermabrasion
      diamondMicrodermabrasionData={diamondMicrodermabrasionData}
      user={user?.email ?? null}
      isAdmin={isAdmin}
    />
  )
}
