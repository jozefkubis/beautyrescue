import type { BiokompatibilneNiteMainProps } from "@/app/_lib/data_services/data_biokompatibilne_nite"
import PricingForm from "../PricingForm"

// const treatments = [
//   {
//     id: 1,
//     treatment: "Niťový lifting čelo",
//     price: "250,- €",
//     sale: "",
//   },
//   {
//     id: 2,
//     treatment: "Niťový lifting medziobočie",
//     price: "150,- €",
//     sale: "",
//   },
//   {
//     id: 3,
//     treatment: "Niťový lifting tváre (líca, sánka, brada)",
//     price: "600,- €",
//     sale: "",
//   },
//   {
//     id: 4,
//     treatment: "Niťový lifting brada",
//     price: "250,- €",
//     sale: "",
//   },
//   {
//     id: 5,
//     treatment: "Niťový lifting sánka",
//     price: "250,- €",
//     sale: "",
//   },
//   {
//     id: 6,
//     treatment: "Foxy eyes",
//     price: "250,- €",
//     sale: "",
//   },
//   {
//     id: 7,
//     treatment: "Vstupná konzultácia",
//     price: "15,- €",
//     sale: "",
//   },
// ]

export default function Biokompatibilne_nite_pricing_form({
  biokompatibilneNiteData,
  user,
  isAdmin,
}: BiokompatibilneNiteMainProps & { user?: string | null; isAdmin?: boolean }) {
  const treatments = biokompatibilneNiteData.pricing.map((item) => ({
    id: item.id,
    treatment: item.treatment,
    price: `${item.price_before_discount},- €`,
    sale:
      item.price_after_discount < item.price_before_discount
        ? `${item.price_after_discount},- €`
        : "",
  }))

  return (
    <PricingForm
      title="Biokompatibilné nite"
      treatments={treatments}
      user={user}
      isAdmin={isAdmin}
    />
  )
}
