import type { ServiceRow } from "@/app/_lib/data_services_all/data_services";

export default function Kyselina_hyaluronova_text_face({
  kyselinaHyaluronovaFace,
}: {
  kyselinaHyaluronovaFace: ServiceRow;
}) {
  const text = kyselinaHyaluronovaFace.text ?? "";

  return (
    <div className="space-y-3 text-sm 2xl:text-lg [&_p]:text-justify">
      <p className="text-gray-700 leading-8 whitespace-pre-wrap">{text}</p>
    </div>
  );
}
