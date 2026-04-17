import type { ServiceRow } from "@/app/_lib/data_services_all/data_services"

type BotulotoxinVraskyTextProps = {
  botulotoxinVrasky: ServiceRow;
};

export default function Botulotoxin_vrasky_text({
  botulotoxinVrasky,
}: BotulotoxinVraskyTextProps) {

const text = botulotoxinVrasky?.text || "";

const italicPhrase = text
    .replace(
      /"Tvár je index mysle."/gi,
      "<span class='italic text-2xl'>\"Tvár je index mysle.\"</span>",
    )
  return (
    <div className="space-y-3 text-sm 2xl:text-lg text-gray-700 leading-7 whitespace-pre-wrap text-justify">
      {/* Slovenský komentár: Renderujeme HTML s highlightami a linkom */}
      <p dangerouslySetInnerHTML={{ __html: italicPhrase }} />
    </div>
  )
}
