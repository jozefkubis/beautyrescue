import { brandFont } from "@/app/_components/fonts";
import type { ServiceRow } from "@/app/_lib/data_services_all/data_services";
import { highlightKeywords } from "@/app/_lib/helpers";
import Image from "next/image";

type NewsTextProps = ServiceRow & {
  isActive: boolean;
  uploadedImageUrl?: string;
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

// Komponent zobrazí text novinky alebo informáciu, že nie je aktívna akcia
export default function News_text({
  text,
  title,
  isActive,
  uploadedImageUrl,
}: NewsTextProps) {
  return (
    <div className="w-full justify-center flex">
      <div className="section-shell fade-up mt-10 flex w-full max-w-4xl flex-col items-center px-4 text-center py-8 sm:px-6 lg:px-12 lg:py-12 2xl:px-16">
        {/* Nadpis akcie */}
        <h2
          className={`premium-title pb-3 text-4xl font-semibold tracking-tight text-goldDark sm:text-5xl lg:pb-4 2xl:text-6xl ${brandFont.className}`}
        >
          <span className="italic">{title}</span>
        </h2>

        {/* Dekoratívna linka pod nadpisom */}
        <span className="mb-6 block h-px w-16 bg-goldDark/40 lg:mb-8 lg:w-24" />

        {/* Každý odsek má vlastný element pre správne medzery a sémantiku */}
        <div className="max-w-2xl text-justify text-sm leading-7 text-greyMain/80 sm:text-base 2xl:text-lg italic whitespace-pre-wrap">
          <Image
            src={uploadedImageUrl || "/images/news.jpeg"}
            alt="Novinky v Beauty Rescue"
            width={260}
            height={150}
            sizes="260px"
            className="float-right ml-6 mb-3 w-40 rounded-md border border-goldDark/25 shadow-md shadow-goldDark/15 sm:w-52 md:w-80"
          />
          <p dangerouslySetInnerHTML={{ __html: highlightKeywords(text) }} />
          {!isActive && <IfNoPromotion />}
        </div>
      </div>
    </div>
  );
}
