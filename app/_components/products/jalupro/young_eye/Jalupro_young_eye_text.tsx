"use client";

import type { ServiceRow } from "@/app/_lib/data_services_all/data_services";

import { highlightKeywords, wrapChecklistInUl } from "@/app/_lib/helpers";

export default function Jalupro_young_eye_text({
  jaluproYoungEye,
}: {
  jaluproYoungEye?: ServiceRow | null;
}) {
  const highlightedText = highlightKeywords(jaluproYoungEye?.text ?? "");
  const formattedText = highlightedText
    ? wrapChecklistInUl(highlightedText)
    : "";

  return (
    <div className="space-y-3 text-sm 2xl:text-lg [&_p]:text-justify">
      <div
        className="text-gray-700 leading-8 whitespace-pre-wrap"
        dangerouslySetInnerHTML={{ __html: formattedText }}
      />
    </div>
  );
}
