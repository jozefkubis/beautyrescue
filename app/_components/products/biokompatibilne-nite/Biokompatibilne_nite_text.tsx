import type { BiokompatibilneNiteMainProps } from "@/app/_lib/data_services/data_biokompatibilne_nite"

export default function Biokompatibilne_nite_text({
  biokompatibilneNiteData,
}: BiokompatibilneNiteMainProps) {
  return (
    <div className="space-y-3 text-sm 2xl:text-lg [&_p]:text-justify">
      {biokompatibilneNiteData.content.paragraphs.map((paragraph, index) => (
        <p key={index} className="text-gray-700 leading-8 whitespace-pre-wrap">
          {index === 1 ? `„${paragraph}“` : paragraph}
        </p>
      ))}
    </div>
  )
}
