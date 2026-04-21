import PricingMain from "../_components/pricing/PricingMain";
import getServiceBySlug from "../_lib/data_services_all/data_services";

export default async function Page() {
  const [
    chemicalPeelingData,
    oxygeneoData,
    mezoterapiaNonInvasiveData,
    mezoterapiaInvasiveData,
    botulotoxinData,
    kyselinaHyaluronovaData,
    biokompatibilneNiteData,
    profhiloData,
    acupunctureData,
  ] = await Promise.all([
    getServiceBySlug("chemical-peeling"),
    getServiceBySlug("oxygeneo"),
    getServiceBySlug("mezoterapia-non-invasive"),
    getServiceBySlug("mezoterapia-invasive"),
    getServiceBySlug("botulotoxin"),
    getServiceBySlug("kyselina-hyaluronova"),
    getServiceBySlug("biokompatibilne-nite"),
    getServiceBySlug("profhilo"),
    getServiceBySlug("acupuncture"),
  ]);

  return (
    <PricingMain
      chemicalPeelingData={chemicalPeelingData}
      oxygeneoData={oxygeneoData}
      mezoterapiaNonInvasiveData={mezoterapiaNonInvasiveData}
      mezoterapiaInvasiveData={mezoterapiaInvasiveData}
      botulotoxinData={botulotoxinData}
      kyselinaHyaluronovaData={kyselinaHyaluronovaData}
      biokompatibilneNiteData={biokompatibilneNiteData}
      profhiloData={profhiloData}
      acupunctureData={acupunctureData}
    />
  );
}
