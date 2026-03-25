import Botulotoxin_vrasky from "@/app/_components/products/botulotoxin/vrasky/Botulotoxin_vrasky"
import { getBotulotoxinVrasky } from "@/app/_lib/data_services/data_botulotoxin"

export default async function Page() {
  const botulotoxinVraskyData = await getBotulotoxinVrasky("botulotoxin-vrasky")

  return <Botulotoxin_vrasky botulotoxinVraskyData={botulotoxinVraskyData} />
}
