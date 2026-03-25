import type { ChemicalPeelingMainProps } from "@/app/_lib/data_services/data_chemical_peeling"

export default function Chemical_peeling_text({
  chemicalPeelingData,
}: ChemicalPeelingMainProps) {
  return (
    <div className="space-y-3 text-sm 2xl:text-lg [&_p]:text-justify">
      {chemicalPeelingData.content.paragraphs.map((paragraph, index) => (
        <p key={index} className="text-gray-700 leading-8 whitespace-pre-wrap">
          {paragraph}
        </p>
      ))}
    </div>
  )
}
