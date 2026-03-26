import Botulotoxin from "@/app/_components/products/botulotoxin/Botulotoxin"
import { getBotulotoxin } from "@/app/_lib/data_services/data_botulotoxin"

export default async function Page() {
  const botulotoxinData = await getBotulotoxin("botulotoxin")
  console.log("Botulotoxin data:", botulotoxinData)

  return <Botulotoxin botulotoxinData={botulotoxinData} />
}
