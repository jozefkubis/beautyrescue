import PricingForm from "../PricingForm"

const treatments = [
  {
    id: 1,
    treatment: "Niťový lifting čelo",
    price: "250,- €",
    sale: "",
  },
  {
    id: 2,
    treatment: "Niťový lifting medziobočie",
    price: "150,- €",
    sale: "",
  },
  {
    id: 3,
    treatment: "Niťový lifting tváre (líca, sánka, brada)",
    price: "600,- €",
    sale: "",
  },
  {
    id: 4,
    treatment: "Niťový lifting brada",
    price: "250,- €",
    sale: "",
  },
  {
    id: 5,
    treatment: "Niťový lifting sánka",
    price: "250,- €",
    sale: "",
  },
  {
    id: 6,
    treatment: "Foxy eyes",
    price: "250,- €",
    sale: "",
  },
  {
    id: 7,
    treatment: "Vstupná konzultácia",
    price: "15,- €",
    sale: "",
  },
]

export default function Biokompatibilne_nite_pricing_form() {
  return <PricingForm title="Biokompatibilné nite" treatments={treatments} />
}
