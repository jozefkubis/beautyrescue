import Kyselina_hyaluronova from "@/app/_components/products/kyselina-hyaluronova/Kyselina_hyaluronova"
import { getCurrentUser } from "@/app/_lib/actions/auth_actions"
import { getKyselinaHyaluronova } from "@/app/_lib/data_services/data_kyselina_hyaluronova"

export default async function Page() {
  const kyselinaHyaluronovaData = await getKyselinaHyaluronova(
    "kyselina-hyaluronova",
  )
  const user = await getCurrentUser()
  const isAdmin = user?.email === process.env.ADMIN_EMAIL

  return (
    <Kyselina_hyaluronova
      kyselinaHyaluronovaData={kyselinaHyaluronovaData}
      user={user?.email ?? null}
      isAdmin={isAdmin}
    />
  )
}
