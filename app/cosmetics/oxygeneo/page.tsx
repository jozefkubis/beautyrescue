import Oxygeneo from "@/app/_components/products/oxygeneo/Oxygeneo"
import getOxygeneo from "@/app/_lib/data_services/data_oxygeneo"

export default async function Page() {
  const oxygeneoData = await getOxygeneo("oxygeneo")

  return <Oxygeneo oxygeneoData={oxygeneoData} />
}
