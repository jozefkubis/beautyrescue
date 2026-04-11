import type { OxygeneoMainProps } from "@/app/_lib/data_services/data_oxygeneo";
import ExpandTextLG from "../../ExpandTextLG";

export default function Oxygeneo_text({ oxygeneoData }: OxygeneoMainProps) {
  return (
    <div>
      <div className="space-y-4">
        <ExpandTextLG>
          <div className="space-y-3 text-sm 2xl:text-lg [&_p]:text-justify">
            <p className="text-gray-700 leading-7">
              {oxygeneoData.content.intro as string}
            </p>

            <p className="text-gray-700 leading-7">
              {oxygeneoData.content.description as string}
            </p>

            <div>
              <p className="text-gray-700 leading-7">
                {oxygeneoData.content.stepsTitle as string}
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {((oxygeneoData.content.steps as string[]) ?? []).map(
                  (step) => (
                    <li key={step}>{step}</li>
                  ),
                )}
              </ul>
              <p className="text-xs mt-2">
                ({oxygeneoData.metadata.citationLabel as string}{" "}
                <a
                  href={oxygeneoData.metadata.citationUrl as string}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-redDark hover:underline font-semibold"
                >
                  {oxygeneoData.metadata.citationUrl as string}
                </a>
                )
              </p>
            </div>

            <p className="text-gray-700 leading-7">
              {oxygeneoData.content.result as string}
            </p>
          </div>
        </ExpandTextLG>
      </div>
    </div>
  );
}
