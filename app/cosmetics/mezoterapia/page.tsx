import Mezoterapia from "@/app/_components/products/mezoterapia/Mezoterapia"
import { getMezoterapia } from "@/app/_lib/data_services/data_mezoterapia"

export default async function Page() {
  const mezoterapiaData = await getMezoterapia("mezoterapia")

  return <Mezoterapia mezoterapiaData={mezoterapiaData} />
}
