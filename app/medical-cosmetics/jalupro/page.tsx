import Jalupro from "@/app/_components/products/jalupro/Jalupro"
import { getCurrentUser } from "@/app/_lib/actions/auth_actions"
import { getJalupro } from "@/app/_lib/data_services/data_jalupro"

export default async function Page() {
  const jaluproData = await getJalupro("jalupro")
  const user = await getCurrentUser()
  const isAdmin = user?.email === process.env.ADMIN_EMAIL

  return (
    <Jalupro
      jaluproData={jaluproData}
      user={user?.email ?? null}
      isAdmin={isAdmin}
    />
  )
}
