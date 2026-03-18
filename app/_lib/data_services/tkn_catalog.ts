export type TknProduct = {
  slug: string
  name: string
  summary: string
  details: string
  indications: string[]
}

export type TknCategory = {
  slug: string
  name: string
  description: string
  intro: string
  products: TknProduct[]
}

export const tknCategories: TknCategory[] = [
  {
    slug: "hyaluronic-acids",
    name: "TKN Advanced Hyaluronic Acids",
    description:
      "Hydratácia, biorevitalizácia a spevnenie pleti pri dehydratácii a vráskach.",
    intro:
      "Kyselina hyalurónová je telu vlastná látka s vysokou schopnosťou viazať vodu. Podporuje syntézu kolagénu, elasticitu pokožky a prevenciu vrások.",
    products: [
      {
        slug: "hyaluronova-volna-nesietovana",
        name: "Kyselina hyalurónová – nesieťovaná/voľná",
        summary:
          "Určená na povrchové ošetrenia pleti, rôzne koncentrovaná a obohatená o peptidy, biorevitalizéry, vitamíny, minerály a koenzýmy.",
        details:
          "Podľa koncentrácie pomáha pri hydratácii, prevencii vrások a zlepšení elasticity. Vhodná ako základ pre cielené kombinácie podľa kozmetickej indikácie.",
        indications: ["povrchové ošetrenia", "hydratácia", "prevencia vrások"],
      },
      {
        slug: "adjuvans-3-5",
        name: "Kyselina hyalurónová – adjuvans 3,5 %",
        summary:
          "Roztok pre hydratačný, revitalizačný a omladzujúci účinok, vhodný aj ako základ pre individuálne sérum na mieru.",
        details:
          "Samotným preparátom sa dosahuje vysoká hydratácia a anti-ageing efekt, najmä pri strate objemu pokožky. Ideálny na kombináciu s monodózami podľa indikácie (suchá/mastná pleť, rozšírené póry, pigmentácie, akné, jazvy po akné).",
        indications: [
          "dehydratovaná pleť",
          "strata objemu",
          "začínajúce vrásky",
        ],
      },
      {
        slug: "ha-mw-2",
        name: "TKN HA MW 2%",
        summary:
          "Kyselina hyalurónová so strednou molekulovou hmotnosťou 1300 – 1500 kDa pre dlhodobú hydratáciu a spevnenie.",
        details:
          "Biorevitalizuje povrchové aj stredné vrstvy pokožky. Pomáha pri dehydratácii, povrchových vráskach, striách a stopách po akné.",
        indications: [
          "dehydratovaná pokožka",
          "povrchové vrásky",
          "strie",
          "stopy po akné",
        ],
      },
      {
        slug: "ha-xs-2",
        name: "TKN HA XS 2%",
        summary:
          "Kyselina hyalurónová s nízkou molekulovou hmotnosťou 100 kDa pre hydratáciu a spevnenie hlbších vrstiev pokožky.",
        details:
          "Silný hydratačný biorevitalizér určený pre výraznejšie vrásky, kontúry a nerovnomerný reliéf pleti.",
        indications: [
          "dehydratovaná pokožka",
          "výrazné vrásky a kontúry",
          "nerovnomerný reliéf",
        ],
      },
      {
        slug: "ha-glowcomplex",
        name: "TKN HA Glowcomplex",
        summary:
          "Regeneračný rozžiarujúci komplex kyseliny hyalurónovej, 9 vitamínov, 5 aminokyselín, Sodium DNA, DMAE a minerálnych solí.",
        details:
          "Zlepšuje vzhľad pleti okamžitým rozžiarením a antioxidačným efektom. Vhodný pre unavenú a mdlú pleť.",
        indications: ["matná pleť", "unavená pleť", "oxidačný stres"],
      },
      {
        slug: "ha-oligovit",
        name: "TKN HA Oligovit",
        summary:
          "Obnovujúci a normalizujúci komplex kyseliny hyalurónovej, 8 vitamínov, organického kremíka a 3 minerálnych solí.",
        details:
          "Určený pre mastnú pleť so sklonom k akné. Zlepšuje vzhľad pleti okamžitým antioxidačným a normalizujúcim efektom.",
        indications: [
          "mastná pleť",
          "pleť so sklonom k akné",
          "nevyvážená tvorba mazu",
        ],
      },
    ],
  },
  {
    slug: "cpr-complexes",
    name: "Koncentrované komplexy CPR",
    description:
      "Špecializované polyrevitalizačné AHA komplexy pre pleť, očné okolie aj vlasy.",
    intro:
      "Koncentrované komplexy s vysokým obsahom aktívnych látok pre cielené ošetrenia textúry, elasticity, pigmentácií a vlasovej vitality.",
    products: [
      {
        slug: "hcpr",
        name: "HCPR",
        summary:
          "Polyrevitalizačný vlasový komplex so zosilňujúcim a zhutňujúcim efektom pre vlasové korienky.",
        details:
          "Obsahuje 14 vitamínov, 23 aminokyselín, 4 rastové faktory, 5 nukleových kyselín, 1 reductor agent, 4 koenzýmy a 3 minerály. Pomáha pri prevencii padania vlasov.",
        indications: ["padanie vlasov", "oslabené korienky", "rednúce vlasy"],
      },
      {
        slug: "rcpr",
        name: "RCPR",
        summary:
          "Refine Complex Poli Revitalising a AHA so silným a dlhotrvajúcim zjemňujúcim efektom.",
        details:
          "Obsahuje 14 vitamínov, 23 aminokyselín, 5 rastových faktorov, 5 nukleových kyselín, 1 reductor agent, 5 koenzýmov a 3 minerály. Redukuje rozšírené póry, vrásky a post-akné jazvičky.",
        indications: ["rozšírené póry", "post-akné jazvičky", "jemné vrásky"],
      },
      {
        slug: "ncpr",
        name: "NCPR",
        summary:
          "Nutritive Complex Poli Revitalising a AHA pre hĺbkový zvláčňujúci efekt a zdravší vzhľad kože.",
        details:
          "Obsahuje 14 vitamínov, 23 aminokyselín, 3 nukleové kyseliny, 2 reductor agenty, 5 koenzýmov a 4 minerály. Zlepšuje kožnú elasticitu.",
        indications: ["suchá pleť", "dehydratácia", "znížená elasticita"],
      },
      {
        slug: "ecpr",
        name: "ECPR",
        summary:
          "Výživový komplex pre očné okolie s vitamínom C, peptidmi, extraktmi a kyselinou hyalurónovou.",
        details:
          "Redukuje známky starnutia očného okolia, vačky, kruhy a jemné vrásky pod očami.",
        indications: [
          "očné okolie",
          "vačky",
          "kruhy pod očami",
          "jemné vrásky",
        ],
      },
      {
        slug: "wcpr",
        name: "WCPR",
        summary:
          "Rozjasňujúci revitalizačný komplex na korekciu škvŕn a zjednotenie tónu pleti.",
        details:
          "Obsahuje 2 extrakty, 2 rastové faktory, 2 vitamíny, 1 reduktor agent a alfa-arbutín. Má antioxidačný efekt.",
        indications: ["pigmentácie", "nerovnomerný tón", "matná pleť"],
      },
    ],
  },
  {
    slug: "cocktails",
    name: "TKN Cocktails",
    description:
      "Predpripravené koktejly pre rýchle a cielené riešenie špecifických potrieb pleti.",
    intro:
      "Hotové koktejly s výberom aktívnych ingrediencií predstavujú jednoduchú a efektívnu cestu cieleného ošetrenia.",
    products: [
      {
        slug: "antiaging-cocktail",
        name: "Antiaging Cocktail",
        summary:
          "Obsahuje HYA, Acetyl Hexapeptid-8, DMAE, Pyruvate a L-Carnitine pre terapiu pokročilých a hlbokých vrások.",
        details:
          "Určený pre ochabnutú pleť so silným zvlhčovacím a rejuvenizačným efektom.",
        indications: ["pokročilé vrásky", "hlboké vrásky", "ochabnutá pleť"],
      },
      {
        slug: "mesolift-cocktail",
        name: "Mesolift Cocktail",
        summary:
          "Obsahuje HYA, Sodium DNA, organický kremík a DMAE pre terapiu miernych až stredných vrások.",
        details:
          "Pôsobí ako prevencia starnutia pleti tváre a podpora pevnosti pri ochabnutí.",
        indications: ["mierne vrásky", "stredné vrásky", "prevencia starnutia"],
      },
      {
        slug: "anti-pollution-cocktail",
        name: "Anti-pollution Cocktail",
        summary:
          "Obsahuje GFC5+, Niacinamide, HYA, rastlinné extrakty, Folic Acid, Glutathion a vitamín C.",
        details:
          "Zvyšuje obranyschopnosť pokožky vystavenej znečistenému prostrediu (dym, smog, UV) a pôsobí ako prevencia photo-ageingu.",
        indications: ["oxidačný stres", "mestské prostredie", "photo-ageing"],
      },
      {
        slug: "purifying-cocktail",
        name: "Purifying Cocktail",
        summary:
          "Obsahuje rastlinné extrakty, Panthenol, Glycosaminoglycans a Methionine pre mastiacu sa pleť.",
        details:
          "Určený pre pleť so sklonom k akné, seborei a komedónom. Udržiava balans tvorby mazu a redukuje akné lézie.",
        indications: ["mastiaca sa pleť", "akné", "seborea", "komedóny"],
      },
      {
        slug: "radiance-cocktail",
        name: "Radiance Cocktail",
        summary:
          "Obsahuje Glutathione, Superoxid Dismutase, extrakty a Folic Acid pre rozjasnenie tónu pleti.",
        details:
          "Určený pre matnú pleť so sklonom k dyschrómiám a nerovnomernej pigmentácii.",
        indications: ["matná pleť", "dyschrómie", "nerovnomerná pigmentácia"],
      },
    ],
  },
  {
    slug: "monodozy",
    name: "TKN Monodózy",
    description:
      "Farmaceutické koncentráty na individuálne miešanie podľa protokolu a potrieb klientky.",
    intro:
      "Vysokokoncentrované účinné látky určené na mezoterapiu, vhodné na kombináciu s kyselinou hyalurónovou podľa individuálnej indikácie.",
    products: [
      {
        slug: "dimenyl-dmae",
        name: "DIMENYL (DMAE)",
        summary:
          "Látka s tonizačným, liftingovým, spevňujúcim a anti-ageing efektom viditeľným už po 20-30 minútach.",
        details:
          "DMAE sa prirodzene vyskytuje v ľudskom tele (najmä mozog) aj v niektorých rybách. Podporuje tonus a pevnosť pokožky.",
        indications: ["ochabnutá pleť", "strata tonusu", "lifting"],
      },
      {
        slug: "dm-silk",
        name: "DM-SILK",
        summary:
          "Zmes organického kremíka a DMAE pre spevnenie pokožky a podporu jej jasu.",
        details:
          "Organický kremík stimuluje syntézu kolagénu a elastínu a reguluje hydratáciu. V kombinácii s DMAE zlepšuje pevnosť.",
        indications: ["strata pevnosti", "pokles elasticity", "dehydratácia"],
      },
      {
        slug: "idebenyl-tight",
        name: "IDEBENYL TIGHT",
        summary:
          "Zmes DMAE a koenzýmu Q10 s antioxidačným a spevňujúcim efektom.",
        details:
          "Vhodné najmä pre suchú pleť. Koenzým Q10 pomáha chrániť bunky pred oxidačným poškodením.",
        indications: ["suchá pleť", "oxidačný stres", "spevnenie"],
      },
      {
        slug: "lumicen",
        name: "LUMICEN",
        summary:
          "Sodium DNA biostimulant podporujúci rýchlu obnovu buniek, mikrocirkuláciu a regeneráciu tkaniva.",
        details:
          "Nukleotidový komplex získaný z lososa podporuje fibroblasty, obnovu kolagénu/elastínu a má antioxidačný efekt.",
        indications: ["unavená pleť", "regenerácia", "suchá opálená pleť"],
      },
      {
        slug: "lumicen-gel",
        name: "LUMICEN GEL",
        summary:
          "Highly polymerised forma LUMICEN zameraná viac na photo-ageing a chronické starnutie.",
        details:
          "V porovnaní s LUMICEN je orientovaná výraznejšie na fotostarnutie a dlhodobé známky starnutia pleti.",
        indications: ["photo-ageing", "chronické starnutie", "obnova pleti"],
      },
      {
        slug: "silicor",
        name: "SILICOR",
        summary:
          "Organický kremík podporujúci syntézu endogénneho kolagénu a elastínu.",
        details:
          "Vhodný pri potrebe spevnenia a obnovy kožnej opory, najmä pri strate pružnosti a pevnosti.",
        indications: ["strata elasticity", "podpora kolagénu", "spevnenie"],
      },
      {
        slug: "tauricol",
        name: "TAURICOL",
        summary: "Taurín s výrazným antioxidačným účinkom.",
        details:
          "Pomáha redukovať negatívne vplyvy voľných radikálov a environmentálneho stresu.",
        indications: ["oxidačný stres", "unavená pleť", "prevencia starnutia"],
      },
      {
        slug: "glutamax-c",
        name: "GLUTAMAX C",
        summary:
          "Glutathione a vitamín C na ochranu buniek pred oxidačným stresom.",
        details:
          "Podpora antioxidačnej ochrany pri exogénnom aj endogénnom strese (smog, fajčenie, UV, nedostatok spánku, starnutie).",
        indications: [
          "oxidačný stres",
          "matná pleť",
          "environmentálne zaťaženie",
        ],
      },
      {
        slug: "cofinet",
        name: "COFINET",
        summary: "Kofeín so silným nabudzujúcim a lipolytickým účinkom.",
        details:
          "Určený na ochabnutú pleť a oblasti so zväčšenými tukovými bunkami. Podporuje prekrvenie a regeneračné procesy.",
        indications: [
          "ochabnutá pleť",
          "lokálne tukové bunky",
          "kozmetická celulitída",
        ],
      },
      {
        slug: "saliforo",
        name: "SALIFORO",
        summary:
          "Kyselina salicylová s exfoliatívnym a keratolytickým efektom.",
        details:
          "Pomáha pri zjemnení povrchu pleti, redukcii nerovností a vyčistení problematickej pokožky.",
        indications: ["nerovnomerný povrch", "mastná pleť", "upchaté póry"],
      },
      {
        slug: "asiacen",
        name: "ASIACEN",
        summary:
          "Komplex Centella asiatica, Fucus vesiculosus a Hedera helix pre odvodnenie a podporu obnovy pokožky.",
        details:
          "Stimuluje opravu a regeneráciu tkaniva a prispieva k sviežejšiemu vzhľadu pleti.",
        indications: ["opuchy", "potreba regenerácie", "unavená pleť"],
      },
      {
        slug: "thrinamide",
        name: "THRINAMIDE",
        summary:
          "Vitamíny B1, B2, B6 a provitamín B5 (panthenol) na regeneráciu a upokojenie.",
        details:
          "Podporuje obnovu buniek, má protizápalový efekt a zvyšuje odolnosť vlasov.",
        indications: ["podráždená pokožka", "regenerácia", "vlasová podpora"],
      },
      {
        slug: "b-hidroxin",
        name: "B-HIDROXIN",
        summary:
          "Biotínová vlasová spevňujúca kúra na udržanie vlasov v dobrej kondícii.",
        details:
          "Podporuje kvalitu vlasov a ich celkovú vitalitu pri oslabení.",
        indications: [
          "oslabené vlasy",
          "vlasová vitalita",
          "podpora kondície vlasov",
        ],
      },
      {
        slug: "polivitamin-bcae",
        name: "POLIVITAMIN BCAE",
        summary:
          "Vitamín A, E, C a B complex s revitalizačným a antioxidačným účinkom.",
        details:
          "Multivitamínový koncentrát na zlepšenie vzhľadu pokožky a celkovej vitality.",
        indications: [
          "revitalizácia pleti",
          "antioxidačná ochrana",
          "unavená pleť",
        ],
      },
    ],
  },
]

export function getTknCategory(categorySlug: string) {
  return tknCategories.find((category) => category.slug === categorySlug)
}

export function getTknProduct(categorySlug: string, productSlug: string) {
  const category = getTknCategory(categorySlug)

  if (!category) {
    return null
  }

  const product = category.products.find((item) => item.slug === productSlug)

  if (!product) {
    return null
  }

  return { category, product }
}
