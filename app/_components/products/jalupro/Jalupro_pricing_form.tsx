import PricingForm from "../PricingForm"

const treatments = [
  {
    id: 1,
    treatment: "Jalupro Classic",
    price: "180,- €",
    sale: "",
  },
  {
    id: 2,
    treatment: "Jalupro HMW",
    price: "200,- €",
    sale: "",
  },
  {
    id: 3,
    treatment: "Jalupro Super Hydro",
    price: "250,- €",
    sale: "240,- €",
  },
  {
    id: 4,
    treatment: "Jalupro Young Eye",
    price: "200,- €",
    sale: "",
  },
  {
    id: 5,
    treatment: "Vstupna konzultacia",
    price: "15,- €",
    sale: "",
  },
]

export default function Jalupro_pricing_form() {
  return <PricingForm title="Jalupro" treatments={treatments} />
}
