import type { ServiceItem } from "./data_services.types"

export const dataJalupro: ServiceItem = {
  slug: "jalupro",
  name: "Jalupro",
  summary: null,
  description: null,
  imageUrl: null,
  gallery: [
    { src: "/images/jalupro-1.jpeg", alt: "Jalupro aplikácia" },
    { src: "/images/jalupro-2.jpeg", alt: "Jalupro výsledok" },
    { src: "/images/jalupro-3.jpeg", alt: "Jalupro detail 3" },
    { src: "/images/jalupro-4.jpeg", alt: "Jalupro detail 4" },
  ],
  itemType: "service",
  category: "medical-cosmetics",
  subcategory: "jalupro",
  content: {
    paragraphs: [
      "Collagenbooster JALUPRO je švajčiarsky patentovaný dermálny biorevitalizér - sterilný inj. roztok obsahujúci kyselinu hyaluronovú (HA) rôznej molovej hmotnosti a aminokyseliny (glycín, prolín, leucín, lyzín) vo forme gélovej injekcie.",
      "Aplikuje sa vo forme mikroinjekcií do retikulárnej vrstvy dermis s cieľom podporiť činnosť fibroblastov (bunky pokožného spojivového tkaniva produkujúce kolagén pomocou nutričného podkladu klastru aminokyselín), resp. tvorbu nového kolagénu.",
      "Štúdiami preukázaný výsledok je zlepšená hydratácia, textúra, elasticita a redukcia jemných vrások, ako aj celkový biorytmus pokožky.",
    ],
    about: {
      title: "Viac informácií o Jalupro",
      effectsTitle: "Účinky",
      treatmentTitle: "Priebeh ošetrenia",
      aftercareTitle: "Po ošetrení",
      variants:
        "Jalupro Classic, Jalupro HMW, Jalupro Super Hydro, Jalupro Young Eye.",
    },
  },
  attributes: {
    effects: [
      "Rýchla a účinná hydratácia",
      "Stimulácia tvorby kolagénu",
      "Spevnenie pokožky",
      "Aktívna doprava aminokyselinového klastru",
      "Stimulácia proliferácie, diferenciácie a migrácie buniek (kumulatívny účinok spolu s aminokyselinovým klastrom)",
      "Aktivácia reparačných pochodov",
      "Výrazný antioxidačný účinok",
      "Prevencia starnutia",
      "Prevencia ochabnutia pokožky",
    ],
    effectSummary:
      "nastupuje postupne - tvorba nového kolagénu je proces trvajúci 3-6 týždňov. Aplikácia collagenboosteru Jalupro navracia pleti hustotu, pevnosť a elasticitu.",
    treatmentParagraphs: [
      "Aplikácia Jalupro nie je neznesiteľne bolestivá, avšak pre diskomfort spojený s inj. aplikáciou (vpichy) sa pred zákrokom aplikuje anestetický krém.",
      "Jalupro sa dá aplikovať prístrojovo injektorom (paradoxne pre pacienta najväčší diskomfort/bolesť) alebo manuálne špec. inj. ihlou technikou mikropapulami, lineárne alebo tvarom ventilátorov či mriežkou, a tiež zmiešanými aplikačnými injekčnými technikami. Po injekcii pokračujeme ľahkou masážou, aby sme liečivo rozdistribuovali čo najrovnomernejšie v aplikovanej zóne.",
      "Na záver ošetrenia je potrebné pokožku dezinfekčne vyčistiť a upokojiť maskou podľa typu pleti, ktorá navyše dodá ďalšie výživné látky.",
    ],
    aftercareParagraphs: [
      "Bezprostredne po ošetrení je potrebné vystríhať sa akéhokoľvek kontaktu ošetrovanej oblasti a potencionálneho rizika infekcie - dotyky rukami, bozkávanie.",
      "Do 24 hodín po aplikácii nepoužívajte žiadny krém, make-up, púder a vyhnite sa intenzívnemu cvičeniu alebo stavom, ktoré môžu spôsobiť nadmerné potenie.",
      "72 hodín po aplikácii sa vyhnite infekčnému prostrediu (vírivky, bazény, sauny, deti a pod.), oxidačnému stresu (fajčenie, vlhké a nedobre odvetrané verejné prevádzky, napr. telocvične a pod.). Po aplikácii Jalupro je potrebné 7 dní sa vyhýbať slnku.",
      "Počas nasledujúcich 24 hodín sa vyhnite intenzívnemu cvičeniu alebo stavom, ktoré môžu spôsobiť nadmerné potenie. Prvú noc spite vo zvýšenej polohe, ak ste si aplikovali terapiu na oblasť pokožky a krku.",
      "Cez tvár by malo prejsť čo najviac vzduchu. Pite veľa vody a vyhýbajte sa alkoholu. To vás udrží hydratované a umožní epidermálnemu roztoku účinne pôsobiť na vašu pokožku.",
    ],
  },
  metadata: {},
}

export const dataJaluproClassic: ServiceItem = {
  slug: "jalupro-classic",
  name: "Jalupro classic (3ml)",
  summary: null,
  description: null,
  imageUrl: null,
  gallery: [
    { src: "/images/jalupro_classic.jpeg", alt: "Jalupro Classic aplikácia" },
  ],
  itemType: "service",
  category: "medical-cosmetics",
  subcategory: "jalupro",
  content: {
    paragraphs: [
      "pre mladšiu pokožku",
      "cieľová oblasť: tvár, krk, dekolt, okolie očí a telo",
      "zameriava sa na povrchovú vrstvu pokožky – epidermis",
      "rýchla hydratácia, prevencia stárnutia",
      "zloženie: aminokyseliny  (glycín, L-prolín, L-lyzín, L-leucín), kyselina hyalurónová 30 mg (nízkomolekulová)",
    ],
  },
  attributes: {},
  metadata: {},
}

export const dataJaluproHMW: ServiceItem = {
  slug: "jalupro-hmw",
  name: "Jalupro HMW",
  summary: null,
  description: null,
  imageUrl: null,
  gallery: [{ src: "/images/jalupro_hmw.jpeg", alt: "Jalupro HMW aplikácia" }],
  itemType: "service",
  category: "medical-cosmetics",
  subcategory: "jalupro",
  content: {
    paragraphs: [
      "pre zrelšiu pleť",
      "cieľová oblasť oše pery, okolie pier, tvár, krk a dekolt",
      "zameriava sa na strednú vrstvu pokožky – dermis",
      "zloženie:  aminokyseliny (glycín, L-prolín, L-lyzín, L-leucín), kyselina hyalurónová 20 mg (vysokomolekulová)",
    ],
  },
  attributes: {},
  metadata: {},
}

export const dataJaluproSuperHydro: ServiceItem = {
  slug: "jalupro-super-hydro",
  name: "Jalupro SuperHydro",
  summary:
    "Kolagén booster – bezkonkurenčné zloženie, tento produkt získal množstvo svetových ocenení",
  description: null,
  imageUrl: null,
  gallery: [
    {
      src: "/images/jalupro_super_hydro.jpeg",
      alt: "Jalupro Super Hydro aplikácia",
    },
  ],
  itemType: "service",
  category: "medical-cosmetics",
  subcategory: "jalupro",
  content: {
    topBullets: [
      "cieľová oblasť",
      "zabezpečuje aj povrchovú aj hĺbkovú hydratáciu, vyživuje až väzivové štruktúry",
      "aplikácia do tváre, krku, dekoltu, tela a chrbtov rúk.",
      "aplikuje sa injekčne do presne definovaných bodov na tvári alebo tele, z ktorých sa rovnomerne rozptýli do okolia",
    ],
    bottomBullets: [
      "až 80 mg kyseliny hyalurónovej – len v tomto výnimočnom produkte",
      "7 aminokyselín pre podporu tvorby kolagénu (glycín, prolín, lyzín, leucín, valín, alanín, arginín) a 3 peptidy pre obnovu buniek (acetyl decapeptid, oligopeptid 24, acetyl tetrapeptid 5)",
    ],
  },
  attributes: {},
  metadata: {},
}

export const dataJaluproYoungEye: ServiceItem = {
  slug: "jalupro-young-eye",
  name: "Jalupro Young eye",
  summary: null,
  description: null,
  imageUrl: null,
  gallery: [
    {
      src: "/images/jalupro_young_eye.jpeg",
      alt: "Jalupro Young Eye aplikácia",
    },
  ],
  itemType: "service",
  category: "medical-cosmetics",
  subcategory: "jalupro",
  content: {
    paragraphs: [
      "výnimočný kolagénový booster len na hydratáciu a spevnenie očného okolia",
      "zloženie: 7 aminokyselín, 3 peptidy a nízkomolekulová kyselina hyalurónová",
      "môže vzniknúť mierny edém po ošetrení, do 2 dní zmizne",
    ],
  },
  attributes: {},
  metadata: {},
}
