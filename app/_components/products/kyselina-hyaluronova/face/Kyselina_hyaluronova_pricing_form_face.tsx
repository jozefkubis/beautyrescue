import type { KyselinaHyaluronovaFaceProps } from "@/app/_lib/data_services/data_kyselina_hyaluronova"
import PricingForm from "../../PricingForm"

export default function Kyselina_hyaluronova_pricing_form_face({
  kyselinaHyaluronovaFaceData,
  user,
  isAdmin,
}: KyselinaHyaluronovaFaceProps & { user?: string | null; isAdmin?: boolean }) {
  const treatments = (kyselinaHyaluronovaFaceData.pricing ?? []).map(
    (item) => ({
      id: item.id,
      treatment: item.treatment,
      price: `${item.price_before_discount},- €`,
      sale:
        item.price_after_discount < item.price_before_discount
          ? `${item.price_after_discount},- €`
          : "",
    }),
  )

  return (
    <div className="space-y-4">
      <PricingForm
        title="Kyselina hyaluronová - Tvár"
        treatments={treatments}
        user={user}
        isAdmin={isAdmin}
      />
    </div>
  )
}
