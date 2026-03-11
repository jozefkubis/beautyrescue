import PricingForm from "../PricingForm"

const treatments = [
  {
    id: 1,
    treatment: "Chemický peeling - tvár",
    price: "40,- €",
    sale: "0 %",
  },
  {
    id: 2,
    treatment: "Chemický peeling - tvár a krk",
    price: "50,- €",
    sale: "0 %",
  },
  {
    id: 3,
    treatment: "Chemický peeling - tvár, krk a dekolt",
    price: "60,- €",
    sale: "0 %",
  },
  {
    id: 4,
    treatment: "Chemický peeling 35% TCA – tvár",
    price: "60,- €",
    sale: "0 %",
  },
  {
    id: 5,
    treatment: "Chemický peeling 35% TCA – 1 bod do 1 cm",
    price: "5,- €",
    sale: "0 %",
  },
  {
    id: 6,
    treatment: "Vstupná konzultácia",
    price: "15,- €",
    sale: "0 %",
  },
]

export default function Mezoterapia_pricing_form() {
  return <PricingForm title="Mezoterapia" treatments={treatments} />
}
