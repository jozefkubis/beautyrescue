import Microneedling from "@/app/_components/products/microneedling/Microneedling"
import getMicroneedling from "@/app/_lib/data_services/data_microneedling"

export default async function Page() {
  const microneedlingData = await getMicroneedling("microneedling")

  return <Microneedling microneedlingData={microneedlingData} />
}
