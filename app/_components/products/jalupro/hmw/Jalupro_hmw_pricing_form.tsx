import type { JaluproHMWProps } from "@/app/_lib/data_services/data_jalupro"
import PricingForm from "../../PricingForm"

export default function Jalupro_hmw_pricing_form({
  jaluproHMWData,
  user,
  isAdmin,
}: JaluproHMWProps & { user?: string | null; isAdmin?: boolean }) {
  const treatments = jaluproHMWData.pricing.map((item) => ({
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
      title="Jalupro"
      treatments={treatments}
      user={user}
      isAdmin={isAdmin}
    />
  )
}
