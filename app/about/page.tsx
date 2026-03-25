import AboutMain from "../_components/about/AboutMain"
import { getAboutUs } from "../_lib/data_services/data_about_us"

export default async function Page() {
  const aboutUsData = await getAboutUs("about-us")

  return <AboutMain aboutUsData={aboutUsData} />
}
