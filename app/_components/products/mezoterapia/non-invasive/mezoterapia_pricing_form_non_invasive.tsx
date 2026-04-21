import { ServiceRow } from "@/app/_lib/data_services_all/data_services";
import PricingForm from "../../PricingForm";

export default function Mezoterapia_pricing_form_non_invasive({
  mezoterapiaNonInvasive,
  user,
  isAdmin,
}: {
  mezoterapiaNonInvasive: ServiceRow | null;
  user?: string | null;
  isAdmin?: boolean;
}) {
  const treatments = (mezoterapiaNonInvasive?.pricing ?? []).map((item) => ({
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
      title="Neinvazívna mezoterapia – MesojectGun"
      treatments={treatments}
      user={user}
      isAdmin={isAdmin}
    />
  );
}
