import type { ServiceRow } from "@/app/_lib/data_services_all/data_services";
import { highlightKeywords, wrapChecklistInUl } from "@/app/_lib/helpers";

type DiamondMicrodermabrasionTextProps = {
  diamondMicroderm?: ServiceRow | null;
};

export default function Diamond_microdermabrasion_text({
  // diamondMicrodermabrasionData,
  diamondMicroderm,
}: DiamondMicrodermabrasionTextProps) {
  const text = diamondMicroderm?.text ?? "";
  const highlightedText = highlightKeywords(text);
  const checklistHtml = wrapChecklistInUl(highlightedText);

  return (
    <div>
      <div className="space-y-4">
        <div className="space-y-3 text-sm 2xl:text-lg [&_p]:text-justify whitespace-pre-wrap leading-7 text-gray-700">
          {text ? (
            <div
              dangerouslySetInnerHTML={{ __html: checklistHtml }}
              className="text-gray-700 leading-7 whitespace-pre-wrap text-justify"
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
