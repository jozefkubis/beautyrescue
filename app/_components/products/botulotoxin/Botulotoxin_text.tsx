import type { BotulotoxinMainProps } from "@/app/_lib/data_services/data_botulotoxin"
import ExpandTextLG from "../../ExpandTextLG"

export default function Botulotoxin_text({
  botulotoxinData,
}: BotulotoxinMainProps) {
  const intro = botulotoxinData.attributes.intro ?? ""
  const contraindications = botulotoxinData.attributes.contraindications ?? ""
  const complications = botulotoxinData.attributes.complications ?? ""

  return (
    <>
      <ExpandTextLG>
        <div className="space-y-3 text-sm 2xl:text-lg [&_p]:text-justify">
          <p className="text-gray-700 leading-8  whitespace-pre-wrap">
            {intro}
          </p>

          <p className="text-gray-700 leading-8 whitespace-pre-wrap">
            <strong>Kontraindikácie:</strong> {contraindications}
          </p>

          <p className="text-gray-700 leading-8 whitespace-pre-wrap">
            <strong>Komplikácie:</strong> {complications}
          </p>
        </div>
      </ExpandTextLG>
    </>
  )
}
