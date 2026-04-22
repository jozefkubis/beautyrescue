"use client";

import { ServiceRow } from "@/app/_lib/data_services_all/data_services";
import Image from "next/image";
import Link from "next/link";
import ExpandText from "../../ExpandText";
import { brandFont } from "../../fonts";
import About_botulotoxin from "./About_botulotoxin";
import Botulotoxin_pricing_form from "./Botulotoxin_pricing_form";
import Botulotoxin_text from "./Botulotoxin_text";

type BotulotoxinProps = {
  botulotoxin: ServiceRow | null;
  user?: string | null;
  isAdmin?: boolean;
};

export default function Botulotoxin({
  botulotoxin,
  user,
  isAdmin,
}: BotulotoxinProps) {
  if (!botulotoxin) {
    return (
      <div className="section-shell mx-auto mt-10 w-full max-w-3xl p-6 text-center text-redDark">
        Dáta pre stránku Botulotoxín sa nepodarilo načítať.
      </div>
    );
  }

  const uploadedImageUrl = botulotoxin?.image_url?.trim();

  return (
    <div className="w-full items-center justify-center px-6 pt-10 2xl:px-44 lg:px-20 lg:pt-20">
      <div className="section-shell fade-up grid grid-cols-1 gap-2 p-5 lg:grid-cols-2 lg:gap-4 lg:p-8">
        <div className="flex flex-col py-10">
          <h1
            className={`premium-title pb-6 text-2xl font-semibold italic 2xl:text-5xl lg:pb-10 ${brandFont.className}`}
          >
            <span className="italic">
              <span className="text-3xl 2xl:text-6xl">
                {botulotoxin?.title?.[0]}
              </span>
              {botulotoxin?.title?.slice(1)}
            </span>
          </h1>
          <div>
            <ExpandText>
              <Botulotoxin_text botulotoxin={botulotoxin} />
            </ExpandText>
          </div>
        </div>

        <div className="relative mt-10 w-full aspect-4/3 overflow-hidden rounded-lg border border-goldDark/25 shadow-md shadow-goldDark/15">
          {/* Použijeme URL z DB ak existuje, inak fallback na default obrázok */}
          <Image
            src={uploadedImageUrl || "/images/botulotoxin.jpg"}
            alt="Botulotoxín"
            fill
            unoptimized
            className="object-cover"
          />
        </div>

        <div className="mt-10 lg:mt-12 lg:col-span-2">
          <About_botulotoxin botulotoxin={botulotoxin} />
        </div>

        <div className="fade-up mt-10 lg:mt-12 lg:col-span-2">
          <div className="flex justify-around gap-3 sm:gap-4 lg:gap-5">
            {botulotoxin?.image_gallery?.map(
              ({ src, alt }: { src: string; alt?: string }, index: number) => (
                <Link
                  key={src}
                  href={
                    index === 0
                      ? "/medical-cosmetics/botulotoxin/vrasky"
                      : "/medical-cosmetics/botulotoxin/potenie"
                  }
                  className="relative aspect-square w-1/4 overflow-hidden rounded-2xl border border-goldDark/25 shadow-md shadow-goldDark/15"
                >
                  <Image
                    src={src}
                    alt={alt ?? ""}
                    fill
                    className="object-cover transition-transform duration-300 ease-out hover:scale-105 hover:cursor-pointer"
                  />
                </Link>
              ),
            )}
          </div>
        </div>

        <div className="mt-10 2xl:mt-20 lg:col-span-2">
          <Botulotoxin_pricing_form
            botulotoxin={botulotoxin}
            user={user}
            isAdmin={isAdmin}
          />
        </div>
      </div>
    </div>
  );
}
