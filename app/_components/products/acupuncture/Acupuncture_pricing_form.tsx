import PricingForm from "../PricingForm"

const treatments = [
  {
    id: 1,
    treatment: "Akupunktúra",
    price: "50,- €",
    sale: "40,- €",
  },
  {
    id: 2,
    treatment: "Elektroakupunktúra",
    price: "50,- €",
    sale: "40,- €",
  },
  {
    id: 3,
    treatment: "Tuina",
    price: "50,- €",
    sale: "40,- €",
  },
  {
    id: 4,
    treatment: "Bankovanie",
    price: "50,- €",
    sale: "40,- €",
  },
  {
    id: 5,
    treatment: "Moxovanie",
    price: "50,- €",
    sale: "40,- €",
  },
  {
    id: 6,
    treatment: "Kozmetická akupunktúra",
    price: "50,- €",
    sale: "40,- €",
  },
  {
    id: 7,
    treatment: "Guasha",
    price: "50,- €",
    sale: "40,- €",
  },
  {
    id: 8,
    treatment: "Vstupné vyšetrenie",
    price: "50,- €",
    sale: "",
  },
]

export default function Acupuncture_pricing_form() {
  return <PricingForm title="Lekárska akupunktúra" treatments={treatments} />
}
