import { ServiceRow } from "@/app/_lib/data_services_all/data_services";
import PricingForm from "../PricingForm";

export default function Profhilo_pricing_form({
  profhilo,
  profhiloStructura,
  user,
  isAdmin,
}: {
  profhilo: ServiceRow | null | undefined;
  profhiloStructura: ServiceRow | null | undefined;
  user?: string | null;
  isAdmin?: boolean;
}) {
  const treatments = (profhilo?.pricing ?? []).map((item) => ({
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
      title="Profhilo"
      treatments={treatments}
      user={user}
      isAdmin={isAdmin}
    />
  );
}
