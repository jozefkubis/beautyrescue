import { ServiceRow } from "@/app/_lib/data_services_all/data_services";
import PricingForm from "../../PricingForm";

type JaluproClassicProps = {
  jaluproClassic?: ServiceRow | null | undefined;
  user?: string | null;
  isAdmin?: boolean;
};

export default function Jalupro_pricing_form({
  jaluproClassic,
  user,
  isAdmin,
}: JaluproClassicProps) {
  const treatments = (jaluproClassic?.pricing || []).map((item) => ({
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
      title="Jalupro"
      treatments={treatments}
      user={user}
      isAdmin={isAdmin}
    />
  );
}
