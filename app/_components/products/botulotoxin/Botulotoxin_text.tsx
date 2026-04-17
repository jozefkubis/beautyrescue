import { ServiceRow } from "@/app/_lib/data_services_all/data_services";
import ExpandTextLG from "../../ExpandTextLG";

type Botulotoxin_textProps = {
  botulotoxin?: ServiceRow | null;
};

export default function Botulotoxin_text({
  botulotoxin,
}: Botulotoxin_textProps) {
  const text = botulotoxin?.text || "";

  const withHighlights = text.replace(
    /Kontraindikácie:/g,
    "<span style='color:#9d7410;font-weight:bold;'>Kontraindikácie:</span>",
  )
  .replace(
    /Komplikácie:/g,
    "<span style='color:#9d7410;font-weight:bold;'>Komplikácie:</span>",
  );

  return (
    <>
      <ExpandTextLG>
        <div className="space-y-3 text-sm 2xl:text-lg [&_p]:text-justify">
          <p className="text-gray-700 leading-7  whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: withHighlights }}></p>
        </div>
      </ExpandTextLG>
    </>
  );
}
