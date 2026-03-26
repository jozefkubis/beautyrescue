import Jalupro_hmw from "@/app/_components/products/jalupro/hmw/Jalupro_hmw"
import { getCurrentUser } from "@/app/_lib/actions/auth_actions"
import { getJaluproHMW } from "@/app/_lib/data_services/data_jalupro"

export default async function Page() {
  const jaluproHMWData = await getJaluproHMW("jalupro-hmw")
  const user = await getCurrentUser()
  const isAdmin = user?.email === process.env.ADMIN_EMAIL

  return (
    <Jalupro_hmw
      jaluproHMWData={jaluproHMWData}
      user={user?.email ?? null}
      isAdmin={isAdmin}
    />
  )
}
