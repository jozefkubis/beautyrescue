import type { ServiceItem } from "./data_services.types"

export const dataProfhilo: ServiceItem = {
  slug: "profhilo",
  name: "Profhilo",
  summary: null,
  description: null,
  imageUrl: null,
  itemType: "service",
  category: "medical-cosmetics",
  subcategory: "profhilo",
  content: {
    paragraphs: [
      "Profhilo je injekčný produkt na báze kyseliny hyalurónovej určený na bioremodeláciu a omladenie pokožky. Používa sa na zlepšenie hydratácie, elasticity a pevnosti pokožky, pričom stimuluje tvorbu kolagénu a elastínu.",
      "Na rozdiel od bežných dermálnych výplní, Profhilo nezväčšuje objem, ale skôr zlepšuje kvalitu pokožky zvnútra.",
      "Dostupné varianty: Profhilo a Profhilo Structura.",
    ],
    about: {
      title: "Viac o Profhilo a Profhilo Structura",
      sections: [
        {
          product: "Profhilo",
          whatTitle: "Čo je Profhilo?",
          whatItems: [
            "Profhilo je produkt, ktorý obsahuje vysoko koncentrovanú stabilizovanú kyselinu hyalurónovú (HA).",
            "Neobsahuje chemické zosieťovacie prostriedky, čo ho robí bezpečným a prirodzeným riešením pre omladenie pleti.",
          ],
          howTitle: "Ako Profhilo funguje?",
          howItems: [
            "Bioremodelácia: Profhilo pôsobí ako booster, ktorý stimuluje prirodzenú produkciu kolagénu a elastínu v pokožke.",
            "Hydratácia: Kyselina hyalurónová v Profhilo viaže vodu, čím zlepšuje hydratáciu pokožky a redukuje jemné vrásky.",
            "BAP technika: Aplikácia Profhilo sa často vykonáva pomocou špeciálnej techniky piatich bodov na tvári (Bio Aesthetic Points), ktorá minimalizuje riziko a zabezpečuje rovnomernú distribúciu prípravku.",
          ],
          benefitsTitle: "Aké sú výhody Profhilo?",
          benefitsItems: [
            "Zlepšenie hydratácie: Pokožka je hĺbkovo hydratovaná a vyzerá sviežejšie.",
            "Zvýšenie elasticity a pevnosti: Profhilo pomáha obnoviť elasticitu a pevnosť pokožky, čím redukuje ochabnutosť a vrásky.",
            "Prirodzený vzhľad: Výsledky sú prirodzené a nevedú k zmenám objemu.",
            "Dlhotrvajúci účinok: Účinok Profhilo môže trvať až 6 až 12 mesiacov, v závislosti od individuálnych faktorov.",
            "Minimálne invazívne: Procedúra je menej invazívna v porovnaní s inými estetickými zákrokmi.",
          ],
          suitableTitle: "Pre koho je Profhilo vhodné?",
          suitableItems: [
            "Chcú zlepšiť kvalitu svojej pleti.",
            "Trpia ochabnutou pokožkou na tvári, krku, dekolte alebo rukách.",
            "Hľadajú prirodzené a dlhotrvajúce riešenie pre omladenie pleti.",
            "Chcú minimalizovať vrásky a zlepšiť hydratáciu pokožky.",
          ],
        },
        {
          product: "Profhilo Structura",
          whatTitle: "Čo je Profhilo Structura?",
          whatItems: [
            "Je to injekčný produkt na báze kyseliny hyalurónovej, ktorý je špeciálne navrhnutý pre obnovu štruktúry tváre a podkožného tuku.",
            "Obsahuje vysokú koncentráciu kyseliny hyalurónovej, ktorá prináša dlhodobejší efekt.",
            "Ošetrenie je minimálne invazívne a pôsobí do hĺbky pleti, čím stimuluje tvorbu kolagénu a elastínu.",
          ],
          howTitle: "Ako Profhilo Structura funguje?",
          howItems: [
            "Aplikuje sa do hlbších vrstiev pokožky, kde stimuluje regeneráciu tukových buniek a obnovuje ich funkciu.",
            "Tým dochádza k obnoveniu strateného objemu, spevneniu pleti a zlepšeniu kontúr tváre.",
            "Výsledkom je prirodzený liftingový efekt a mladistvejší vzhľad pleti.",
          ],
          benefitsTitle: "Ošetrenie Profhilo Structura",
          benefitsItems: [
            "Zvyčajne sa odporúčajú dve ošetrenia s odstupom 30 dní.",
            "Aplikácia je pomerne rýchla a s minimálnym diskomfortom.",
            "Výsledky sú viditeľné a dlhodobé, s možnosťou opakovať ošetrenie pre udržanie efektu.",
          ],
          suitableTitle: "Pre koho je Profhilo Structura vhodné?",
          suitableItems: [
            "Pre ľudí, ktorí si všímajú stratu objemu v tvári, prepadnuté líca, povolené kontúry tváre a celkovú ochabnutosť pleti.",
            "Je vhodné pre pacientov, ktorí chcú dosiahnuť prirodzený lifting a spevnenie pleti bez nutnosti invazívnych zákrokov.",
            "Môže byť použité aj ako prevencia prejavov starnutia pleti.",
          ],
        },
      ],
    },
  },
  gallery: [
    { src: "/images/profhilo-1.jpeg", alt: "Profhilo aplikácia" },
    { src: "/images/profhilo-2.jpeg", alt: "Profhilo výsledok" },
  ],
  attributes: {},
  metadata: {},
}
