import PricingForm from "../PricingForm"

const treatments = [
  {
    id: 1,
    treatment: "Oxygeneo - tvár + RF",
    price: "70,- €",
    sale: "60,- €",
  },
  {
    id: 2,
    treatment: "Oxygeneo - tvár + krk + RF",
    price: "80,- €",
    sale: "70,- €",
  },
  {
    id: 3,
    treatment: "Oxygeneo - tvár + krk + dekolt + RF",
    price: "90,- €",
    sale: "80,- €",
  },
  {
    id: 4,
    treatment: "Rádiofrekvencia - tvár",
    price: "25,- €",
    sale: "0 %",
  },
  {
    id: 5,
    treatment: "Vstupná konzultácia",
    price: "15,- €",
    sale: "0 %",
  },
]

export default function Oxygeneo_pricing_form() {
  return (
    <PricingForm title="Oxygeneo - okyslicenie pleti" treatments={treatments} />
  )
}
