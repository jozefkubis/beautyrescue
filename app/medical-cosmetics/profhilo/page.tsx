import Profhilo from "@/app/_components/products/profhilo/Profhilo"
import { getCurrentUser } from "@/app/_lib/actions/auth_actions"
import { getProfhilo } from "@/app/_lib/data_services/data_profhilo"

export default async function Page() {
  const profhiloData = await getProfhilo("profhilo")
  const user = await getCurrentUser()
  const isAdmin = user?.email === process.env.ADMIN_EMAIL

  return (
    <Profhilo
      profhiloData={profhiloData}
      user={user?.email ?? null}
      isAdmin={isAdmin}
    />
  )
}
