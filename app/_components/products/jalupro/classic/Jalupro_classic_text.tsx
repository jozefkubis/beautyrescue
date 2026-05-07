"use client";

import type { ServiceRow } from "@/app/_lib/data_services_all/data_services";
import { wrapChecklistInUl, highlightKeywords } from "@/app/_lib/helpers";


export default function Jalupro_classic_text({
  jaluproClassic,
}: {
  jaluproClassic?: ServiceRow | null;
}) {
  const highlightedText = highlightKeywords(jaluproClassic?.text ?? "");
  const checklistHtml = highlightedText ? wrapChecklistInUl(highlightedText) : "";

  return (
    <div className="space-y-3 text-sm 2xl:text-lg [&_p]:text-justify">
      <div
        className="text-gray-700 leading-8 whitespace-pre-wrap text-justify"
        dangerouslySetInnerHTML={{ __html: checklistHtml }}
      />
    </div>
  );
}
