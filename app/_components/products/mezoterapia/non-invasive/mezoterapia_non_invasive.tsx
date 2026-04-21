"use client";

import ExpandText from "@/app/_components/ExpandText";
import { brandFont } from "@/app/_components/fonts";
import type { ServiceRow } from "@/app/_lib/data_services_all/data_services";
import Image from "next/image";
import Mezoterapia_pricing_form_non_invasive from "./mezoterapia_pricing_form_non_invasive";
import Mezoterapia_text_non_invasive from "./mezoterapia_text_non_invasive";

type MezoterapiaNonInvasivePageProps = {
  mezoterapiaNonInvasive: ServiceRow | null;
  user?: string | null;
  isAdmin?: boolean;
};

export default function Mezoterapia_non_invasive({
  mezoterapiaNonInvasive,
  user,
  isAdmin,
}: MezoterapiaNonInvasivePageProps) {
  return (
    <div className="w-full items-center justify-center px-6 pt-10 2xl:px-44 lg:px-20 lg:pt-20">
      <div className="section-shell fade-up grid grid-cols-1 gap-4 p-5 lg:gap-8 lg:p-8">
        <div className="flex flex-col py-10">
          <h1
            className={`premium-title pb-8 text-2xl font-semibold italic 2xl:text-5xl lg:pb-12 ${brandFont.className}`}
          >
            <span className="italic">
              <span className="text-3xl 2xl:text-6xl">
                {mezoterapiaNonInvasive?.title?.[0]}
              </span>
              {mezoterapiaNonInvasive?.title?.slice(1)}
            </span>
          </h1>
          <div>
            <ExpandText>
              <Mezoterapia_text_non_invasive
                mezoterapiaNonInvasive={mezoterapiaNonInvasive}
              />
            </ExpandText>
          </div>
        </div>

        <div className="grid grid-cols-1 items-center justify-items-center gap-3 p-6 md:grid-cols-4">
          {mezoterapiaNonInvasive?.image_gallery?.map((image, index) => (
            <div
              key={index}
              className="relative aspect-square w-full max-w-75 overflow-hidden rounded-lg border border-goldDark/25 ring-2 ring-goldDark/80 shadow-md shadow-goldDark/30"
            >
              {image?.src && (
                <Image
                  src={image.src}
                  alt={image.alt ?? ""}
                  fill
                  className="object-fit"
                />
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 2xl:mt-20">
          <Mezoterapia_pricing_form_non_invasive
            mezoterapiaNonInvasive={mezoterapiaNonInvasive}
            user={user}
            isAdmin={isAdmin}
          />
        </div>
      </div>
    </div>
  );
}
