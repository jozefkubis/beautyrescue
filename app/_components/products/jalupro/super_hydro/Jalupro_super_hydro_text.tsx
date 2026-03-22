import { dataJaluproSuperHydro } from "@/app/_lib/data_services/data_jalupro"

export default function Jalupro_super_hydro_text() {
  return (
    <div className="space-y-6 text-sm 2xl:text-lg">
      <ul className="list-disc space-y-2 pl-6 marker:text-gray-500">
        {dataJaluproSuperHydro.text.topBullets.map((paragraph, index) => (
          <li
            key={index}
            className="text-gray-700 leading-8 whitespace-pre-wrap"
          >
            {paragraph}
          </li>
        ))}
      </ul>

      <p className="text-gray-700 leading-8 whitespace-pre-wrap">
        {dataJaluproSuperHydro.text.summary}
      </p>

      <ul className="list-disc space-y-2 pl-6 marker:text-gray-500">
        {dataJaluproSuperHydro.text.bottomBullets.map((paragraph, index) => (
          <li
            key={index}
            className="text-gray-700 leading-8 whitespace-pre-wrap"
          >
            {paragraph}
          </li>
        ))}
      </ul>
    </div>
  )
}
