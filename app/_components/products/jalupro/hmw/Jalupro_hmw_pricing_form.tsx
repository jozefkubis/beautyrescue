import type { ServiceRow } from "@/app/_lib/data_services_all/data_services";
import PricingForm from "../../PricingForm";

type Jalupro_hmwProps = {
  jaluproHMW?: ServiceRow | null | undefined;
};

export default function Jalupro_hmw_pricing_form({
  jaluproHMW,
  user,
  isAdmin,
}: Jalupro_hmwProps & { user?: string | null; isAdmin?: boolean }) {
  const treatments = (jaluproHMW?.pricing || []).map((item) => ({
    id: item.id,
    treatment: item.treatment,
    price: `${item.price_before_discount},- €`,
    sale:
      item.price_after_discount < item.price_before_discount
        ? `${item.price_after_discount},- €`
        : "",
  }));

  // Slovensky: Posielame serviceId do formulara, aby sa nova procedura priradila k spravnemu produktu.
  return (
    <PricingForm
      title="Jalupro"
      treatments={treatments}
      user={user}
      isAdmin={isAdmin}
      serviceId={jaluproHMW?.id || ""}
    />
  );
}
