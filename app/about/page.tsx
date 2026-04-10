import AboutMain from "../_components/about/AboutMain";
import { getAboutUs } from "../_lib/data_services_all/data_about";

export default async function Page() {
  const aboutUsData = await getAboutUs("about-us");

  return <AboutMain aboutUsData={aboutUsData} />;
}
