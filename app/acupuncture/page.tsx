import Acupuncture from "@/app/_components/products/acupuncture/Acupuncture"
import { getCurrentUser } from "@/app/_lib/actions/auth_actions"
import getAcupuncture from "../_lib/data_services/data_acupuncture"

export default async function Page() {
  const acupunctureData = await getAcupuncture("acupuncture")
  const user = await getCurrentUser()
  const isAdmin = user?.email === process.env.ADMIN_EMAIL

  return (
    <Acupuncture
      acupunctureData={acupunctureData}
      user={user?.email ?? null}
      isAdmin={isAdmin}
    />
  )
}
