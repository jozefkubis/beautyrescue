import type { BotulotoxinMainProps } from "@/app/_lib/data_services/data_botulotoxin"
import PricingForm from "../PricingForm"

// const treatments = [
//   {
//     id: 1,
//     treatment: "Botulotoxín 1 lokalita",
//     price: "90,- €",
//     sale: "80,- €",
//   },
//   {
//     id: 2,
//     treatment: "Botulotoxín 2 lokality",
//     price: "160,- €",
//     sale: "150,- €",
//   },
//   {
//     id: 3,
//     treatment: "Botulotoxín 3 lokality",
//     price: "240,- €",
//     sale: "",
//   },
//   {
//     id: 4,
//     treatment: "Botulotoxín - bunny lines",
//     price: "50,- €",
//     sale: "",
//   },
//   {
//     id: 5,
//     treatment: "Botulotoxín - gummy smile",
//     price: "50,- €",
//     sale: "",
//   },
//   {
//     id: 6,
//     treatment: "Botulotoxín - brada",
//     price: "50,- €",
//     sale: "",
//   },
//   {
//     id: 7,
//     treatment: "Botulotoxín - m.masseter",
//     price: "80,- €",
//     sale: "",
//   },
//   {
//     id: 8,
//     treatment: "Botulotoxín - podpazušie",
//     price: "350,- €",
//     sale: "",
//   },
//   {
//     id: 9,
//     treatment: "Botulotoxín - dlane/šlapaje",
//     price: "350,- €",
//     sale: "",
//   },
//   {
//     id: 10,
//     treatment: "Botulotoxín - lifting obočia",
//     price: "110,- €",
//     sale: "100,- €",
//   },
//   {
//     id: 11,
//     treatment: "Botulotoxín - Nefertiti lift",
//     price: "330,- €",
//     sale: "",
//   },
//   {
//     id: 12,
//     treatment: "Botulotoxín - zdvihnutie špičky nosa",
//     price: "50,- €",
//     sale: "",
//   },
//   {
//     id: 13,
//     treatment: "Botulotoxín - fajčiarske vrásky",
//     price: "50,- €",
//     sale: "",
//   },
//   {
//     id: 14,
//     treatment: "Botulotoxín - dvihnutie úst. kútikov",
//     price: "50,- €",
//     sale: "",
//   },
//   {
//     id: 15,
//     treatment: "Vstupná konzultácia",
//     price: "15,- €",
//     sale: "",
//   },
// ]

export default function Botulotoxin_pricing_form({
  botulotoxinData,
}: BotulotoxinMainProps) {
  const treatments = botulotoxinData.pricing.map((item) => ({
    id: item.id,
    treatment: item.treatment,
    price: `${item.price_before_discount},- €`,
    sale:
      item.price_after_discount < item.price_before_discount
        ? `${item.price_after_discount},- €`
        : "",
  }))

  return <PricingForm title="Botulotoxín" treatments={treatments} />
}
