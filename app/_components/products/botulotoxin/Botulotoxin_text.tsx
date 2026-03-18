import { dataBotulotoxin } from "@/app/_lib/data_services/data_botulotoxin"
import ExpandTextLG from "../../ExpandTextLG"

export default function Botulotoxin_text() {
  return (
    <div className="space-y-3 text-sm 2xl:text-lg [&_p]:text-justify">
      <ExpandTextLG>
        <p className="text-gray-700 leading-8  whitespace-pre-wrap">
          {dataBotulotoxin.text.intro}
        </p>

        <p className="text-gray-700 leading-8 whitespace-pre-wrap">
          <strong>Kontraindikácie:</strong>{" "}
          {dataBotulotoxin.text.contraindications}
        </p>

        <p className="text-gray-700 leading-8 whitespace-pre-wrap">
          <strong>Komplikácie:</strong> {dataBotulotoxin.text.complications}
        </p>
      </ExpandTextLG>
    </div>
  )
}
