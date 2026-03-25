import Jalupro_hmw from "@/app/_components/products/jalupro/hmw/Jalupro_hmw"
import { getJaluproHMW } from "@/app/_lib/data_services/data_jalupro"

export default async function Page() {
  const jaluproHMWData = await getJaluproHMW("jalupro-hmw")

  return <Jalupro_hmw jaluproHMWData={jaluproHMWData} />
}
