import { ServiceRow } from "@/app/_lib/data_services_all/data_services";
import PricingForm from "../PricingForm";

type Kyselina_hyaluronova_pricing_formProps = {
  kyselinaHyaluronova: ServiceRow | null | undefined;
  user?: string | null;
  isAdmin?: boolean;
};

export default function Kyselina_hyaluronova_pricing_form({
  kyselinaHyaluronova,
  user,
  isAdmin,
}: Kyselina_hyaluronova_pricing_formProps) {
  const treatments = (kyselinaHyaluronova?.pricing ?? []).map((item) => ({
    id: item.id,
    treatment: item.treatment,
    price: `${item.price_before_discount},- €`,
    sale:
      item.price_after_discount < item.price_before_discount
        ? `${item.price_after_discount},- €`
        : "",
  }));

  // Slovensky: Exportujeme serviceId do PricingForm, aby vedel, pre ktorú službu pracuje.
  return (
    <PricingForm
      title="Kyselina hyaluronová"
      treatments={treatments}
      user={user}
      isAdmin={isAdmin}
      serviceId={kyselinaHyaluronova?.id || ""}
    />
  );
}
