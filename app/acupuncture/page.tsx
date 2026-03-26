import Acupuncture from "@/app/_components/products/acupuncture/Acupuncture"
import getAcupuncture from "../_lib/data_services/data_acupuncture"

export default async function Page() {
  const acupunctureData = await getAcupuncture("acupuncture")

  console.log("Fetched acupuncture data:", acupunctureData)

  return <Acupuncture acupunctureData={acupunctureData} />
}
