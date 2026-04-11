// import type { ChemicalPeelingMainProps } from "@/app/_lib/data_services/data_chemical_peeling"
import type { ServiceRow } from "@/app/_lib/data_services_all/data_services";

export default function Chemical_peeling_text({
  chemPeelingService,
}: {
  chemPeelingService: ServiceRow | null;
}) {
  return (
    <div className="space-y-3 text-sm 2xl:text-lg [&_p]:text-justify">
      <p className="text-gray-700 leading-7 whitespace-pre-wrap">
        {chemPeelingService?.text}
      </p>
    </div>
  );
}
