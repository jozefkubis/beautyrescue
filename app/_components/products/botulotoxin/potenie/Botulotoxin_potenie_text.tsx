import { dataBotulotoxinPotenie } from "@/app/_lib/data_services/data_botulotoxin"

export default function Botulotoxin_potenie_text() {
  return (
    <div className="space-y-3 text-sm 2xl:text-lg [&_p]:text-justify">
      {dataBotulotoxinPotenie.text.paragraphs.map((paragraph, index) => {
        if (index === 0) {
          return (
            <p
              key={index}
              className="whitespace-pre-wrap leading-8 text-gray-700"
            >
              <strong>Nadmerné potenie - hyperhidrosis</strong>
              {paragraph.replace("Nadmerné potenie - hyperhidrosis", "")}
            </p>
          )
        }

        if (index === 1) {
          return (
            <p
              key={index}
              className="whitespace-pre-wrap leading-8 text-gray-700"
            >
              <strong>Potenie je</strong>
              {paragraph.replace("Potenie je", "")}
            </p>
          )
        }

        if (index === 3) {
          return (
            <p
              key={index}
              className="whitespace-pre-wrap leading-8 text-gray-700"
            >
              <strong>{paragraph}</strong> (
              <a
                href={dataBotulotoxinPotenie.text.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-redMain underline"
              >
                čítajte viac tu
              </a>
              )
            </p>
          )
        }

        if (index === 4) {
          const lead =
            "Botulotoxínové injekcie sú jedna z najúčinnejších metód liečby hyperhidrózy."

          return (
            <p
              key={index}
              className="whitespace-pre-wrap leading-8 text-gray-700"
            >
              <strong>{lead}</strong>
              {paragraph.replace(lead, "")}
            </p>
          )
        }

        return (
          <p
            key={index}
            className="whitespace-pre-wrap leading-8 text-gray-700"
          >
            {paragraph}
          </p>
        )
      })}
    </div>
  )
}
