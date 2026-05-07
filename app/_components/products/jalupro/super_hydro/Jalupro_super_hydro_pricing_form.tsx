import type { ServiceRow } from "@/app/_lib/data_services_all/data_services";
import PricingForm from "../../PricingForm";

type Jalupro_super_hydro_pricing_formProps = {
  jaluproSuperHydro?: ServiceRow | null | undefined;
  user?: string | null;
  isAdmin?: boolean;
};

export default function Jalupro_super_hydro_pricing_form({
  jaluproSuperHydro,
  user,
  isAdmin,
}: Jalupro_super_hydro_pricing_formProps) {
  const treatments = (jaluproSuperHydro?.pricing || []).map((item) => ({
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
      title="Jalupro Super Hydro"
      treatments={treatments}
      user={user}
      isAdmin={isAdmin}
      serviceId={jaluproSuperHydro?.id || ""}
    />
  );
}
