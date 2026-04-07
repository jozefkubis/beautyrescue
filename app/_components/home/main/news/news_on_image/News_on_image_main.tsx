"use client"; // musí byť, lebo používame animácie na klientovi

import { luxuriousScript } from "@/app/_components/fonts";
import type { PromotionMainProps } from "@/app/_lib/data_services/data_promotion";
import { motion } from "framer-motion"; // import z framer-motion
import Image from "next/image";
import { useState } from "react";
import EcgLine from "../ecg_effect/EcgLine";

type News_on_image_mainProps = {
  promotionSummary: PromotionMainProps["promotionData"]["summary"];
};

// definujeme "stavy" animácie
const textVariants = {
  hidden: {
    opacity: 0,
    x: -800,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8, // stačí duration, ease môžeme vynechať
    },
  },
};

export default function News_on_image_main({
  promotionSummary,
}: News_on_image_mainProps) {
  const [showEcg, setShowEcg] = useState(false);

  return (
    <section className="relative w-full aspect-16/6 overflow-hidden">
      {/* Pozadie */}
      <Image
        src="/images/imageHome.jpg"
        alt="Beauty Rescue"
        fill
        priority
        className="object-cover object-right"
      />

      {/* Tmavý overlay */}
      <div className="absolute inset-0 bg-linear-to-tr from-background/95 via-transparent to-background/90" />
      {/* Prechod dole */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-background/95" />
      <div className="absolute inset-0 bg-linear-to-tl from-transparent via-transparent to-background/90" />

      {/* Text – ostáva tak ako máš */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center"
        variants={textVariants}
        initial="hidden"
        animate="visible"
        onAnimationComplete={() => setShowEcg(true)}
      >
        <h1
          className={`mb-1 text-3xl font-bold text-redDark drop-shadow-[0_6px_22px_rgba(141,10,45,0.24)] lg:text-7xl xl:text-[9rem] ${luxuriousScript.className}`}
        >
          <span className="text-[8rem] xl:text-[15rem]">A</span>kcia
        </h1>
        <p className="mb-6 max-w-4xl whitespace-pre-wrap rounded-full border border-goldDark/20 bg-white/60 px-6 py-2 text-lg italic text-greyMain/80 shadow-sm shadow-goldDark/15 xl:text-3xl">
          {promotionSummary}
        </p>
      </motion.div>

      {/* EKG – cez celú šírku, fixne nad spodkom */}
      <div className="pointer-events-none absolute inset-x-0 bottom-[6%] 2xl:bottom-[12%]">
        {showEcg && <EcgLine />}
      </div>
    </section>
  );
}
