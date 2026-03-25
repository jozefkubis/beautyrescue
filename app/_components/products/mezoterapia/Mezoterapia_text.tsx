import type { MezoterapiaMainProps } from "@/app/_lib/data_services/data_mezoterapia"

export default function Mezoterapia_text({
  mezoterapiaData,
}: MezoterapiaMainProps) {
  return (
    <div className="space-y-3 text-sm 2xl:text-lg [&_p]:text-justify">
      {(mezoterapiaData.content.paragraphs as string[]).map(
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
