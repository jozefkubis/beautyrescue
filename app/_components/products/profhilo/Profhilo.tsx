"use client";

import type { ServiceRow } from "@/app/_lib/data_services_all/data_services";
import Image from "next/image";
import ExpandText from "../../ExpandText";
import { brandFont } from "../../fonts";
import About_profhilo from "./About_profhilo";
import Profhilo_pricing_form from "./Profhilo_pricing_form";
import Profhilo_text from "./Profhilo_text";

type ProfhiloProps = {
  profhilo: ServiceRow | null | undefined;
  profhiloStructura: ServiceRow | null | undefined;
  user?: string | null;
  isAdmin?: boolean;
};

export default function Profhilo({
  profhilo,
  profhiloStructura,
  user,
  isAdmin,
}: ProfhiloProps) {
  const uploadedImageUrl = profhilo?.image_url?.trim();

  return (
    <div className="w-full items-center justify-center px-6 pt-10 2xl:px-44 lg:px-20 lg:pt-20">
      <div className="section-shell fade-up grid grid-cols-1 gap-2 p-5 lg:grid-cols-2 lg:gap-4 lg:p-8">
        <div className="flex flex-col py-10">
          <h1
            className={`premium-title pb-6 text-2xl font-semibold italic 2xl:text-5xl lg:pb-10 ${brandFont.className}`}
          >
            <span className="italic">
              <span className="text-3xl 2xl:text-6xl">
                {profhilo?.title?.[0]}
              </span>
              {profhilo?.title?.slice(1)}
            </span>
          </h1>
          <div>
            <ExpandText>
              <Profhilo_text profhilo={profhilo} />
            </ExpandText>
          </div>
        </div>

        <div className="relative mt-10 w-full aspect-4/3 overflow-hidden rounded-lg border border-goldDark/25 shadow-md shadow-goldDark/15">
          <Image
            src={uploadedImageUrl || "/images/profhilo_main.jpeg"}
            alt="Profhilo v Beauty Rescue Žilina"
            fill
            unoptimized
            className="object-cover"
          />
        </div>

        <div className="mt-10 2xl:mt-20 lg:col-span-2">
          <About_profhilo
            profhilo={profhilo}
            profhiloStructura={profhiloStructura}
          />
        </div>

        {/* <div className="fade-up mt-10 lg:mt-12">
        <div className="flex justify-around gap-3 sm:gap-4 lg:gap-5">
          {profhiloData.gallery.map(({ src, alt }) => (
            <div
              key={src}
              className="relative aspect-square w-1/4 overflow-hidden rounded-2xl border border-goldDark/25 shadow-md shadow-goldDark/15"
            >
              <Image
                src={src}
                alt={alt ? `${alt} v Beauty Rescue Žilina` : ""}
                fill
                className="object-cover transition-transform duration-300 ease-out hover:scale-105 hover:cursor-pointer"
              />
            </div>
          ))}
        </div>
      </div> */}

        <div className="mt-10 2xl:mt-20 lg:col-span-2">
          <Profhilo_pricing_form
            profhilo={profhilo}
            // profhiloStructura={profhiloStructura}
            user={user}
            isAdmin={isAdmin}
          />
        </div>
      </div>
    </div>
  );
}
