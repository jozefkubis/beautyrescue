import type { JaluproSuperHydroProps } from "@/app/_lib/data_services/data_jalupro"
import PricingForm from "../../PricingForm"

export default function Jalupro_super_hydro_pricing_form({
  jaluproSuperHydroData,
}: JaluproSuperHydroProps) {
  const treatments = jaluproSuperHydroData.pricing.map((item) => ({
    id: item.id,
    treatment: item.treatment,
    price: `${item.price_before_discount},- €`,
    sale:
      item.price_after_discount < item.price_before_discount
        ? `${item.price_after_discount},- €`
        : "",
  }))

  return <PricingForm title="Jalupro" treatments={treatments} />
}
