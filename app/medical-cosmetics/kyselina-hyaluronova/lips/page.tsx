import Kyselina_hyaluronova_lips from "@/app/_components/products/kyselina-hyaluronova/lips/Kyselina_hyaluronova_lips"
import { getKyselinaHyaluronovaLips } from "@/app/_lib/data_services/data_kyselina_hyaluronova"

export default async function Page() {
  const kyselinaHyaluronovaLipsData = await getKyselinaHyaluronovaLips(
    "kyselina-hyaluronova-lips",
  )

  return (
    <Kyselina_hyaluronova_lips
      kyselinaHyaluronovaLipsData={kyselinaHyaluronovaLipsData}
    />
  )
}
