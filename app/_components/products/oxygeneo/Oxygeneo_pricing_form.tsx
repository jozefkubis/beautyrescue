import type { OxygeneoMainProps } from "@/app/_lib/data_services/data_oxygeneo"
import PricingForm from "../PricingForm"

export default function Oxygeneo_pricing_form({
  oxygeneoData,
}: OxygeneoMainProps) {
  const treatments = (oxygeneoData.pricing ?? []).map((item) => ({
    id: item.id,
    treatment: item.treatment,
    price: `${item.price_before_discount},- €`,
    sale:
      item.price_after_discount < item.price_before_discount
        ? `${item.price_after_discount},- €`
        : "",
  }))

  return (
    <PricingForm title="Oxygeneo - okysličenie pleti" treatments={treatments} />
  )
}
