import AboutMain from "../_components/about/AboutMain";
import { getAboutUs } from "../_lib/data_services_all/data_about";
import { createPageMetadata } from "../_lib/seo";

export const metadata = createPageMetadata("about");

export default async function Page() {
  const aboutUsData = await getAboutUs("about-us");

  return <AboutMain aboutUsData={aboutUsData} />;
}
