import type { JaluproYoungEyeProps } from "@/app/_lib/data_services/data_jalupro"
import PricingForm from "../../PricingForm"

export default function Jalupro_young_eye_pricing_form({
  jaluproYoungEyeData,
  user,
  isAdmin,
}: JaluproYoungEyeProps & { user?: string | null; isAdmin?: boolean }) {
  const treatments = jaluproYoungEyeData.pricing.map((item) => ({
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
