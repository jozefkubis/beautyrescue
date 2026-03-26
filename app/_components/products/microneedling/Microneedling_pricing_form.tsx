import type { MicroneedlingMainProps } from "@/app/_lib/data_services/data_microneedling"
import PricingForm from "../PricingForm"

export default function Microneedling_pricing_form({
  microneedlingData,
  user,
  isAdmin,
}: MicroneedlingMainProps & { user?: string | null; isAdmin?: boolean }) {
  const treatments = microneedlingData.pricing.map((item) => ({
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
      title="Microneedling"
      treatments={treatments}
      user={user}
      isAdmin={isAdmin}
    />
  )
}
