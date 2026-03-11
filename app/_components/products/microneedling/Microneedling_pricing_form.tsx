import PricingForm from "../PricingForm"

const treatments = [
  {
    id: 1,
    treatment: "Microneedling – tvár",
    price: "59,- €",
    sale: "39,-",
  },
  {
    id: 2,
    treatment: "Microneedling – tvár+krk",
    price: "69,- €",
    sale: "49,- €",
  },
  {
    id: 3,
    treatment: "Microneedling – tvár+krk+dekolt",
    price: "79,- €",
    sale: "59,- €",
  },
]

export default function Microneedling_pricing_form() {
  return <PricingForm title="Microneedling" treatments={treatments} />
}
