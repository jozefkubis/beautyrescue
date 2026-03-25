import type { JaluproClassicProps } from "@/app/_lib/data_services/data_jalupro"

export default function Jalupro_classic_text({
  jaluproClassicData,
}: JaluproClassicProps) {
  return (
    <ul className="list-disc space-y-2 pl-6 text-sm 2xl:text-lg marker:text-gray-500">
      {(jaluproClassicData.content.paragraphs as string[]).map(
        (paragraph, index) => (
          <li
            key={index}
            className="text-gray-700 leading-8 whitespace-pre-wrap"
          >
            {paragraph}
          </li>
        ),
      )}
    </ul>
  )
}
