import type { ServiceRow } from "@/app/_lib/data_services_all/data_services";
import { wrapChecklistInUl, highlightKeywords } from "@/app/_lib/helpers";

export default function Chemical_peeling_text({
  chemPeelingService,
}: {
  chemPeelingService: ServiceRow | null;
}) {
  return (
    <div className="space-y-3 text-sm 2xl:text-lg [&_p]:text-justify">
      <p
        className="text-gray-700 leading-7 whitespace-pre-wrap"
        dangerouslySetInnerHTML={{
          __html: chemPeelingService?.text
            ? wrapChecklistInUl(highlightKeywords(chemPeelingService.text))
            : "",
        }}
      ></p>
    </div>
  );
}
