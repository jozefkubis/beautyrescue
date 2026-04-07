import { brandFont } from "@/app/_components/fonts";
import type { PromotionMainProps } from "@/app/_lib/data_services/data_promotion";

type News_textProps = {
  paragraphs: PromotionMainProps["promotionData"]["content"]["paragraphs"];
  promotionName: PromotionMainProps["promotionData"]["name"];
};

export default function News_text({
  paragraphs,
  promotionName,
}: News_textProps) {
  return (
    <div className="section-shell fade-up mx-3 mt-8 flex flex-col items-center px-4 text-center sm:mx-4 sm:px-6 lg:mx-20 lg:mt-10 lg:px-44 2xl:mx-44">
      <h1
        className={`premium-title py-6 text-4xl sm:text-5xl lg:py-14 2xl:text-6xl ${brandFont.className}`}
      >
        <span className="italic">{promotionName}</span>
      </h1>
      <p className="whitespace-pre-wrap text-sm leading-7 text-greyMain/85 sm:leading-8 xl:text-base 2xl:text-lg">
        {paragraphs}
      </p>
    </div>
  );
}
