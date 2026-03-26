import type { KyselinaHyaluronovaMainProps } from "@/app/_lib/data_services/data_kyselina_hyaluronova"
import PricingForm from "../PricingForm"

export default function Kyselina_hyaluronova_pricing_form({
  kyselinaHyaluronovaData,
  user,
  isAdmin,
}: KyselinaHyaluronovaMainProps & { user?: string | null; isAdmin?: boolean }) {
  const treatments = (kyselinaHyaluronovaData.pricing ?? []).map((item) => ({
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
      title="Kyselina hyaluronová"
      treatments={treatments}
      user={user}
      isAdmin={isAdmin}
    />
  )
}
