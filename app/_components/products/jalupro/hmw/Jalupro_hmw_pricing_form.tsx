import PricingForm from "../../PricingForm"

const treatments = [
  {
    id: 1,
    treatment: "Jalupro HMW",
    price: "240,-",
    sale: "220,-",
  },
]

export default function Jalupro_hmw_pricing_form() {
  return <PricingForm title="Jalupro" treatments={treatments} />
}
