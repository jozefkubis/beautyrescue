import type { MezoterapiaNonInvasiveProps } from "@/app/_lib/data_services/data_mezoterapia"
import PricingForm from "../../PricingForm"

export default function Mezoterapia_pricing_form_non_invasive({
  mezoterapiaNonInvasiveData,
  user,
  isAdmin,
}: MezoterapiaNonInvasiveProps & { user?: string | null; isAdmin?: boolean }) {
  const treatments = (mezoterapiaNonInvasiveData.pricing ?? []).map((item) => ({
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
      title="Neinvazívna mezoterapia – MesojectGun"
      treatments={treatments}
      user={user}
      isAdmin={isAdmin}
    />
  )
}
