import type { ServiceRow } from "@/app/_lib/data_services_all/data_services";

export default function Mezoterapia_text_invasive({
  mezoterapiaInvasive,
}: {
  mezoterapiaInvasive: ServiceRow | null;
}) {
  return (
    <div className="space-y-3 text-sm 2xl:text-lg [&_p]:text-justify">
      <p className="text-gray-700 leading-7 whitespace-pre-wrap">
        {mezoterapiaInvasive?.text}
      </p>
    </div>
  );
}
