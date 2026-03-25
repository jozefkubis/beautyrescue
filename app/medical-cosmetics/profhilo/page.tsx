import Profhilo from "@/app/_components/products/profhilo/Profhilo"
import { getProfhilo } from "@/app/_lib/data_services/data_profhilo"

export default async function Page() {
  const profhiloData = await getProfhilo("profhilo")

  return <Profhilo profhiloData={profhiloData} />
}
