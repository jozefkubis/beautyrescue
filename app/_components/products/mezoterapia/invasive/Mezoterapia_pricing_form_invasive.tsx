import PricingForm from "../../PricingForm"

const treatments = [
  {
    id: 1,
    treatment: "Vitalinjector – tvár",
    price: "180,- €",
    sale: "160,- €",
  },
  {
    id: 2,
    treatment: "Vitalinjector – tvár + krk",
    price: "250,- €",
    sale: "210,- €",
  },
  {
    id: 3,
    treatment: "Vitalinjector – tvár+krk+dekolt",
    price: "300,- €",
    sale: "260,- €",
  },
  {
    id: 4,
    treatment: "Vitalinjector – celulitída",
    price: "250,- €",
    sale: "",
  },
  {
    id: 5,
    treatment: "Vitalinjector – mesohair",
    price: "150,- €",
    sale: "",
  },
  {
    id: 6,
    treatment: "Chemická lypolýza podbradku (2 ošetrenia)",
    price: "150,- €",
    sale: "",
  },
  {
    id: 7,
    treatment: 'Mezosérum "namieru"',
    price: "35,- €",
    sale: "",
  },
  {
    id: 8,
    treatment: "Vstupná konzultácia",
    price: "15,- €",
    sale: "",
  },
  {
    id: 9,
    treatment: "Vitalinjector - ruky",
    price: "50,- €",
    sale: "",
  },
]

export default function Mezoterapia_pricing_form() {
  return (
    <PricingForm
      title="Invazívna mezoterapia – Vitalinjector"
      treatments={treatments}
    />
  )
}
