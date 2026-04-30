import ExpandText from "@/app/_components/ExpandText";
import { brandFont } from "@/app/_components/fonts";
import type { ServiceRow } from "@/app/_lib/data_services_all/data_services";
import Image from "next/image";
import Kyselina_hyaluronova_pricing_form_face from "./Kyselina_hyaluronova_pricing_form_face";
import Kyselina_hyaluronova_text_face from "./Kyselina_hyaluronova_text_face";

type Kyselina_hyaluronova_faceProps = {
  kyaselinaHyaluronovaFace: ServiceRow | null | undefined;
  user?: string | null;
  isAdmin?: boolean;
};

export default function Kyselina_hyaluronova_face({
  kyaselinaHyaluronovaFace,
  user,
  isAdmin,
}: Kyselina_hyaluronova_faceProps) {
  const uploadedImageUrl = kyaselinaHyaluronovaFace?.image_url?.trim();

  return (
    <div className="w-full items-center justify-center px-6 pt-10 2xl:px-44 lg:px-20 lg:pt-20">
      <div className="section-shell fade-up grid grid-cols-1 gap-4 p-5 lg:grid-cols-2 lg:gap-8 lg:p-8">
        <div className="flex flex-col py-10">
          <h1
            className={`premium-title pb-6 text-2xl font-semibold italic 2xl:text-5xl lg:pb-10 ${brandFont.className}`}
          >
            <span className="italic">
              <span className="text-3xl 2xl:text-6xl">
                {kyaselinaHyaluronovaFace?.title?.[0]}
              </span>
              {kyaselinaHyaluronovaFace?.title?.slice(1)}
            </span>
          </h1>
          <div>
            <ExpandText>
              <Kyselina_hyaluronova_text_face
                kyselinaHyaluronovaFace={kyaselinaHyaluronovaFace}
              />
            </ExpandText>
          </div>
        </div>

        <div className="relative mt-10 h-85 overflow-hidden rounded-lg border border-goldDark/25 bg-white shadow-md shadow-goldDark/15 md:h-125 lg:h-150 lg:w-full">
          <Image
            src={uploadedImageUrl || "/images/kyselina_hyaluronova_face.jpeg"}
            alt="Kyselina hyaluronová - výplne na tvári v Beauty Rescue Žilina"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover object-left"
          />
        </div>

        <div className="mt-10 2xl:mt-20 col-span-2">
          <Kyselina_hyaluronova_pricing_form_face
            kyselinaHyaluronovaFace={kyaselinaHyaluronovaFace}
            user={user}
            isAdmin={isAdmin}
          />
        </div>
      </div>
    </div>
  );
}
