import Main from "./_components/home/Main";
import getHomeImage from "./_lib/data_services/data_home_image";
import getPromotion from "./_lib/data_services/data_promotion";

export default async function Page() {
  const promotion = await getPromotion("novinky");
  const homeImg = await getHomeImage()

  return (
    <div className="relative">
      <Main promotion={promotion} homeImg={homeImg} />
    </div>
  );
}
