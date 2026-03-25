import Jalupro from "@/app/_components/products/jalupro/Jalupro"
import { getJalupro } from "@/app/_lib/data_services/data_jalupro"

export default async function Page() {
  const jaluproData = await getJalupro("jalupro")

  return <Jalupro jaluproData={jaluproData} />
}
