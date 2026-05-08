import type { Metadata } from "next";

export const SITE_URL = "https://beautyrescue.sk";
export const SITE_NAME = "Beauty Rescue Žilina";
export const DEFAULT_TITLE = "Beauty Rescue Žilina – kozmetický salón";
export const DEFAULT_DESCRIPTION =
  "Kozmetický salón Beauty Rescue v Žiline (Hájik). Kozmetika, chemický peeling, microneedling a ďalšie služby.";

type SeoPage = {
  path: string;
  title: string;
  description: string;
};

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
      "Beauty Rescue je kozmetický salón v Žiline na Hájiku so zameraním na kozmetiku, ošetrenia pleti a individuálny prístup.",
  },
  acupuncture: {
    path: "/lekarska_akupunktura",
    title: "Lekárska akupunktúra",
    description:
      "Lekárska akupunktúra v Beauty Rescue Žilina na Hájiku ako doplnková služba pre individuálne potreby klientov.",
  },
  chemicalPeeling: {
    path: "/kozmetika/chemicky_peeling",
    title: "Chemický peeling",
    description:
      "Chemický peeling v kozmetickom salóne Beauty Rescue v Žiline na Hájiku pre profesionálne ošetrenie pleti.",
  },
  diamondMicrodermabrasion: {
    path: "/kozmetika/diamantova_mikrodermabrazia",
    title: "Diamantová mikrodermabrázia",
    description:
      "Diamantová mikrodermabrázia v Beauty Rescue Žilina na Hájiku pre kozmetické ošetrenie a zjemnenie pleti.",
  },
  mezoterapia: {
    path: "/kozmetika/mezoterapia",
    title: "Mezoterapia",
    description:
      "Mezoterapia v kozmetickom salóne Beauty Rescue v Žiline na Hájiku pre starostlivosť o pleť.",
  },
  mezoterapiaInvasive: {
    path: "/kozmetika/mezoterapia/invazivna",
    title: "Invazívna mezoterapia",
    description:
      "Invazívna mezoterapia v Beauty Rescue Žilina na Hájiku ako profesionálne kozmetické ošetrenie pleti.",
  },
  mezoterapiaNonInvasive: {
    path: "/kozmetika/mezoterapia/neinvazivna",
    title: "Neinvazívna mezoterapia",
    description:
      "Neinvazívna mezoterapia v Beauty Rescue Žilina na Hájiku pre kozmetickú starostlivosť o pleť.",
  },
  microneedling: {
    path: "/kozmetika/microneedling",
    title: "Microneedling",
    description:
      "Microneedling a dermapen v kozmetickom salóne Beauty Rescue v Žiline na Hájiku.",
  },
  tkn: {
    path: "/kozmetika/microneedling/tkn",
    title: "TKN ošetrenia",
    description:
      "TKN ošetrenia pri microneedlingu v Beauty Rescue Žilina na Hájiku pre profesionálnu starostlivosť o pleť.",
  },
  oxygeneo: {
    path: "/kozmetika/oxygeneo",
    title: "Oxygeneo",
    description:
      "Oxygeneo ošetrenie v kozmetickom salóne Beauty Rescue v Žiline na Hájiku.",
  },
  biokompatibilneNite: {
    path: "/lekarska_kozmetika/biokompatibilne_nite",
    title: "Biokompatibilné nite",
    description:
      "Biokompatibilné nite v Beauty Rescue Žilina na Hájiku v rámci služieb lekárskej kozmetiky.",
  },
  botulotoxin: {
    path: "/lekarska_kozmetika/botulotoxin",
    title: "Botulotoxín",
    description:
      "Botulotoxín v Beauty Rescue Žilina na Hájiku v rámci služieb lekárskej kozmetiky.",
  },
  botulotoxinPotenie: {
    path: "/lekarska_kozmetika/botulotoxin/potenie",
    title: "Botulotoxín pri nadmernom potení",
    description:
      "Botulotoxín pri nadmernom potení v Beauty Rescue Žilina na Hájiku.",
  },
  botulotoxinVrasky: {
    path: "/lekarska_kozmetika/botulotoxin/vrasky",
    title: "Botulotoxín na vrásky",
    description:
      "Botulotoxín na vrásky v Beauty Rescue Žilina na Hájiku v rámci lekárskej kozmetiky.",
  },
  jalupro: {
    path: "/lekarska_kozmetika/jalupro",
    title: "Jalupro",
    description:
      "Jalupro ošetrenia v Beauty Rescue Žilina na Hájiku v rámci služieb lekárskej kozmetiky.",
  },
  jaluproClassic: {
    path: "/lekarska_kozmetika/jalupro/classic",
    title: "Jalupro Classic",
    description:
      "Jalupro Classic v Beauty Rescue Žilina na Hájiku pre profesionálne ošetrenie pleti.",
  },
  jaluproHmw: {
    path: "/lekarska_kozmetika/jalupro/hmw",
    title: "Jalupro HMW",
    description:
      "Jalupro HMW v Beauty Rescue Žilina na Hájiku v rámci lekárskej kozmetiky.",
  },
  jaluproSuperHydro: {
    path: "/lekarska_kozmetika/jalupro/super_hydro",
    title: "Jalupro Super Hydro",
    description:
      "Jalupro Super Hydro v Beauty Rescue Žilina na Hájiku pre kozmetickú starostlivosť o pleť.",
  },
  jaluproYoungEye: {
    path: "/lekarska_kozmetika/jalupro/young_eye",
    title: "Jalupro Young Eye",
    description:
      "Jalupro Young Eye v Beauty Rescue Žilina na Hájiku pre starostlivosť o očné okolie.",
  },
  kyselinaHyaluronova: {
    path: "/lekarska_kozmetika/kyselina_hyaluronova",
    title: "Kyselina hyalurónová",
    description:
      "Kyselina hyalurónová v Beauty Rescue Žilina na Hájiku v rámci služieb lekárskej kozmetiky.",
  },
  kyselinaHyaluronovaFace: {
    path: "/lekarska_kozmetika/kyselina_hyaluronova/tvar",
    title: "Kyselina hyalurónová na tvár",
    description:
      "Kyselina hyalurónová na tvár v Beauty Rescue Žilina na Hájiku.",
  },
  kyselinaHyaluronovaLips: {
    path: "/lekarska_kozmetika/kyselina_hyaluronova/pery",
    title: "Kyselina hyalurónová na pery",
    description:
      "Kyselina hyalurónová na pery v Beauty Rescue Žilina na Hájiku.",
  },
  profhilo: {
    path: "/lekarska_kozmetika/profhilo",
    title: "Profhilo",
    description:
      "Profhilo ošetrenie v Beauty Rescue Žilina na Hájiku v rámci lekárskej kozmetiky.",
  },
  pricing: {
    path: "/cennik",
    title: "Cenník",
    description:
      "Cenník kozmetických služieb Beauty Rescue v Žiline na Hájiku vrátane kozmetiky, microneedlingu a lekárskej kozmetiky.",
  },
  promotion: {
    path: "/novinky",
    title: "Novinky",
    description:
      "Novinky a aktuálne informácie kozmetického salónu Beauty Rescue v Žiline na Hájiku.",
  },
} satisfies Record<string, SeoPage>;

export type SeoPageKey = keyof typeof seoPages;

export const publicSeoPages = Object.values(seoPages);

export function absoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString();
}

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
    },
    twitter: {
      card: "summary",
      title: page.title,
      description: page.description,
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
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}
