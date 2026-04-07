import { brandFont } from "@/app/_components/fonts";
import type { PromotionMainProps } from "@/app/_lib/data_services/data_promotion";

type News_textProps = {
  paragraphs: PromotionMainProps["promotionData"]["content"]["paragraphs"];
  promotionName: PromotionMainProps["promotionData"]["name"];
  isActive: PromotionMainProps["promotionData"]["is_active"];
};

function IfNoPromotion() {
  return (
    <div className="flex h-56 items-center justify-center px-4">
      <p className="max-w-xl text-base sm:text-lg leading-7 sm:leading-8 italic text-greyMain/85 text-center">
        Už čoskoro pre vás uvedieme novinky, ktoré obohatia našu ponuku a
        prinesú vám ešte lepší zážitok. Priebežne pracujeme na tom, aby ste tu
        vždy našli niečo zaujímavé, inšpiratívne alebo výhodné. Táto sekcia sa
        bude pravidelne aktualizovať, preto sa sem určite oplatí občas vrátiť a
        pozrieť, čo je nové.
      </p>
    </div>
  );
}

export default function News_text({
  paragraphs,
  promotionName,
  isActive,
}: News_textProps) {
  return (
    <div className="w-full justify-center flex">
      <div className="section-shell fade-up mt-10 flex w-full max-w-4xl flex-col items-center px-4 text-center py-8 sm:px-6 lg:px-12 lg:py-12 2xl:px-16">
        {/* Nadpis akcie */}
        <h1
          className={`premium-title pb-3 text-4xl font-semibold tracking-tight text-goldDark sm:text-5xl lg:pb-4 2xl:text-6xl ${brandFont.className}`}
        >
          <span className="italic">{promotionName}</span>
        </h1>

        {/* Dekoratívna linka pod nadpisom */}
        <span className="mb-6 block h-px w-16 bg-goldDark/40 lg:mb-8 lg:w-24" />

        {/* Každý odsek má vlastný element pre správne medzery a sémantiku */}
        <div className="flex max-w-2xl flex-col text-center text-sm leading-7 text-greyMain/80 gap-4 sm:gap-3 sm:text-base sm:leading-8 2xl:text-lg italic">
          {isActive &&
            paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          {!isActive && <IfNoPromotion />}
        </div>
      </div>
    </div>
  );
}
