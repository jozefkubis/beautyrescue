import type { ServiceRow } from "@/app/_lib/data_services_all/data_services";

export default function Profhilo_text({
  profhilo,
}: {
  profhilo: ServiceRow | null;
}) {
  const text = profhilo?.text || "";

  const formattedParagraph = text.replace(
    /Dostupné varianty:/g,
    "<strong>Dostupné varianty:</strong>",
  );

  return (
    <div className="space-y-3 text-sm 2xl:text-lg [&_p]:text-justify">
      <p
        className="text-gray-700 leading-7 whitespace-pre-wrap"
        dangerouslySetInnerHTML={{ __html: formattedParagraph }}
      />
    </div>
  );
}
