import PricingForm from "../PricingForm"

const treatments = [
  {
    id: 1,
    treatment: "Kyselina HYA (Juvéderm)",
    price: "300,-",
    sale: "",
  },
  {
    id: 2,
    treatment: "Kyselina hyaluronová (J.Voluma) – tvár.výplň 1ml",
    price: "370,-",
    sale: "",
  },
  {
    id: 3,
    treatment: "Pery 0,5ml (Juvéderm Ultra Smile)",
    price: "170,-",
    sale: "",
  },
  {
    id: 4,
    treatment: "Pery 1ml (Juvéderm Ultra)",
    price: "300,-",
    sale: "",
  },
  {
    id: 5,
    treatment: "Kyselina hyaluronová + Collagen Boosting Classic (Švajčiarko)",
    price: "180,-",
    sale: "",
  },
  {
    id: 6,
    treatment: "Kyselina hyaluronová + Collagen Boosting HMW (Švajčiarsko)",
    price: "200,-",
    sale: "",
  },
  {
    id: 7,
    treatment: "Jalupro Super Hydro",
    price: "250,-",
    sale: "240,-",
  },
  {
    id: 8,
    treatment: "Jalupro Young Eye",
    price: "200,-",
    sale: "200,-",
  },
  {
    id: 9,
    treatment: "Vstupná konzultácia",
    price: "15,-",
    sale: "",
  },
  {
    id: 10,
    treatment: "Profhilo",
    price: "270,-",
    sale: "250,-",
  },
]

export default function Kyselina_hyaluronova_pricing_form() {
  return <PricingForm title="Kyselina hyaluronová" treatments={treatments} />
}
