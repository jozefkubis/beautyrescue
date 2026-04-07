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
    <div className="fade-up mx-3 mt-10 flex flex-col items-center px-4 text-center sm:mx-4 sm:px-6 lg:mx-20 lg:mt-16 lg:px-32 2xl:mx-44">
      {/* Nadpis akcie */}
      <h1
        className={`premium-title pt-6 pb-3 text-4xl font-semibold tracking-tight text-goldDark sm:text-5xl lg:pt-10 lg:pb-4 2xl:text-6xl ${brandFont.className}`}
      >
        <span className="italic">{promotionName}</span>
      </h1>

      {/* Dekoratívna linka pod nadpisom */}
      <span className="mb-6 block h-px w-16 bg-goldDark/40 lg:mb-8 lg:w-24" />

      {/* Každý odsek má vlastný element pre správne medzery a sémantiku */}
      <div className="flex max-w-2xl flex-col text-center text-sm leading-7 text-greyMain/80 gap-4 sm:gap-3 sm:text-base sm:leading-8 2xl:text-lg">
        {paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
}
