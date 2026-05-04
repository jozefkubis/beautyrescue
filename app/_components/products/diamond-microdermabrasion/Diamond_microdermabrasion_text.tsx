import type { ServiceRow } from "@/app/_lib/data_services_all/data_services";
import { wrapChecklistInUl } from "@/app/_lib/helpers";

type DiamondMicrodermabrasionTextProps = {
  diamondMicroderm?: ServiceRow | null;
};

export default function Diamond_microdermabrasion_text({
  // diamondMicrodermabrasionData,
  diamondMicroderm,
}: DiamondMicrodermabrasionTextProps) {
  const text = diamondMicroderm?.text ?? "";
  const checklistHtml = wrapChecklistInUl(text);

  return (
    <div>
      <div className="space-y-4">
        <div className="space-y-3 text-sm 2xl:text-lg [&_p]:text-justify whitespace-pre-wrap">
          {text ? <p className="text-gray-700 leading-7">{text}</p> : null}
          {checklistHtml ? (
            <div dangerouslySetInnerHTML={{ __html: checklistHtml }} />
          ) : null}
        </div>
      </div>
    </div>
  );
}
