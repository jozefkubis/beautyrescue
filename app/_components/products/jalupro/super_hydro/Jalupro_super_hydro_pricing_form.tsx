import PricingForm from "../../PricingForm"

const treatments = [
  {
    id: 1,
    treatment: "Jalupro Superhydro",
    price: "250,-",
    sale: "220,-",
  },
]

export default function Jalupro_super_hydro_pricing_form() {
  return <PricingForm title="Jalupro" treatments={treatments} />
}
