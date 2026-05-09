import type { HomeImageProps } from "@/app/_lib/data_services_all/data_home_image";
import type { ServiceRow } from "@/app/_lib/data_services_all/data_services";
import Interior from "./main/interior/Interior";
import Location from "./main/location/Location";
import News_on_image_main from "./main/news/news_on_image/News_on_image_main";
import News_text from "./main/news/news_text/News_text";

type MainProps = {
  promotion: ServiceRow | null | undefined;
  homeImg: HomeImageProps;
};

export default function Main({ promotion, homeImg }: MainProps) {
  const title = promotion?.title || "Žiadna aktuálna akcia";
  const text = promotion?.text || "Žiadna aktuálna akcia";
  const aboutTitle = promotion?.about_title || "";

  const isActive = promotion?.is_active ?? false;

  return (
    <>
      <div className="lg:block hidden">
        <News_on_image_main
          promotionSummary={aboutTitle}
          isActive={isActive}
          homeImg={homeImg}
        />
      </div>
      <div className="fade-up">
        <News_text text={text} title={title} isActive={isActive} />
      </div>
      <div className="fade-up deferred-section">
        <Location />
      </div>
      <div className="fade-up deferred-section">
        <Interior />
      </div>
      {/* <Footer /> */}
    </>
  );
}
