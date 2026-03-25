import Jalupro_classic from "@/app/_components/products/jalupro/classic/Jalupro_classic"
import { getJaluproClassic } from "@/app/_lib/data_services/data_jalupro"

export default async function Page() {
  const jaluproClassicData = await getJaluproClassic("jalupro-classic")

  return <Jalupro_classic jaluproClassicData={jaluproClassicData} />
}
