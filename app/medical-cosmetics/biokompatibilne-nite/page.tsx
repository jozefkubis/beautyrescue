import Biokompatibilne_nite from "@/app/_components/products/biokompatibilne-nite/Biokompatibilne_nite"
import getBiokompatibilneNite from "@/app/_lib/data_services/data_biokompatibilne_nite"

export default async function Page() {
  const biokompatibilneNiteData = await getBiokompatibilneNite(
    "biokompatibilne-nite",
  )

  return (
    <Biokompatibilne_nite biokompatibilneNiteData={biokompatibilneNiteData} />
  )
}
