import type { DiamondMicrodermabrasionMainProps } from "@/app/_lib/data_services/data_diamond_microdermabrasion"
import ExpandTextLG from "../../ExpandTextLG"

export default function Diamond_microdermabrasion_text({
  diamondMicrodermabrasionData,
}: DiamondMicrodermabrasionMainProps) {
  return (
    <div>
      <div className="space-y-4">
        <ExpandTextLG>
          <div className="space-y-3 text-sm 2xl:text-lg [&_p]:text-justify">
            <p className="text-gray-700 leading-8">
              {diamondMicrodermabrasionData.content.intro as string}
            </p>

            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {(
                (diamondMicrodermabrasionData.attributes
                  .benefits as string[]) ?? []
              ).map((benefit) => (
                <li key={benefit}>{benefit}</li>
              ))}
            </ul>

            {(
              (diamondMicrodermabrasionData.content.paragraphs as string[]) ??
              []
            ).map((paragraph, index) => (
              <p key={index} className="text-gray-700 leading-8">
                {paragraph}
              </p>
            ))}
          </div>
        </ExpandTextLG>
      </div>
    </div>
  )
}
