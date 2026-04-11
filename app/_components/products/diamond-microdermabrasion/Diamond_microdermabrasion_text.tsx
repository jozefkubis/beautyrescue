import type { ServiceRow } from "@/app/_lib/data_services_all/data_services";

type DiamondMicrodermabrasionTextProps = {
  diamondMicroderm?: ServiceRow | null;
};

export default function Diamond_microdermabrasion_text({
  // diamondMicrodermabrasionData,
  diamondMicroderm,
}: DiamondMicrodermabrasionTextProps) {
  const text = diamondMicroderm?.text ?? "";

  return (
    <div>
      <div className="space-y-4">
        <div className="space-y-3 text-sm 2xl:text-lg [&_p]:text-justify whitespace-pre-wrap">
          {text ? <p className="text-gray-700 leading-7">{text}</p> : null}
        </div>
      </div>
    </div>
  );
}
