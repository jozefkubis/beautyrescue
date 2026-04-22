import Main from "./_components/home/Main";
import getHomeImage from "./_lib/data_services_all/data_home_image";
import getServiceBySlug from "./_lib/data_services_all/data_services";

export default async function Page() {
  const promotion = await getServiceBySlug("novinky");
  const homeImg = await getHomeImage();

  return (
    <div className="relative">
      <Main promotion={promotion} homeImg={homeImg} />
    </div>
  );
}
