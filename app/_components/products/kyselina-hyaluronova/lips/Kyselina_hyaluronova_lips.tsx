import ExpandText from "@/app/_components/ExpandText";
import { brandFont } from "@/app/_components/fonts";
import { ServiceRow } from "@/app/_lib/data_services_all/data_services";
import Image from "next/image";
import Kyselina_hyaluronova_pricing_form_lips from "./Kyselina_hyaluronova_pricing_form_lips";
import Kyselina_hyaluronova_lips_text from "./Kyselina_hyaluronova_text_lips";

type Kyselina_hyaluronova_lipsProps = {
  kyselinaHyaluronovaLips: ServiceRow | null | undefined;
  user?: string | null;
  isAdmin?: boolean;
};

export default function Kyselina_hyaluronova_lips({
  kyselinaHyaluronovaLips,
  user,
  isAdmin,
}: Kyselina_hyaluronova_lipsProps) {
  const uploadedImageUrl = kyselinaHyaluronovaLips?.image_url?.trim();

  return (
    <div className="w-full items-center justify-center px-6 pt-10 2xl:px-44 lg:px-20 lg:pt-20">
      <div className="section-shell fade-up grid grid-cols-1 gap-4 p-5 lg:grid-cols-2 lg:gap-8 lg:p-8">
        <div className="flex flex-col py-10">
          <h1
            className={`premium-title pb-6 text-2xl font-semibold italic 2xl:text-5xl lg:pb-10 ${brandFont.className}`}
          >
            <span className="italic">
              <span className="text-3xl 2xl:text-6xl">
                {kyselinaHyaluronovaLips?.title?.[0]}
              </span>
              {kyselinaHyaluronovaLips?.title?.slice(1)}
            </span>
          </h1>
          <div>
            <ExpandText>
              <Kyselina_hyaluronova_lips_text
                kyselinaHyaluronovaLips={kyselinaHyaluronovaLips}
              />
            </ExpandText>
          </div>
        </div>

        <div className="relative mt-10 h-85 overflow-hidden rounded-lg border border-goldDark/25 bg-white shadow-md shadow-goldDark/15 md:h-125 lg:h-155 lg:w-full">
          <Image
            src={uploadedImageUrl || "/images/kyselina_hyaluronova_lips.jpeg"}
            alt="Kyselina hyaluronová na pery v Beauty Rescue Žilina"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        <div className="mt-10 2xl:mt-20 col-span-2">
          <Kyselina_hyaluronova_pricing_form_lips
            kyselinaHyaluronovaLips={kyselinaHyaluronovaLips}
            user={user}
            isAdmin={isAdmin}
          />
        </div>
      </div>
    </div>
  );
}
