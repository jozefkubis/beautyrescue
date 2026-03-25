import Mezoterapia_invasive from "@/app/_components/products/mezoterapia/invasive/Mezoterapia_invasive"
import { getMezoterapiaInvasive } from "@/app/_lib/data_services/data_mezoterapia"

export default async function Page() {
  const mezoterapiaInvasiveData = await getMezoterapiaInvasive(
    "mezoterapia-invasive",
  )

  return (
    <Mezoterapia_invasive mezoterapiaInvasiveData={mezoterapiaInvasiveData} />
  )
}
