import type { ServiceItem } from "./data_services.types"

export const dataAboutUs: ServiceItem = {
  slug: "about-us",
  name: "O nás",
  summary: "Krása je vonkajší manifest vnútorného zdravia.",
  description: null,
  imageUrl: null,
  gallery: [],
  itemType: "content",
  category: "about",
  subcategory: null,
  content: {
    bodyIntro:
      "Beauty Rescue je štúdio profesionálnej kozmetiky na oživenie či ozdravenie Vašej krásy.",
    bodyTeam:
      "Náš tím pozostávajúci zo zdravotníkov- lekára, záchranárov a maséra svoje medicínske znalosti a zdravotnícke zručnosti už dlhé roky využíva v oblasti kozmetiky a ozdravovania.",
    bodyServices:
      "Z portfólia našich služieb si môžete vybrať od profesionálnej kozmetiky, a síce najširšieho spektra mezoterapeutickej chémie, jej aplikačných spôsobov a iných profesionálnych kozmetických prístrojových ošetrení, pokračujúc lekárskou kozmetikou- botulotoxínom, kyselinou hyalurónovou, biokompatibilnými niťami, ďalej relaxom v podobe masáží, ku ktorým máme ako bonus fínsku saunu, základ pre náš detoxprogram, alebo je príčinou prečo sa v sebe necítite dobre nejaký zdravotný problém prinášajúci dyskomfort? Nech sa páči, lekárska akupunktúra.",
    bodyPhilosophy:
      "Cieľom i filozofiou Záchranky krásy nie je pretvoriť Vás podľa najnovších estetických trendov v niečiu kópiu, ale odkryť Vašu unikátnu krásu, zakryť Vaše nedostatky, spomaliť progresiu starnutia, oživiť a zachrániť originál vo Vás, posilniť a podporiť Vaše zdravie – Vašu krásu.",
  },
  attributes: {},
  metadata: {
    quoteAuthor: "(Katie Brindle, expertka v čínskej medicíne)",
  },
}

// export async function getAboutUs(slug: string) {
//   const supabase = await getSupabaseServerClient()

//   const { data, error } = await supabase
//     .from("service_items")
//     .select("*")
//     .eq("slug", slug)
//     .single()

//   if (error) {
//     console.error("Error fetching about us data:", error)
//     return null
//   }

//   return data
// }
