import type { AcupunctureMainProps } from "@/app/_lib/data_services/data_acupuncture"

export default function Acupuncture_text({
  acupunctureData,
}: AcupunctureMainProps) {
  return (
    <section title="Acupuncture content" className="space-y-3 text-sm 2xl:text-lg">
      {(acupunctureData.content.paragraphs ?? []).map((paragraph, index) => (
        <p
          key={index}
          className="text-justify text-gray-700 leading-8 whitespace-pre-wrap"
        >
          {paragraph}
        </p>
      ))}
    </section>
  )
}
