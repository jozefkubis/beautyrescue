import Jalupro_super_hydro from "@/app/_components/products/jalupro/super_hydro/Jalupro_super_hydro"
import { getJaluproSuperHydro } from "@/app/_lib/data_services/data_jalupro"

export default async function Page() {
  const jaluproSuperHydroData = await getJaluproSuperHydro(
    "jalupro-super-hydro",
  )

  return <Jalupro_super_hydro jaluproSuperHydroData={jaluproSuperHydroData} />
}
