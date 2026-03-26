import Jalupro_classic from "@/app/_components/products/jalupro/classic/Jalupro_classic"
import { getCurrentUser } from "@/app/_lib/actions/auth_actions"
import { getJaluproClassic } from "@/app/_lib/data_services/data_jalupro"

export default async function Page() {
  const jaluproClassicData = await getJaluproClassic("jalupro-classic")
  const user = await getCurrentUser()
  const isAdmin = user?.email === process.env.ADMIN_EMAIL

  return (
    <Jalupro_classic
      jaluproClassicData={jaluproClassicData}
      user={user?.email ?? null}
      isAdmin={isAdmin}
    />
  )
}
