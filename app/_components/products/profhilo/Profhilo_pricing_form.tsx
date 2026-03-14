import PricingForm from "../PricingForm"

const treatments = [
  {
    id: 1,
    treatment: "Profhilo",
    price: "270,- €",
    sale: "250,- €",
  },
  {
    id: 2,
    treatment: "Profhilo Structura",
    price: "320,- €",
    sale: "",
  },
  {
    id: 3,
    treatment: "Vstupná konzultácia",
    price: "15,- €",
    sale: "",
  },
]

export default function Profhilo_pricing_form() {
  return <PricingForm title="Profhilo" treatments={treatments} />
}
