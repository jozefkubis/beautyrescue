"use client";

import ExpandText from "@/app/_components/ExpandText";
import { brandFont } from "@/app/_components/fonts";
import type { KyselinaHyaluronovaLipsProps } from "@/app/_lib/data_services/data_kyselina_hyaluronova";
import Image from "next/image";
import Kyselina_hyaluronova_pricing_form_lips from "./Kyselina_hyaluronova_pricing_form_lips";
import Kyselina_hyaluronova_lips_text from "./Kyselina_hyaluronova_text_lips";

export default function Kyselina_hyaluronova_lips({
  kyselinaHyaluronovaLipsData,
  user,
  isAdmin,
}: KyselinaHyaluronovaLipsProps & { user?: string | null; isAdmin?: boolean }) {
  const uploadedImageUrl = kyselinaHyaluronovaLipsData.image_url?.trim();

  return (
    <div className="w-full items-center justify-center px-6 pt-10 2xl:px-44 lg:px-20 lg:pt-20">
      <div className="section-shell fade-up grid grid-cols-1 gap-4 p-5 lg:grid-cols-2 lg:gap-8 lg:p-8">
        <div className="flex flex-col py-10">
          <h1
            className={`premium-title pb-8 text-2xl font-semibold italic 2xl:text-5xl lg:pb-12 ${brandFont.className}`}
          >
            <span className="italic">
              <span className="text-3xl 2xl:text-6xl">
                {kyselinaHyaluronovaLipsData.name[0]}
              </span>
              {kyselinaHyaluronovaLipsData.name.slice(1)}
            </span>
          </h1>
          <div>
            <ExpandText>
              <Kyselina_hyaluronova_lips_text
                kyselinaHyaluronovaLipsData={kyselinaHyaluronovaLipsData}
              />
            </ExpandText>
          </div>
        </div>

        <div className="relative mt-10 h-85 overflow-hidden rounded-lg border border-goldDark/25 bg-white shadow-md shadow-goldDark/15 md:h-125 lg:h-155 lg:w-full">
          <Image
            src={uploadedImageUrl || "/images/kyselina_hyaluronova_lips.jpeg"}
            alt="Kyselina hyaluronová"
            fill
            unoptimized
            className="object-cover"
          />
        </div>

        <div className="mt-10 2xl:mt-20 col-span-2">
          <Kyselina_hyaluronova_pricing_form_lips
            kyselinaHyaluronovaLipsData={kyselinaHyaluronovaLipsData}
            user={user}
            isAdmin={isAdmin}
          />
        </div>
      </div>
    </div>
  );
}
