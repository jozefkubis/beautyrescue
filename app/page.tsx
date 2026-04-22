import Main from "./_components/home/Main";
import getPromotion from "./_lib/data_services/data_promotion";
import getHomeImage from "./_lib/data_services_all/data_home_image";

export default async function Page() {
  const promotion = await getPromotion("novinky");
  const homeImg = await getHomeImage();

  return (
    <div className="relative">
      <Main promotion={promotion} homeImg={homeImg} />
    </div>
  );
}
