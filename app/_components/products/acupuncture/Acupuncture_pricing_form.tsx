import type { ServiceRow } from "@/app/_lib/data_services_all/data_services";
import PricingForm from "../PricingForm";

type Acupuncture_pricing_formProps = {
  acupuncture: ServiceRow | null | undefined;
  user?: string | null;
  isAdmin?: boolean;
};

export default function Acupuncture_pricing_form({
  acupuncture,
  user,
  isAdmin,
}: Acupuncture_pricing_formProps) {
  const treatments = (acupuncture?.pricing ?? []).map((item) => ({
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
      title="Lekárska akupunktúra"
      treatments={treatments}
      user={user}
      isAdmin={isAdmin}
    />
  );
}
