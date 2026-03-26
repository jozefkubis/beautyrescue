import type { AcupunctureMainProps } from "@/app/_lib/data_services/data_acupuncture"
import PricingForm from "../PricingForm"

export default function Acupuncture_pricing_form({
  acupunctureData,
  user,
  isAdmin,
}: AcupunctureMainProps & { user?: string | null; isAdmin?: boolean }) {
  const treatments = acupunctureData.pricing.map((item) => ({
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
      title="Lekárska akupunktúra"
      treatments={treatments}
      user={user}
      isAdmin={isAdmin}
    />
  )
}
