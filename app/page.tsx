import Main from "./_components/home/Main";
import getHomeImage from "./_lib/data_services_all/data_home_image";
import getServiceBySlug from "./_lib/data_services_all/data_services";
import { createPageMetadata } from "./_lib/seo";

export const metadata = createPageMetadata("home");

export default async function Page() {
  const [promotion, homeImg] = await Promise.all([
    getServiceBySlug("novinky"),
    getHomeImage(),
  ]);

  return (
    <div className="relative">
      <Main promotion={promotion} homeImg={homeImg} />
    </div>
  );
}
