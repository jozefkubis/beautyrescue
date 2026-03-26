import Oxygeneo from "@/app/_components/products/oxygeneo/Oxygeneo"
import { getCurrentUser } from "@/app/_lib/actions/auth_actions"
import getOxygeneo from "@/app/_lib/data_services/data_oxygeneo"

export default async function Page() {
  const oxygeneoData = await getOxygeneo("oxygeneo")
  const user = await getCurrentUser()
  const isAdmin = user?.email === process.env.ADMIN_EMAIL

  return (
    <Oxygeneo
      oxygeneoData={oxygeneoData}
      user={user?.email ?? null}
      isAdmin={isAdmin}
    />
  )
}
