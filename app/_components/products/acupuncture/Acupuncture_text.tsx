import type { ServiceRow } from "@/app/_lib/data_services_all/data_services";
import { highlightKeywords, wrapChecklistInUl } from "@/app/_lib/helpers";

export default function Acupuncture_text({
  acupuncture,
}: {
  acupuncture: ServiceRow | null | undefined;
}) {
  const text = acupuncture?.text ?? "";
  const highlightedText = highlightKeywords(text);
  const formattedText = highlightedText
    ? wrapChecklistInUl(highlightedText)
    : "";

  return (
    <section
      title="Acupuncture content"
      className="space-y-3 text-sm 2xl:text-lg"
    >
      <div className="text-justify text-gray-700 leading-7 whitespace-pre-wrap">
        <span dangerouslySetInnerHTML={{ __html: formattedText }} />
      </div>
    </section>
  );
}
