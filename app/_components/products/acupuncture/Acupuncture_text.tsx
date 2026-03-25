import type { AcupunctureMainProps } from "@/app/_lib/data_services/data_acupuncture"

export default function Acupuncture_text({
  acupunctureData,
}: AcupunctureMainProps) {
  return (
    <div className="space-y-3 text-sm 2xl:text-lg [&_p]:text-justify">
      {Object.values(acupunctureData.content).map((paragraph, index) => (
        <p key={index} className="text-gray-700 leading-8 whitespace-pre-wrap">
          {paragraph}
        </p>
      ))}
    </div>
  )
}
