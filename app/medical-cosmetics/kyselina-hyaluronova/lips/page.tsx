import Kyselina_hyaluronova_lips from "@/app/_components/products/kyselina-hyaluronova/lips/Kyselina_hyaluronova_lips"
import { getCurrentUser } from "@/app/_lib/actions/auth_actions"
import { getKyselinaHyaluronovaLips } from "@/app/_lib/data_services/data_kyselina_hyaluronova"

export default async function Page() {
  const kyselinaHyaluronovaLipsData = await getKyselinaHyaluronovaLips(
    "kyselina-hyaluronova-lips",
  )
  const user = await getCurrentUser()
  const isAdmin = user?.email === process.env.ADMIN_EMAIL

  return (
    <Kyselina_hyaluronova_lips
      kyselinaHyaluronovaLipsData={kyselinaHyaluronovaLipsData}
      user={user?.email ?? null}
      isAdmin={isAdmin}
    />
  )
}
