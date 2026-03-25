import Chemical_peeling from "@/app/_components/products/chemical-peeling/Chemical_peeling"
import getChemicalPeeling from "@/app/_lib/data_services/data_chemical_peeling"

export default async function Page() {
  const chemicalPeelingData = await getChemicalPeeling("chemical-peeling")

  return <Chemical_peeling chemicalPeelingData={chemicalPeelingData} />
}
