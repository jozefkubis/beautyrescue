import Kyselina_hyaluronova from "@/app/_components/products/kyselina-hyaluronova/Kyselina_hyaluronova"
import { getKyselinaHyaluronova } from "@/app/_lib/data_services/data_kyselina_hyaluronova"

export default async function Page() {
  const kyselinaHyaluronovaData = await getKyselinaHyaluronova(
    "kyselina-hyaluronova",
  )

  return (
    <Kyselina_hyaluronova kyselinaHyaluronovaData={kyselinaHyaluronovaData} />
  )
}
