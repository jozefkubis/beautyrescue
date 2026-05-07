import type { ServiceRow } from "@/app/_lib/data_services_all/data_services";
import PricingForm from "../../PricingForm";

type Kyselina_hyaluronova_pricing_form_faceProps = {
  kyselinaHyaluronovaFace: ServiceRow | null | undefined;
  user?: string | null;
  isAdmin?: boolean;
};

export default function Kyselina_hyaluronova_pricing_form_face({
  kyselinaHyaluronovaFace,
  user,
  isAdmin,
}: Kyselina_hyaluronova_pricing_form_faceProps) {
  const treatments = (kyselinaHyaluronovaFace?.pricing ?? []).map((item) => ({
    id: item.id,
    treatment: item.treatment,
    price: `${item.price_before_discount},- €`,
    sale:
      item.price_after_discount < item.price_before_discount
        ? `${item.price_after_discount},- €`
        : "",
  }));

  // Slovensky: Posielame serviceId do formulara, aby sa nova procedura priradila k spravnej sluzbe.
  return (
    <div className="space-y-4">
      <PricingForm
        title="Kyselina hyaluronová - Tvár"
        treatments={treatments}
        user={user}
        isAdmin={isAdmin}
        serviceId={kyselinaHyaluronovaFace?.id || ""}
      />
    </div>
  );
}
