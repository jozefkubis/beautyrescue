import type { ProfhiloMainProps } from "@/app/_lib/data_services/data_profhilo"

export default function Profhilo_text({ profhiloData }: ProfhiloMainProps) {
  return (
    <div className="space-y-3 text-sm 2xl:text-lg [&_p]:text-justify">
      {(profhiloData.content.paragraphs as string[]).map((paragraph, index) => {
        const formattedParagraph = paragraph.replace(
          /Dostupné varianty:/g,
          "<strong>Dostupné varianty:</strong>",
        )

        return (
          <p
            key={index}
            className="text-gray-700 leading-8 whitespace-pre-wrap"
            dangerouslySetInnerHTML={{ __html: formattedParagraph }}
          />
        )
      })}
    </div>
  )
}
