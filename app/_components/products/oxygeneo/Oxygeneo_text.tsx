import type { ServiceRow } from "@/app/_lib/data_services_all/data_services";
import { wrapChecklistInUl } from "@/app/_lib/helpers";
import ExpandTextLG from "../../ExpandTextLG";

type Oxygeneo_textProps = {
  oxygeneo?: ServiceRow | null;
};
export default function Oxygeneo_text({ oxygeneo }: Oxygeneo_textProps) {
  // "čítajte viac na:" zobrazí inou farbou, URL za ním ako klikateľný odkaz
  const withLinks = oxygeneo?.text
    ?.replace(
      /čítajte viac na: (https:\/\/www\.ncbi\.nlm\.nih\.gov\/pmc\/articles\/PMC5774907\/)/g,
      "<span style='color:#2f2321;font-size:0.75rem;'>čítajte viac na:</span> <a style='color:#8b092c;font-size:0.75rem;font-weight:bold;' href='$1' target='_blank' rel='noopener noreferrer'>$1</a>",
    )
    .replace(
      /Ošetrenie prebieha v niekoľkých náväzných krokoch:/gi,
      "<span style='color:#9d7410;font-weight:bold;'>Ošetrenie prebieha v niekoľkých náväzných krokoch:</span>",
    );

  // Zavolá funkciu priamo — žiadny regex, len čistá funkcia na texte
  const formattedText = withLinks ? wrapChecklistInUl(withLinks) : "";

  return (
    <div>
      <div className="space-y-4">
        <ExpandTextLG>
          <div className="space-y-3 text-sm 2xl:text-lg text-justify">
            <div
              className="text-gray-700 leading-7 whitespace-pre-wrap"
              dangerouslySetInnerHTML={{ __html: formattedText ?? "" }}
            />
          </div>
        </ExpandTextLG>
      </div>
    </div>
  );
}
