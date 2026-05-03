import type { ServiceRow } from "@/app/_lib/data_services_all/data_services";
import { wrapChecklistInUl } from "@/app/_lib/helpers";
import ExpandTextLG from "../../ExpandTextLG";

export default function Microneedling_text({
  microneedling,
}: {
  microneedling?: ServiceRow | null;
}) {
  const withHighlights = microneedling?.text?.replace(
    /Kontraindikácie:/g,
    "<span style='color:#9d7410;font-weight:bold;'>Kontraindikácie:</span>",
  );

  const formattedText = withHighlights ? wrapChecklistInUl(withHighlights) : "";

  return (
    <div>
      <div className="space-y-4">
        <ExpandTextLG>
          <div className="space-y-3 text-sm 2xl:text-lg [&_p]:text-justify whitespace-pre-wrap">
            <div
              className="text-gray-700 leading-7"
              dangerouslySetInnerHTML={{ __html: formattedText }}
            />
          </div>
        </ExpandTextLG>
      </div>
    </div>
  );
}
