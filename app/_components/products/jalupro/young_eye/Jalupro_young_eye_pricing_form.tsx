import type { ServiceRow } from "@/app/_lib/data_services_all/data_services";
import PricingForm from "../../PricingForm";

type JaluproYoungEyeProps = {
  jaluproYoungEye?: ServiceRow | null | undefined;
  user?: string | null;
  isAdmin?: boolean;
};

export default function Jalupro_young_eye_pricing_form({
  jaluproYoungEye,
  user,
  isAdmin,
}: JaluproYoungEyeProps) {
  const treatments = (jaluproYoungEye?.pricing ?? []).map((item) => ({
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
      title="Jalupro Young Eye"
      treatments={treatments}
      user={user}
      isAdmin={isAdmin}
    />
  );
}
