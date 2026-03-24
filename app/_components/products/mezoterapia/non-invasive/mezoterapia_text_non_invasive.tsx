import { dataMezoterapiaNonInvasive } from "@/app/_lib/data_services/data_mezoterapia"

export default function Mezoterapia_text_non_invasive() {
  return (
    <div className="space-y-3 text-sm 2xl:text-lg [&_p]:text-justify">
      {(dataMezoterapiaNonInvasive.content.paragraphs as string[]).map(
        (paragraph, index) => (
          <p
            key={index}
            className="text-gray-700 leading-8 whitespace-pre-wrap"
          >
            {paragraph}
          </p>
        ),
      )}
    </div>
  )
}
