import type { ServiceRow } from "@/app/_lib/data_services_all/data_services";

export default function Acupuncture_text({
  acupuncture,
}: {
  acupuncture: ServiceRow | null;
}) {

const text = acupuncture?.text ?? "";

  return (
    <section
      title="Acupuncture content"
      className="space-y-3 text-sm 2xl:text-lg"
    >
      <p className="text-justify text-gray-700 leading-7 whitespace-pre-wrap">
        {text}
      </p>
    </section>
  );
}
