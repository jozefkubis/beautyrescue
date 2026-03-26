import Mezoterapia_non_invasive from "@/app/_components/products/mezoterapia/non-invasive/mezoterapia_non_invasive"
import { getCurrentUser } from "@/app/_lib/actions/auth_actions"
import { getMezoterapiaNonInvasive } from "@/app/_lib/data_services/data_mezoterapia"

export default async function Page() {
  const mezoterapiaNonInvasiveData = await getMezoterapiaNonInvasive(
    "mezoterapia-non-invasive",
  )
  const user = await getCurrentUser()
  const isAdmin = user?.email === process.env.ADMIN_EMAIL

  return (
    <Mezoterapia_non_invasive
      mezoterapiaNonInvasiveData={mezoterapiaNonInvasiveData}
      user={user?.email ?? null}
      isAdmin={isAdmin}
    />
  )
}
