"use client";

import ExpandText from "@/app/_components/ExpandText";
import { brandFont } from "@/app/_components/fonts";
import type { ServiceRow } from "@/app/_lib/data_services_all/data_services";
import Image from "next/image";
import Jalupro_classic_pricing_form from "./Jalupro_classic_pricing_form";
import Jalupro_classic_text from "./Jalupro_classic_text";

type Jalupro_classicProps = {
  jaluproClassic?: ServiceRow | null | undefined;
  user?: string | null;
  isAdmin?: boolean;
};

export default function Jalupro_classic({
  jaluproClassic,
  user,
  isAdmin,
}: Jalupro_classicProps) {
  const uploadedImageUrl = jaluproClassic?.image_url?.trim();

  return (
    <div className="w-full items-center justify-center px-6 pt-10 2xl:px-44 lg:px-20 lg:pt-20">
      <div className="section-shell fade-up grid grid-cols-1 gap-2 p-5 lg:grid-cols-2 lg:gap-4 lg:p-8">
        <div className="flex flex-col py-10">
          <h1
            className={`premium-title pb-6 text-2xl font-semibold italic 2xl:text-5xl lg:pb-10 ${brandFont.className}`}
          >
            <span className="italic">
              <span className="text-3xl 2xl:text-6xl">
                {jaluproClassic?.title?.[0]}
              </span>
              {jaluproClassic?.title?.slice(1)}
            </span>
          </h1>
          <div>
            <ExpandText>
              <Jalupro_classic_text jaluproClassic={jaluproClassic} />
            </ExpandText>
          </div>
        </div>

        <div className="relative mt-10 w-full aspect-4/3 overflow-hidden rounded-lg border border-goldDark/25 shadow-md shadow-goldDark/15">
          <Image
            src={uploadedImageUrl || "/images/jalupro_main.jpeg"}
            alt="Jalupro Classic v Beauty Rescue Žilina"
            fill
            unoptimized
            className="object-cover"
          />
        </div>

        <div className="mt-10 2xl:mt-20 lg:col-span-2">
          <Jalupro_classic_pricing_form
            jaluproClassic={jaluproClassic}
            user={user}
            isAdmin={isAdmin}
          />
        </div>
      </div>
    </div>
  );
}
