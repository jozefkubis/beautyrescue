import { dataMicroneedling } from "@/app/_lib/data_services/data_microneedling"
import ExpandTextLG from "../../ExpandTextLG"

export default function Microneedling_text() {
  return (
    <div>
      <div className="space-y-4">
        <ExpandTextLG>
          <div className="space-y-3 text-sm 2xl:text-lg [&_p]:text-justify">
            {((dataMicroneedling.content.paragraphs as string[]) ?? []).map(
              (paragraph, index) => (
                <p key={index} className="text-gray-700 leading-8">
                  {index === 0 ? (
                    <>
                      <strong>{dataMicroneedling.name}</strong>{" "}
                      {paragraph.replace(/^Microneedling\s+/, "")}
                    </>
                  ) : (
                    paragraph
                  )}
                </p>
              ),
            )}

            <div>
              <p className="text-gray-700 leading-8 mb-2">
                <strong>
                  {
                    dataMicroneedling.attributes
                      .contraindicationsTitle as string
                  }
                </strong>
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {(
                  (dataMicroneedling.attributes
                    .contraindications as string[]) ?? []
                ).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </ExpandTextLG>
      </div>
    </div>
  )
}
