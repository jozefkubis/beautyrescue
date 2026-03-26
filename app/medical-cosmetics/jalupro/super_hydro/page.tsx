import Jalupro_super_hydro from "@/app/_components/products/jalupro/super_hydro/Jalupro_super_hydro"
import { getCurrentUser } from "@/app/_lib/actions/auth_actions"
import { getJaluproSuperHydro } from "@/app/_lib/data_services/data_jalupro"

export default async function Page() {
  const jaluproSuperHydroData = await getJaluproSuperHydro(
    "jalupro-super-hydro",
  )
  const user = await getCurrentUser()
  const isAdmin = user?.email === process.env.ADMIN_EMAIL

  return (
    <Jalupro_super_hydro
      jaluproSuperHydroData={jaluproSuperHydroData}
      user={user?.email ?? null}
      isAdmin={isAdmin}
    />
  )
}
