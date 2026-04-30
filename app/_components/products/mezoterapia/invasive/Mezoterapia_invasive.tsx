"use client";

import ExpandText from "@/app/_components/ExpandText";
import { brandFont } from "@/app/_components/fonts";
import type { ServiceRow } from "@/app/_lib/data_services_all/data_services";
import Image from "next/image";
import Mezoterapia_pricing_form_invasive from "./Mezoterapia_pricing_form_invasive";
import Mezoterapia_text_invasive from "./Mezoterapia_text_invasive";

type MezoterapiaInvasivePageProps = {
  mezoterapiaInvasive: ServiceRow | null;
  user?: string | null;
  isAdmin?: boolean;
};

export default function Mezoterapia_invasive({
  mezoterapiaInvasive,
  user,
  isAdmin,
}: MezoterapiaInvasivePageProps) {
  return (
    <div className="w-full items-center justify-center px-6 pt-10 2xl:px-44 lg:px-20 lg:pt-20">
      <div className="section-shell fade-up grid grid-cols-1 gap-4 p-5 lg:gap-8 lg:p-8">
        <div className="flex flex-col py-10">
          <h1
            className={`premium-title pb-6 text-2xl font-semibold italic 2xl:text-5xl lg:pb-10 ${brandFont.className}`}
          >
            <span className="italic">
              <span className="text-3xl 2xl:text-6xl">
                {mezoterapiaInvasive?.title?.[0]}
              </span>
              {mezoterapiaInvasive?.title?.slice(1)}
            </span>
          </h1>
          <div>
            <ExpandText>
              <Mezoterapia_text_invasive
                mezoterapiaInvasive={mezoterapiaInvasive}
              />
            </ExpandText>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 relative px-6 gap-3">
          {mezoterapiaInvasive?.image_gallery?.map((image, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-lg border border-goldDark/25 shadow-md h-full aspect-4/3 ring-2 ring-goldDark/80 shadow-goldDark/30"
            >
              {image?.src && (
                <Image
                  src={image.src}
                  alt={image.alt ? `${image.alt} v Beauty Rescue Žilina` : ""}
                  fill
                  className="object-fit"
                />
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 2xl:mt-20 flex justify-center lg:mt-16">
          <div className="w-full max-w-3xl overflow-hidden border border-neutral-300/80 bg-white shadow-lg shadow-neutral-500/10">
            <div className="aspect-video w-full">
              <iframe
                src="https://www.youtube.com/embed/6z9qoQVEFO8?start=1"
                title="Vitalinjector video"
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        </div>

        <div className="mt-10 2xl:mt-20">
          <Mezoterapia_pricing_form_invasive
            mezoterapiaInvasive={mezoterapiaInvasive}
            user={user}
            isAdmin={isAdmin}
          />
        </div>
      </div>
    </div>
  );
}
