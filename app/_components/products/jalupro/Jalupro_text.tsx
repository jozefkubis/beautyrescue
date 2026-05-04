import type { ServiceRow } from "@/app/_lib/data_services_all/data_services";
import { highlightKeywords, wrapChecklistInUl } from "@/app/_lib/helpers";

export default function Jalupro_text({
  jalupro,
}: {
  jalupro: ServiceRow | null | undefined;
}) {
  const highlightedText = highlightKeywords(jalupro?.text ?? "");
  const checklistHtml = wrapChecklistInUl(highlightedText);

  return (
    <div className="space-y-3 text-sm 2xl:text-lg [&_p]:text-justify">
      <div
        className="text-gray-700 leading-7 whitespace-pre-wrap"
        dangerouslySetInnerHTML={{ __html: checklistHtml ?? "" }}
      />
    </div>
  );
}
