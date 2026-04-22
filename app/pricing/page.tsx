import PricingMain from "../_components/pricing/PricingMain";
import getServiceBySlug from "../_lib/data_services_all/data_services";

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
  ] = await Promise.all([
    getServiceBySlug("chemical-peeling"),
    getServiceBySlug("diamond-microdermabrasion"),
    getServiceBySlug("oxygeneo"),
    getServiceBySlug("mezoterapia-non-invasive"),
    getServiceBySlug("mezoterapia-invasive"),
    getServiceBySlug("botulotoxin"),
    getServiceBySlug("kyselina-hyaluronova"),
    getServiceBySlug("biokompatibilne-nite"),
    getServiceBySlug("profhilo"),
    getServiceBySlug("acupuncture"),
    getServiceBySlug("microneedling"),
  ]);

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
