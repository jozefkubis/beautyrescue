import PricingForm from "../PricingForm"

const treatments = [
  {
    id: 1,
    treatment: "Diamantová mikrodermabrázia – tvár",
    price: "40,- €",
    sale: "0 %",
  },
  {
    id: 2,
    treatment: "Diamantová mikrodermabrázia – tvár+krk",
    price: "50,- €",
    sale: "0 %",
  },
  {
    id: 3,
    treatment: "Diamantová mikrodermabrázia – tvár+krk+dekolt",
    price: "60,- €",
    sale: "0 %",
  },
  {
    id: 4,
    treatment: "Výživná maska",
    price: "7,- €",
    sale: "0 %",
  },
  {
    id: 5,
    treatment: "Vstupná konzultácia",
    price: "15,- €",
    sale: "0 %",
  },
]

export default function Dimond_micro_pricing_form() {
  return (
    <PricingForm title="Diamantová mikrodermabrázia" treatments={treatments} />
  )
}
