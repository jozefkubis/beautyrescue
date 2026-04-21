import type { ServiceRow } from "@/app/_lib/data_services_all/data_services";
import PricingForm from "../PricingForm";

export default function Dimond_micro_pricing_form({
  diamondMicroderm,
  user,
  isAdmin,
}: {
  diamondMicroderm?: ServiceRow | null;
  user?: string | null;
  isAdmin?: boolean;
}) {
  const treatments = diamondMicroderm?.pricing
    ? diamondMicroderm.pricing.map((item) => ({
        id: item.id,
        treatment: item.treatment,
        price: `${item.price_before_discount},- €`,
        sale:
          item.price_after_discount < item.price_before_discount
            ? `${item.price_after_discount},- €`
            : "",
      }))
    : [];

  return (
    <PricingForm
      title="Diamantová mikrodermabrázia"
      treatments={treatments}
      user={user}
      isAdmin={isAdmin}
    />
  );
}
