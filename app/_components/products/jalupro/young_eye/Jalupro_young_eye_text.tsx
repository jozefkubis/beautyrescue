"use client";

import type { ServiceRow } from "@/app/_lib/data_services_all/data_services";

// Prejde text riadok po riadku — ak riadok začína ✓, zabalí ho do <li>
// Keď skupina ✓ riadkov skončí, celú skupinu zabalí do <ul>
function wrapChecklistInUl(text: string): string {
  const lines = text.split("\n");
  const result: string[] = [];
  let checklistBuffer: string[] = [];

  for (const line of lines) {
    if (line.trimStart().startsWith("✓")) {
      checklistBuffer.push(`<li>${line.trim()}</li>`);
    } else {
      if (checklistBuffer.length > 0) {
        result.push(
          `<ul style="list-style:none;padding:0;margin:0;text-align:left;">${checklistBuffer.join("")}</ul>`,
        );
        checklistBuffer = [];
      }

      result.push(line);
    }
  }

  if (checklistBuffer.length > 0) {
    result.push(
      `<ul style="list-style:none;padding:0;margin:0;text-align:left;">${checklistBuffer.join("")}</ul>`,
    );
  }

  return result.join("\n");
}

export default function Jalupro_young_eye_text({
  jaluproYoungEye,
}: {
  jaluproYoungEye?: ServiceRow | null;
}) {
  const text = jaluproYoungEye?.text ?? "";
  const formattedText = text ? wrapChecklistInUl(text) : "";

  return (
    <div className="space-y-3 text-sm 2xl:text-lg [&_p]:text-justify">
      <div
        className="text-gray-700 leading-8 whitespace-pre-wrap"
        dangerouslySetInnerHTML={{ __html: formattedText }}
      />
    </div>
  );
}
