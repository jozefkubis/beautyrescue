import PricingMain from "../_components/pricing/PricingMain"
import getAcupuncture from "../_lib/data_services/data_acupuncture"
import getBiokompatibilneNite from "../_lib/data_services/data_biokompatibilne_nite"
import { getBotulotoxin } from "../_lib/data_services/data_botulotoxin"
import getChemicalPeeling from "../_lib/data_services/data_chemical_peeling"
import { getKyselinaHyaluronova } from "../_lib/data_services/data_kyselina_hyaluronova"
import {
  getMezoterapiaInvasive,
  getMezoterapiaNonInvasive,
} from "../_lib/data_services/data_mezoterapia"
import getOxygeneo from "../_lib/data_services/data_oxygeneo"
import { getProfhilo } from "../_lib/data_services/data_profhilo"

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
    getChemicalPeeling("chemical-peeling"),
    getOxygeneo("oxygeneo"),
    getMezoterapiaNonInvasive("mezoterapia-non-invasive"),
    getMezoterapiaInvasive("mezoterapia-invasive"),
    getBotulotoxin("botulotoxin"),
    getKyselinaHyaluronova("kyselina-hyaluronova"),
    getBiokompatibilneNite("biokompatibilne-nite"),
    getProfhilo("profhilo"),
    getAcupuncture("acupuncture"),
  ])

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
  )
}
