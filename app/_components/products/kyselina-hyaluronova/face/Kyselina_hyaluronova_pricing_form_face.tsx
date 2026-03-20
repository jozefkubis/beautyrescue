import PricingForm from "../../PricingForm"

const treatments = [
  {
    id: 1,
    treatment: "Výplň kyselina hyaluronová Juvéderm, Belotero - 1ml",
    price: "270,-",
    sale: "",
  },
  {
    id: 2,
    treatment: "Výplň VOLUME - kyselina hyaluronová - 1ml typu Voluma",
    price: "350,-",
    sale: "330,-",
  },
  {
    id: 3,
    treatment: "JALUPRO Classic",
    price: "190,-",
    sale: "175,-",
  },
  {
    id: 4,
    treatment: "Jalupro HMW",
    price: "220,-",
    sale: "210,-",
  },
  {
    id: 5,
    treatment: "Kanyla",
    price: "13,-",
    sale: "",
  },
  {
    id: 6,
    treatment: "Vstupná konzultácia",
    price: "15,-",
    sale: "",
  },
]

export default function Kyselina_hyaluronova_pricing_form_face() {
  return (
    <div className="space-y-4">
      <PricingForm
        title="Kyselina hyaluronová - Tvár"
        treatments={treatments}
      />
      {/* <p className="px-4 text-xs font-semibold text-redDark">
        *lokalita = medziobočie / čelo / okolie očí
      </p> */}
    </div>
  )
}
