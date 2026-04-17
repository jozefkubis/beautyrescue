import { ServiceRow } from "@/app/_lib/data_services_all/data_services";

// Slovenský komentár: Komponent zvýrazní kľúčové frázy a nahradí špeciálny text za klikateľný odkaz, podobne ako Oxygeneo_text.
export default function Botulotoxin_potenie_text({
  botulotoxinPotenie,
}: {
  botulotoxinPotenie: ServiceRow;
}) {
  let text = botulotoxinPotenie?.text || "";

  // Zvýrazni kľúčové frázy spanom
  text = text
    .replace(
      /Nadmerné potenie\s*-\s*hyperhidrosis/gi,
      "<span class='highlight'>Nadmerné potenie - hyperhidrosis</span>",
    )
    .replace(/Potenie je/gi, "<span class='highlight'>Potenie je</span>")
    .replace(
      /Podnet na sekréciu potu je[\s\S]*?potnej žľazy\./gi,
      (match) => `<span class='highlight'>${match}</span>`,
    )
    .replace(
      /Botulotoxínové injekcie sú jedna z najúčinnejších metód liečby hyperhidrózy\.?/gi,
      (match) => `<span class='highlight'>${match}</span>`,
    )
    // Odkaz na článok - nahradí celý výraz za klikateľný link
    .replace(
      /\(čítajte viac tu:\s*"(https:\/\/www\.lekarsky\.herba\.sk\/lekarsky-obzor-2009\/55-lekarsky-obzor-2-2009\/145-hyperhidroza-a-jej-priciny\.html)"\)/gi,
      (_match, url) =>
        `<a href='${url}' target='_blank' rel='noopener noreferrer' class='highlight text-xs italic underline underline-offset-2'>(čítajte viac tu)</a>`,
    );

  return (
    <div className="space-y-3 text-sm 2xl:text-lg text-gray-700 leading-7 whitespace-pre-wrap text-justify">
      {/* Slovenský komentár: Renderujeme HTML s highlightami a linkom */}
      <p dangerouslySetInnerHTML={{ __html: text }} />
    </div>
  );
}
