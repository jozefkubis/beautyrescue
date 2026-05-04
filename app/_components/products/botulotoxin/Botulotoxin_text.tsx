import { ServiceRow } from "@/app/_lib/data_services_all/data_services";
import { highlightKeywords } from "@/app/_lib/helpers";
import ExpandTextLG from "../../ExpandTextLG";

type Botulotoxin_textProps = {
  botulotoxin?: ServiceRow | null;
};

export default function Botulotoxin_text({
  botulotoxin,
}: Botulotoxin_textProps) {
  const text = botulotoxin?.text || "";

  const withHighlights = botulotoxin?.text ? highlightKeywords(text) : "";

  return (
    <>
      <ExpandTextLG>
        <div className="space-y-3 text-sm 2xl:text-lg [&_p]:text-justify">
          <p
            className="text-gray-700 leading-7  whitespace-pre-wrap"
            dangerouslySetInnerHTML={{ __html: withHighlights }}
          ></p>
        </div>
      </ExpandTextLG>
    </>
  );
}
