import Botulotoxin_potenie from "@/app/_components/products/botulotoxin/potenie/botulotoxin_potenie"
import { getBotulotoxinPotenie } from "@/app/_lib/data_services/data_botulotoxin"

export default async function Page() {
  const botulotoxinPotenieData = await getBotulotoxinPotenie(
    "botulotoxin-potenie",
  )

  return <Botulotoxin_potenie botulotoxinPotenieData={botulotoxinPotenieData} />
}
