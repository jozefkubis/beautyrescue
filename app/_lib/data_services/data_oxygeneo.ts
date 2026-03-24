import type { ServiceItem } from "./data_services.types"

export const dataOxygeneo: ServiceItem = {
  slug: "oxygeneo",
  name: "Oxygeneo – okysličenie pleti",
  summary: null,
  description: null,
  imageUrl: null,
  gallery: [],
  itemType: "service",
  category: "cosmetics",
  subcategory: "oxygeneo",
  content: {
    intro:
      "Okysličenie pleti zlepšuje bunkový rast a bunkovú biosyntézu, stimuluje proliferáciu fibroblastov a diferenciáciu keratinocytov.. osvieži/oživí",
    description:
      "Oxygeneo je neinvazívne kozmetické ošetrenie, ktoré dodá pleti kyslík jedinečným spôsobom, využíva totiž Bohrov efekt (závislosť saturácie hemoglobínu kyslíkom od koncentrácie CO2 , pH a teploty tkanív) – prekysličuje pleť zvnútra.",
    stepsTitle: "Ošetrenie prebieha v niekoľkých náväzných krokoch:",
    steps: [
      "exfoliácia odumretých buniek,",
      "infúzia aktívnych látok do pleti prostredníctvo 2 typov gélov – NeoRevive (pre suchšiu pleť a omladenie) alebo NeoBright (pre mastnejšiu pleť a rozjasnenie),",
      "rádiofrekvencia (spolu s exfoliáciou podnecuje fibroblasty ku kolagenoneogenéze).",
    ],
    result:
      "Výsledkom je jemnejšia a svieža dokysličená dovýživená pleť, zmiernenie unavených vačkov pod očami, redukcia farebných nejednotností a rozšírených pórov.",
  },
  attributes: {},
  metadata: {
    citationLabel: "čítajte viac na:",
    citationUrl: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5774907/",
  },
}
