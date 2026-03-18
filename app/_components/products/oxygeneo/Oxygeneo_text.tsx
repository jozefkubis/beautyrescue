import { dataOxygeneo } from "@/app/_lib/data_services/data_oxygeneo"
import ExpandTextLG from "../../ExpandTextLG"

export default function Oxygeneo() {
  return (
    <div>
      <div className="space-y-4">
        <ExpandTextLG>
          <div className="space-y-3 text-sm 2xl:text-lg [&_p]:text-justify">
            <p className="text-gray-700 leading-8">{dataOxygeneo.text.intro}</p>

            <p className="text-gray-700 leading-8">
              {dataOxygeneo.text.description}
            </p>

            <div>
              <p className="text-gray-700 leading-8">
                {dataOxygeneo.text.stepsTitle}
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {dataOxygeneo.text.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ul>
              <p className="text-xs mt-2">
                ({dataOxygeneo.text.citationLabel}{" "}
                <a
                  href={dataOxygeneo.text.citationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-redDark hover:underline font-semibold"
                >
                  {dataOxygeneo.text.citationUrl}
                </a>
                )
              </p>
            </div>

            <p className="text-gray-700 leading-8">
              {dataOxygeneo.text.result}
            </p>
          </div>
        </ExpandTextLG>
      </div>
    </div>
  )
}
