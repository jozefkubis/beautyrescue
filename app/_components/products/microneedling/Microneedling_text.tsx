import type { ServiceRow } from "@/app/_lib/data_services_all/data_services";
import { highlightKeywords, wrapChecklistInUl } from "@/app/_lib/helpers";
import ExpandTextLG from "../../ExpandTextLG";

export default function Microneedling_text({
  microneedling,
}: {
  microneedling?: ServiceRow | null;
}) {
  const withHighlights = microneedling?.text
    ? highlightKeywords(microneedling.text)
    : "";
  const formattedText = withHighlights ? wrapChecklistInUl(withHighlights) : "";

  return (
    <div>
      <div className="space-y-4">
        <ExpandTextLG>
          <div className="space-y-3 text-sm 2xl:text-lg [&_p]:text-justify">
            <div
              className="text-gray-700 leading-7 whitespace-pre-wrap text-justify"
              dangerouslySetInnerHTML={{ __html: formattedText }}
            />
          </div>
        </ExpandTextLG>
      </div>
    </div>
  );
}
