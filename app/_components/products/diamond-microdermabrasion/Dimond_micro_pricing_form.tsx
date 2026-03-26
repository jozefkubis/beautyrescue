import type { DiamondMicrodermabrasionMainProps } from "@/app/_lib/data_services/data_diamond_microdermabrasion"
import PricingForm from "../PricingForm"

export default function Dimond_micro_pricing_form({
  diamondMicrodermabrasionData,
  user,
  isAdmin,
}: DiamondMicrodermabrasionMainProps & {
  user?: string | null
  isAdmin?: boolean
}) {
  const treatments = diamondMicrodermabrasionData.pricing.map((item) => ({
    id: item.id,
    treatment: item.treatment,
    price: `${item.price_before_discount},- €`,
    sale:
      item.price_after_discount < item.price_before_discount
        ? `${item.price_after_discount},- €`
        : "",
  }))

  return (
    <PricingForm
      title="Diamantová mikrodermabrázia"
      treatments={treatments}
      user={user}
      isAdmin={isAdmin}
    />
  )
}
