import Mezoterapia_invasive from "@/app/_components/products/mezoterapia/invasive/Mezoterapia_invasive"
import { getCurrentUser } from "@/app/_lib/actions/auth_actions"
import { getMezoterapiaInvasive } from "@/app/_lib/data_services/data_mezoterapia"

export default async function Page() {
  const mezoterapiaInvasiveData = await getMezoterapiaInvasive(
    "mezoterapia-invasive",
  )
  const user = await getCurrentUser()
  const isAdmin = user?.email === process.env.ADMIN_EMAIL

  return (
    <Mezoterapia_invasive
      mezoterapiaInvasiveData={mezoterapiaInvasiveData}
      user={user?.email ?? null}
      isAdmin={isAdmin}
    />
  )
}
