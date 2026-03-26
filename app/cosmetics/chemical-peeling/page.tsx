import Chemical_peeling from "@/app/_components/products/chemical-peeling/Chemical_peeling"
import { getCurrentUser } from "@/app/_lib/actions/auth_actions"
import getChemicalPeeling from "@/app/_lib/data_services/data_chemical_peeling"

export default async function Page() {
  const chemicalPeelingData = await getChemicalPeeling("chemical-peeling")

  const user = await getCurrentUser()
  const isAdmin = user?.email === process.env.ADMIN_EMAIL

  return (
    <Chemical_peeling
      chemicalPeelingData={chemicalPeelingData}
      user={user?.email ?? null}
      isAdmin={isAdmin}
    />
  )
}
