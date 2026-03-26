import type { MezoterapiaInvasiveProps } from "@/app/_lib/data_services/data_mezoterapia"
import PricingForm from "../../PricingForm"

export default function Mezoterapia_pricing_form_invasive({
  mezoterapiaInvasiveData,
  user,
  isAdmin,
}: MezoterapiaInvasiveProps & { user?: string | null; isAdmin?: boolean }) {
  const treatments = (mezoterapiaInvasiveData.pricing ?? []).map((item) => ({
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
      title="Invazívna mezoterapia – Vitalinjector"
      treatments={treatments}
      user={user}
      isAdmin={isAdmin}
    />
  )
}
