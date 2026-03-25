import Mezoterapia_non_invasive from "@/app/_components/products/mezoterapia/non-invasive/mezoterapia_non_invasive"
import { getMezoterapiaNonInvasive } from "@/app/_lib/data_services/data_mezoterapia"

export default async function Page() {
  const mezoterapiaNonInvasiveData = await getMezoterapiaNonInvasive(
    "mezoterapia-non-invasive",
  )

  return (
    <Mezoterapia_non_invasive
      mezoterapiaNonInvasiveData={mezoterapiaNonInvasiveData}
    />
  )
}
