import PricingForm from "../PricingForm"

const treatments = [
  {
    id: 1,
    treatment: "Diamantová mikrodermabrázia – tvár",
    price: "40,- €",
    sale: "",
  },
  {
    id: 2,
    treatment: "Diamantová mikrodermabrázia – tvár+krk",
    price: "50,- €",
    sale: "",
  },
  {
    id: 3,
    treatment: "Diamantová mikrodermabrázia – tvár+krk+dekolt",
    price: "60,- €",
    sale: "",
  },
  {
    id: 4,
    treatment: "Výživná maska",
    price: "7,- €",
    sale: "",
  },
  {
    id: 5,
    treatment: "Vstupná konzultácia",
    price: "15,- €",
    sale: "",
  },
]

export default function Dimond_micro_pricing_form() {
  return (
    <PricingForm title="Diamantová mikrodermabrázia" treatments={treatments} />
  )
}
