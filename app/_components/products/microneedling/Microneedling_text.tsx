import type { ServiceRow } from "@/app/_lib/data_services_all/data_services";
import ExpandTextLG from "../../ExpandTextLG";

// Prejde text riadok po riadku — ak riadok začína ✓, zabalí ho do <li>
// Keď skupina ✓ riadkov skončí, celú skupinu zabalí do <ul>
function wrapChecklistInUl(text: string): string {
  const lines = text.split("\n");
  const result: string[] = [];
  let checklistBuffer: string[] = [];

  for (const line of lines) {
    if (line.trimStart().startsWith("✓")) {
      // Riadok patrí do zoznamu — odlož ho
      checklistBuffer.push(`<li>${line.trim()}</li>`);
    } else {
      // Riadok nie je ✓ — ak bol pred ním zoznam, uzavri ho
      if (checklistBuffer.length > 0) {
        result.push(
          `<ul style='list-style:none;padding:0;margin:0;text-align:left;'>${checklistBuffer.join("")}</ul>`,
        );
        checklistBuffer = [];
      }
      result.push(line);
    }
  }

  // Ak text končí ✓ riadkami, uzavri zoznam na konci
  if (checklistBuffer.length > 0) {
    result.push(
      `<ul style='list-style:none;padding:0;margin:0;text-align:left;'>${checklistBuffer.join("")}</ul>`,
    );
  }

  return result.join("\n");
}

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
