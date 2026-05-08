import type { Metadata } from "next";

export const SITE_URL = "https://beautyrescue.sk";
export const SITE_NAME = "Beauty Rescue Žilina";

export const DEFAULT_TITLE = "Kozmetický salón";
export const DEFAULT_DESCRIPTION =
  "Beauty Rescue je kozmetický salón v Žiline na Hájiku. Ponúkame kozmetické ošetrenia, chemický peeling, microneedling, Oxygeneo a lekársku kozmetiku.";

type SeoPage = {
  path: string;
  title: string;
  description: string;
};

export function absoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString();
}

export const OG_IMAGE_URL = absoluteUrl("/images/og-image.png");

export const seoPages = {
  home: {
    path: "/",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
  about: {
    path: "/onas",
    title: "O nás",
    description:
      "Spoznajte kozmetický salón Beauty Rescue v Žiline na Hájiku. Individuálny prístup, profesionálne ošetrenia pleti a príjemné prostredie.",
  },
  acupuncture: {
    path: "/lekarska_akupunktura",
    title: "Lekárska akupunktúra",
    description:
      "Lekárska akupunktúra v Beauty Rescue Žilina na Hájiku ako doplnková služba zameraná na individuálne potreby klienta.",
  },
  chemicalPeeling: {
    path: "/kozmetika/chemicky_peeling",
    title: "Chemický peeling",
    description:
      "Profesionálny chemický peeling v salóne Beauty Rescue na Hájiku v Žiline. Ošetrenie pre rozjasnenie, vyhladenie a obnovu pleti.",
  },
  diamondMicrodermabrasion: {
    path: "/kozmetika/diamantova_mikrodermabrazia",
    title: "Diamantová mikrodermabrázia",
    description:
      "Diamantová mikrodermabrázia v Beauty Rescue Žilina na Hájiku pomáha jemne vyhladiť pleť, zlepšiť jej vzhľad a podporiť svieži pocit.",
  },
  mezoterapia: {
    path: "/kozmetika/mezoterapia",
    title: "Mezoterapia",
    description:
      "Mezoterapia v kozmetickom salóne Beauty Rescue Žilina na Hájiku pre intenzívnu starostlivosť o pleť podľa jej potrieb.",
  },
  mezoterapiaInvasive: {
    path: "/kozmetika/mezoterapia/invazivna",
    title: "Invazívna mezoterapia",
    description:
      "Invazívna mezoterapia v Beauty Rescue Žilina na Hájiku pre cielenú profesionálnu starostlivosť o pleť a jej regeneráciu.",
  },
  mezoterapiaNonInvasive: {
    path: "/kozmetika/mezoterapia/neinvazivna",
    title: "Neinvazívna mezoterapia",
    description:
      "Neinvazívna mezoterapia v Beauty Rescue Žilina na Hájiku pre šetrnú starostlivosť o pleť bez ihiel a s dôrazom na komfort klienta.",
  },
  microneedling: {
    path: "/kozmetika/microneedling",
    title: "Microneedling",
    description:
      "Microneedling a dermapen v kozmetickom salóne Beauty Rescue Žilina na Hájiku pre podporu regenerácie, spevnenia a obnovy pleti.",
  },
  tkn: {
    path: "/kozmetika/microneedling/tkn",
    title: "TKN ošetrenia",
    description:
      "TKN ošetrenia pri microneedlingu v Beauty Rescue Žilina na Hájiku pre profesionálnu a cielenú starostlivosť o pleť.",
  },
  oxygeneo: {
    path: "/kozmetika/oxygeneo",
    title: "Oxygeneo",
    description:
      "Oxygeneo ošetrenie v Beauty Rescue Žilina na Hájiku pre rozžiarenú, sviežu a hydratovanú pleť s príjemným kozmetickým zážitkom.",
  },
  biokompatibilneNite: {
    path: "/lekarska_kozmetika/biokompatibilne_nite",
    title: "Biokompatibilné nite",
    description:
      "Biokompatibilné nite v Beauty Rescue Žilina na Hájiku v rámci lekárskej kozmetiky pre spevnenie a omladenie vzhľadu pleti.",
  },
  botulotoxin: {
    path: "/lekarska_kozmetika/botulotoxin",
    title: "Botulotoxín",
    description:
      "Botulotoxín v Beauty Rescue Žilina na Hájiku v rámci lekárskej kozmetiky so zameraním na prirodzený a profesionálny výsledok.",
  },
  botulotoxinPotenie: {
    path: "/lekarska_kozmetika/botulotoxin/potenie",
    title: "Botulotoxín pri nadmernom potení",
    description:
      "Ošetrenie nadmerného potenia botulotoxínom v Beauty Rescue Žilina na Hájiku v rámci služieb lekárskej kozmetiky.",
  },
  botulotoxinVrasky: {
    path: "/lekarska_kozmetika/botulotoxin/vrasky",
    title: "Botulotoxín na vrásky",
    description:
      "Botulotoxín na vrásky v Beauty Rescue Žilina na Hájiku pre jemnejší, oddýchnutejší a prirodzenejší vzhľad.",
  },
  jalupro: {
    path: "/lekarska_kozmetika/jalupro",
    title: "Jalupro",
    description:
      "Jalupro ošetrenia v Beauty Rescue Žilina na Hájiku pre hydratáciu, regeneráciu a revitalizáciu pleti v rámci lekárskej kozmetiky.",
  },
  jaluproClassic: {
    path: "/lekarska_kozmetika/jalupro/classic",
    title: "Jalupro Classic",
    description:
      "Jalupro Classic v Beauty Rescue Žilina na Hájiku pre profesionálne ošetrenie pleti so zameraním na hydratáciu a regeneráciu.",
  },
  jaluproHmw: {
    path: "/lekarska_kozmetika/jalupro/hmw",
    title: "Jalupro HMW",
    description:
      "Jalupro HMW v Beauty Rescue Žilina na Hájiku v rámci lekárskej kozmetiky pre intenzívnejšiu starostlivosť o zrelšiu pleť.",
  },
  jaluproSuperHydro: {
    path: "/lekarska_kozmetika/jalupro/super_hydro",
    title: "Jalupro Super Hydro",
    description:
      "Jalupro Super Hydro v Beauty Rescue Žilina na Hájiku pre hĺbkovú hydratáciu, sviežosť a podporu kvality pleti.",
  },
  jaluproYoungEye: {
    path: "/lekarska_kozmetika/jalupro/young_eye",
    title: "Jalupro Young Eye",
    description:
      "Jalupro Young Eye v Beauty Rescue Žilina na Hájiku pre starostlivosť o očné okolie, hydratáciu a sviežejší vzhľad.",
  },
  kyselinaHyaluronova: {
    path: "/lekarska_kozmetika/kyselina_hyaluronova",
    title: "Kyselina hyalurónová",
    description:
      "Kyselina hyalurónová v Beauty Rescue Žilina na Hájiku v rámci lekárskej kozmetiky pre doplnenie objemu a prirodzený vzhľad.",
  },
  kyselinaHyaluronovaFace: {
    path: "/lekarska_kozmetika/kyselina_hyaluronova/tvar",
    title: "Kyselina hyalurónová na tvár",
    description:
      "Ošetrenie kyselinou hyalurónovou na tvár v Beauty Rescue Žilina na Hájiku pre sviežejší vzhľad a prirodzené zvýraznenie kontúr.",
  },
  kyselinaHyaluronovaLips: {
    path: "/lekarska_kozmetika/kyselina_hyaluronova/pery",
    title: "Kyselina hyalurónová na pery",
    description:
      "Kyselina hyalurónová na pery v Beauty Rescue Žilina na Hájiku pre prirodzené zvýraznenie, hydratáciu a úpravu tvaru pier.",
  },
  profhilo: {
    path: "/lekarska_kozmetika/profhilo",
    title: "Profhilo",
    description:
      "Profhilo ošetrenie v Beauty Rescue Žilina na Hájiku pre hydratáciu, spevnenie a podporu kvality pleti v rámci lekárskej kozmetiky.",
  },
  pricing: {
    path: "/cennik",
    title: "Cenník kozmetických služieb",
    description:
      "Pozrite si cenník služieb Beauty Rescue v Žiline na Hájiku. Kozmetika, chemický peeling, microneedling, Oxygeneo a lekárska kozmetika.",
  },
  promotion: {
    path: "/novinky",
    title: "Novinky",
    description:
      "Aktuálne novinky, informácie a ponuky kozmetického salónu Beauty Rescue v Žiline na Hájiku.",
  },
} satisfies Record<string, SeoPage>;

export type SeoPageKey = keyof typeof seoPages;

export const publicSeoPages = Object.values(seoPages);

export function createPageMetadata(key: SeoPageKey): Metadata {
  const page = seoPages[key];
  const url = absoluteUrl(page.path);

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: page.title,
      description: page.description,
      url,
      siteName: SITE_NAME,
      locale: "sk_SK",
      type: "website",
      images: [
        {
          url: OG_IMAGE_URL,
          width: 1200,
          height: 630,
          alt: SITE_NAME,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [OG_IMAGE_URL],
    },
  };
}

export function createDynamicPageMetadata({
  title,
  description,
  path,
}: SeoPage): Metadata {
  const url = absoluteUrl(path);

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: "sk_SK",
      type: "website",
      images: [
        {
          url: OG_IMAGE_URL,
          width: 1200,
          height: 630,
          alt: SITE_NAME,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE_URL],
    },
  };
}
