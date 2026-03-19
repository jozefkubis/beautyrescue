import PricingForm from "../../PricingForm"

const treatments = [
  {
    id: 1,
    treatment: "Mesojectgun – tvár",
    price: "60,- €",
    sale: "",
  },
  {
    id: 2,
    treatment: "Mesojectgun – tvár + krk",
    price: "100,- €",
    sale: "70,- €",
  },
  {
    id: 3,
    treatment: "Mesojectgun – tvár+krk+dekolt",
    price: "130,- €",
    sale: "80,- €",
  },
  {
    id: 4,
    treatment: "Mesojectgun – mesohair",
    price: "60,- €",
    sale: "",
  },
  {
    id: 5,
    treatment: "Výživná maska",
    price: "7,- €",
    sale: "",
  },
  {
    id: 6,
    treatment: 'Mezosérum "namieru"',
    price: "35,- €",
    sale: "",
  },
  {
    id: 7,
    treatment: "Vstupná konzultácia",
    price: "15,- €",
    sale: "",
  },
]

export default function Mezoterapia_pricing_form_non_invasive() {
  return (
    <PricingForm
      title="Neinvazívna mezoterapia – MesojectGun"
      treatments={treatments}
    />
  )
}
