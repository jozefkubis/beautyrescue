import Main from "./_components/home/Main";
import getPromotion from "./_lib/data_services/data_promotion";

export default async function Page() {
  const promotion = await getPromotion("novinky");
  console.log("Promotion data in page.tsx:", promotion);

  return (
    <div className="relative">
      <Main promotion={promotion}/>
    </div>
  );
}
