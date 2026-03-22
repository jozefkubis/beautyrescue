import PricingForm from "../../PricingForm"

const treatments = [
  {
    id: 1,
    treatment: "Jalupro Young eye",
    price: "220,-",
    sale: "200,-",
  },
]

export default function Jalupro_young_eye_pricing_form() {
  return <PricingForm title="Jalupro" treatments={treatments} />
}
