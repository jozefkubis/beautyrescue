import Kyselina_hyaluronova_face from "@/app/_components/products/kyselina-hyaluronova/face/Kyselina_hyaluronova_face"
import { getKyselinaHyaluronovaFace } from "@/app/_lib/data_services/data_kyselina_hyaluronova"

export default async function Page() {
  const kyselinaHyaluronovaFaceData = await getKyselinaHyaluronovaFace(
    "kyselina-hyaluronova-face",
  )

  return (
    <Kyselina_hyaluronova_face
      kyselinaHyaluronovaFaceData={kyselinaHyaluronovaFaceData}
    />
  )
}
