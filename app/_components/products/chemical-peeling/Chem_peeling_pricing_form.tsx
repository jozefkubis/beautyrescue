import type { ChemicalPeelingMainProps } from "@/app/_lib/data_services/data_chemical_peeling"
import PricingForm from "../PricingForm"

export default function Chem_peeling_pricing_form({
  chemicalPeelingData,
  user,
  isAdmin,
}: ChemicalPeelingMainProps & { user?: string | null }) {
  const treatments = chemicalPeelingData.pricing.map((item) => ({
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
      title="Chemický peeling"
      treatments={treatments}
      user={user}
      isAdmin={isAdmin}
    />
  )
}
