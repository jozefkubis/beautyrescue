import PricingForm from "../../PricingForm"

const treatments = [
  {
    id: 1,
    treatment: "0,55 ml HYA",
    price: "150,-",
    sale: "",
  },
  {
    id: 2,
    treatment: "1 ml HYA",
    price: "270,-",
    sale: "",
  },
  {
    id: 3,
    treatment: "Kanyla",
    price: "13,-",
    sale: "",
  },
  {
    id: 4,
    treatment: "Vstupná konzultácia",
    price: "15,-",
    sale: "",
  },
]

export default function Kyselina_hyaluronova_pricing_form_lips() {
  return (
    <PricingForm title="Kyselina hyaluronová - Pery" treatments={treatments} />
  )
}
