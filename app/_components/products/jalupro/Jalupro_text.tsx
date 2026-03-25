import type { JaluproMainProps } from "@/app/_lib/data_services/data_jalupro"

export default function Jalupro_text({ jaluproData }: JaluproMainProps) {
  return (
    <div className="space-y-3 text-sm 2xl:text-lg [&_p]:text-justify">
      {(jaluproData.content.paragraphs as string[]).map((paragraph, index) => (
        <p key={index} className="text-gray-700 leading-8 whitespace-pre-wrap">
          {paragraph}
        </p>
      ))}
    </div>
  )
}
