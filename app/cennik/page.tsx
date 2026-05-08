import PricingMain from "../_components/pricing/PricingMain";
import { getServicesBySlugs } from "../_lib/data_services_all/data_services";
import { createPageMetadata } from "../_lib/seo";

export const metadata = createPageMetadata("pricing");

const pricingServiceSlugs = [
  "chemical-peeling",
  "diamond-microdermabrasion",
  "oxygeneo",
  "mezoterapia-non-invasive",
  "mezoterapia-invasive",
  "botulotoxin",
  "kyselina-hyaluronova",
  "biokompatibilne-nite",
  "profhilo",
  "acupuncture",
  "microneedling",
];

export default async function Page() {
  const [
    chemicalPeelingData,
    diamondMicrodermabraziaData,
    oxygeneoData,
    mezoterapiaNonInvasiveData,
    mezoterapiaInvasiveData,
    botulotoxinData,
    kyselinaHyaluronovaData,
    biokompatibilneNiteData,
    profhiloData,
    acupunctureData,
    microneedlingData,
  ] = await getServicesBySlugs(pricingServiceSlugs);

  return (
    <PricingMain
      chemicalPeelingData={chemicalPeelingData}
      diamondMicrodermabraziaData={diamondMicrodermabraziaData}
      oxygeneoData={oxygeneoData}
      mezoterapiaNonInvasiveData={mezoterapiaNonInvasiveData}
      mezoterapiaInvasiveData={mezoterapiaInvasiveData}
      botulotoxinData={botulotoxinData}
      kyselinaHyaluronovaData={kyselinaHyaluronovaData}
      biokompatibilneNiteData={biokompatibilneNiteData}
      profhiloData={profhiloData}
      acupunctureData={acupunctureData}
      microneedlingData={microneedlingData}
    />
  );
}
