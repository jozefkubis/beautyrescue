import type { ServiceRow } from "@/app/_lib/data_services_all/data_services";
import PricingForm from "../PricingForm";

export default function Oxygeneo_pricing_form({
  oxygeneo,
  user,
  isAdmin,
}: {
  oxygeneo?: ServiceRow | null;
  user?: string | null;
  isAdmin?: boolean;
}) {
  const treatments = (oxygeneo?.pricing ?? []).map((item) => ({
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
      title="Oxygeneo - okysličenie pleti"
      treatments={treatments}
      user={user}
      isAdmin={isAdmin}
      serviceId={oxygeneo?.id || ""}
    />
  );
}
