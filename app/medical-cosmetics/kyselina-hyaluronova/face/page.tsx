import Kyselina_hyaluronova_face from "@/app/_components/products/kyselina-hyaluronova/face/Kyselina_hyaluronova_face"
import { getCurrentUser } from "@/app/_lib/actions/auth_actions"
import { getKyselinaHyaluronovaFace } from "@/app/_lib/data_services/data_kyselina_hyaluronova"

export default async function Page() {
  const kyselinaHyaluronovaFaceData = await getKyselinaHyaluronovaFace(
    "kyselina-hyaluronova-face",
  )
  const user = await getCurrentUser()
  const isAdmin = user?.email === process.env.ADMIN_EMAIL

  return (
    <Kyselina_hyaluronova_face
      kyselinaHyaluronovaFaceData={kyselinaHyaluronovaFaceData}
      user={user?.email ?? null}
      isAdmin={isAdmin}
    />
  )
}
