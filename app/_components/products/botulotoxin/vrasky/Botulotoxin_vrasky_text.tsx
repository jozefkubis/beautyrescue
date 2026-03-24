import { dataBotulotoxinVrasky } from "@/app/_lib/data_services/data_botulotoxin"

export default function Botulotoxin_vrasky_text() {
  return (
    <div className="space-y-3 text-sm 2xl:text-lg [&_p]:text-justify">
      <p className="pb-2 text-center text-xl italic text-slate-600">
        {'"'}
        {dataBotulotoxinVrasky.summary}
        {'"'}
      </p>

      {(dataBotulotoxinVrasky.content.paragraphs as string[]).map(
        (paragraph, index) => (
          <p
            key={index}
            className="whitespace-pre-wrap leading-8 text-gray-700"
          >
            {paragraph}
          </p>
        ),
      )}
    </div>
  )
}
