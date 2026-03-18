import { dataKyselinaHyaluronova } from "@/app/_lib/data_services/data_kyselina_hyaluronova"

export default function Kyselina_hyaluronova_text() {
  return (
    <div className="space-y-3 text-sm 2xl:text-lg [&_p]:text-justify">
      {dataKyselinaHyaluronova.text.paragraphs.map((paragraph, index) => (
        <p key={index} className="text-gray-700 leading-8 whitespace-pre-wrap">
          {paragraph}
        </p>
      ))}
    </div>
  )
}
