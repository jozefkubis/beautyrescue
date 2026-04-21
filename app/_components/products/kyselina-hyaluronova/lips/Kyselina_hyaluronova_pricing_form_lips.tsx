import type { ServiceRow } from "@/app/_lib/data_services_all/data_services";
import PricingForm from "../../PricingForm";

type Kyselina_hyaluronova_pricing_form_lipsProps = {
  kyselinaHyaluronovaLips: ServiceRow | null | undefined;
  user?: string | null;
  isAdmin?: boolean;
};

export default function Kyselina_hyaluronova_pricing_form_lips({
  kyselinaHyaluronovaLips,
  user,
  isAdmin,
}: Kyselina_hyaluronova_pricing_form_lipsProps) {
  const treatments = (kyselinaHyaluronovaLips?.pricing ?? []).map((item) => ({
    id: item.id,
    treatment: item.treatment,
    price: `${item.price_before_discount},- €`,
    sale:
      item.price_after_discount < item.price_before_discount
        ? `${item.price_after_discount},- €`
        : "",
  }));

  return (
    <PricingForm
      title="Kyselina hyaluronová - Pery"
      treatments={treatments}
      user={user}
      isAdmin={isAdmin}
    />
  );
}
