"use client";

import { luxuriousScript } from "@/app/_components/fonts";
import type { HomeImageProps } from "@/app/_lib/data_services_all/data_home_image";
import Image from "next/image";
import { useEffect, useState } from "react";
import EcgLine from "../ecg_effect/EcgLine";

type News_on_image_mainProps = {
  promotionSummary: string | null | undefined;
  isActive: boolean | null | undefined;
  homeImg: HomeImageProps;
};

function IfNotPromotionActive() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
      <p className="text-4xl font-semibold italic text-redMain lg:text-5xl">
        RESCUE YOUR BODY
      </p>
      <p className="text-4xl font-semibold italic text-redMain lg:text-5xl">
        RESCUE YOUR BEAUTY
      </p>
      <p className="text-4xl font-semibold italic text-redMain lg:text-5xl">
        RESCUE YOUR SELF
      </p>
    </div>
  );
}

export default function News_on_image_main({
  promotionSummary,
  isActive,
  homeImg,
}: News_on_image_mainProps) {
  const [showEcg, setShowEcg] = useState(false);
  const uploadedImageUrl = homeImg.image_url?.trim();

  useEffect(() => {
    const timer = window.setTimeout(() => setShowEcg(true), 800);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <section className="relative aspect-16/6 w-full overflow-hidden">
      <Image
        src={uploadedImageUrl || "/images/home_main.jpg"}
        alt="Beauty Rescue kozmetický salón Žilina"
        fill
        sizes="(max-width: 1023px) 0px, 100vw"
        className="object-cover object-right"
      />

      <div className="absolute inset-0 bg-linear-to-tr from-background/95 via-transparent to-background/90" />
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-background/95" />
      <div className="absolute inset-0 bg-linear-to-tl from-transparent via-transparent to-background/90" />

      <div className="slide-in-left absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
        {isActive ? (
          <p
            className={`mb-1 text-3xl font-bold text-redDark drop-shadow-[0_6px_22px_rgba(141,10,45,0.24)] lg:text-7xl xl:text-[9rem] ${luxuriousScript.className}`}
          >
            <span className="text-[8rem] xl:text-[15rem]">A</span>kcia
          </p>
        ) : (
          <IfNotPromotionActive />
        )}

        {isActive && (
          <p className="mb-6 max-w-4xl whitespace-pre-wrap rounded-full border border-goldDark/20 bg-white/60 px-6 py-2 text-lg italic text-greyMain/80 shadow-sm shadow-goldDark/15 xl:text-3xl">
            {promotionSummary}
          </p>
        )}
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-[6%] 2xl:bottom-[12%]">
        {showEcg && <EcgLine />}
      </div>
    </section>
  );
}
