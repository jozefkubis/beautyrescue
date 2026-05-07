import { ServiceRow } from "@/app/_lib/data_services_all/data_services";
import { highlightKeywords, wrapChecklistInUl } from "@/app/_lib/helpers";

type Kyselina_hyaluronova_textProps = {
  kyselinaHyaluronova?: ServiceRow | null;
};

export default function Kyselina_hyaluronova_text({
  kyselinaHyaluronova,
}: Kyselina_hyaluronova_textProps) {
  const highlightedText = highlightKeywords(kyselinaHyaluronova?.text ?? "");
  const checklistHtml = wrapChecklistInUl(highlightedText);

  return (
    <div className="space-y-3 text-sm 2xl:text-lg [&_p]:text-justify">
      <div
        className="text-gray-700 leading-7 whitespace-pre-wrap text-justify"
        dangerouslySetInnerHTML={{ __html: checklistHtml ?? "" }}
      />
    </div>
  );
}
