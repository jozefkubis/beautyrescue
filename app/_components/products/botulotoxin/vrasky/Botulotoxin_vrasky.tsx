"use client";

import ExpandText from "@/app/_components/ExpandText";
import { brandFont } from "@/app/_components/fonts";
import Image from "next/image";
import Botulotoxin_vrasky_text from "./Botulotoxin_vrasky_text";
import { ServiceRow } from "@/app/_lib/data_services_all/data_services";  

type BotulotoxinVraskyProps = {
  botulotoxinVrasky: ServiceRow;
};

export default function Botulotoxin_vrasky({
  botulotoxinVrasky,
}: BotulotoxinVraskyProps) {
  if (!botulotoxinVrasky) {
    return (
      <div className="section-shell mx-auto mt-10 w-full max-w-3xl p-6 text-center text-redDark">
        Dáta pre stránku Botulotoxín vrásky sa nepodarilo načítať.
      </div>
    );
  }

  // Používame URL z DB ak existuje, inak fallback na default obrázok.
  const uploadedImageUrl = botulotoxinVrasky?.image_url?.trim();

  return (
    <div className="w-full items-center justify-center px-6 pt-10 2xl:px-44 lg:px-20 lg:pt-20">
      <div className="section-shell fade-up grid grid-cols-1 gap-2 p-5 lg:grid-cols-2 lg:gap-4 lg:p-8">
        <div className="relative mt-10 w-full aspect-4/3 overflow-hidden rounded-lg border border-goldDark/25 shadow-md shadow-goldDark/15">
          <Image
            src={uploadedImageUrl || "/images/botulotoxin_vrasky.jpeg"}
            alt="Botulotoxín vrásky"
            fill
            unoptimized
            className="object-cover"
          />
        </div>

        <div className="flex flex-col py-3 lg:py-8">
          <h1
            className={`premium-title pb-6 text-2xl font-semibold italic 2xl:text-5xl lg:pb-10 ${brandFont.className}`}
          >
            <span className="italic text-goldDark">
              <span className="text-3xl 2xl:text-6xl">
                {botulotoxinVrasky?.title?.[0]}
              </span>
              {botulotoxinVrasky?.title?.slice(1)}
            </span>
          </h1>

          <ExpandText>
            <Botulotoxin_vrasky_text
              botulotoxinVrasky={botulotoxinVrasky}
            />
          </ExpandText>
        </div>
      </div>
    </div>
  );
}
