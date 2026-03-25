import Jalupro_young_eye from "@/app/_components/products/jalupro/young_eye/Jalupro_young_eye"
import { getJaluproYoungEye } from "@/app/_lib/data_services/data_jalupro"

export default async function Page() {
  const jaluproYoungEyeData = await getJaluproYoungEye("jalupro-young-eye")

  return <Jalupro_young_eye jaluproYoungEyeData={jaluproYoungEyeData} />
}
