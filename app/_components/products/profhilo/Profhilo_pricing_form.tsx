import type { ProfhiloMainProps } from "@/app/_lib/data_services/data_profhilo"
import PricingForm from "../PricingForm"

export default function Profhilo_pricing_form({
  profhiloData,
  user,
  isAdmin,
}: ProfhiloMainProps & { user?: string | null; isAdmin?: boolean }) {
  const treatments = (profhiloData.pricing ?? []).map((item) => ({
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
      title="Profhilo"
      treatments={treatments}
      user={user}
      isAdmin={isAdmin}
    />
  )
}
