import type { ServiceRow } from "@/app/_lib/data_services_all/data_services"

export default function Mezoterapia_text_non_invasive({ mezoterapiaNonInvasive }: { mezoterapiaNonInvasive: ServiceRow | null }) {
  return (
    <div className="space-y-3 text-sm 2xl:text-lg [&_p]:text-justify">
        <p  className="text-gray-700 leading-8 whitespace-pre-wrap">
          {mezoterapiaNonInvasive?.text}
        </p>
    </div>
  )
}
