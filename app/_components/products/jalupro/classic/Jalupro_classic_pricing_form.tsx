import PricingForm from "../../PricingForm"

const treatments = [
  {
    id: 1,
    treatment: "Jalupro Classic",
    price: "240,-",
    sale: "220,-",
  },
]

export default function Jalupro_pricing_form() {
  return <PricingForm title="Jalupro" treatments={treatments} />
}
