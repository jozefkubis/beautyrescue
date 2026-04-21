import type { ServiceRow } from "@/app/_lib/data_services_all/data_services";
import PricingForm from "../PricingForm";

type Chem_peeling_pricing_formProps = {
  chemicalPeelingService: ServiceRow | null;
  user?: string | null;
  isAdmin?: boolean;
};

export default function Chem_peeling_pricing_form({
  chemicalPeelingService,
  user,
  isAdmin,
}: Chem_peeling_pricing_formProps) {
  const treatments =
    chemicalPeelingService?.pricing?.map((item) => ({
      id: item.id,
      treatment: item.treatment,
      price: `${item.price_before_discount},- €`,
      sale:
        item.price_after_discount < item.price_before_discount
          ? `${item.price_after_discount},- €`
          : "",
    })) || [];

  return (
    <PricingForm
      title="Chemický peeling"
      treatments={treatments}
      user={user}
      isAdmin={isAdmin}
    />
  );
}
