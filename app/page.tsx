import Main from "./_components/home/Main";
import getPromotion from "./_lib/data_services/data_promotion";

export default async function Page() {
  const promotion = await getPromotion("novinky");

  return (
    <div className="relative">
      <Main promotion={promotion} />
    </div>
  );
}
