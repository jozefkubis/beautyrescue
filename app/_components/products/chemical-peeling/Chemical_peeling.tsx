"use client";

import type { ServiceRow } from "@/app/_lib/data_services_all/data_services";
import Image from "next/image";
import ExpandText from "../../ExpandText";
import { brandFont } from "../../fonts";
import Chem_peeling_pricing_form from "./Chem_peeling_pricing_form";
import Chemical_peeling_text from "./Chemical_peeling_text";

type ChemicalPeelingProps = {
  chemPeelingService: ServiceRow | null;
  user?: string | null;
  isAdmin?: boolean;
};

export default function Chemical_peeling({
  chemPeelingService,
  user,
  isAdmin,
}: ChemicalPeelingProps) {
  // Ak je v DB nahraný obrázok zo Storage, použijeme ho; inak ostáva lokálny fallback.
  const uploadedImageUrl = chemPeelingService?.image_url?.trim();

  return (
    <div className="w-full items-center justify-center px-6 pt-10 2xl:px-44 lg:px-20 lg:pt-20">
      <div className="section-shell fade-up grid grid-cols-1 gap-4 p-5 lg:grid-cols-2 lg:gap-8 lg:p-8">
        <div className="flex flex-col py-10">
          <h1
            className={`premium-title pb-6 text-2xl font-semibold italic 2xl:text-5xl lg:pb-10 ${brandFont.className}`}
          >
            <span className="italic">
              <span className="text-3xl 2xl:text-6xl">
                {chemPeelingService?.title?.[0]}
              </span>
              {chemPeelingService?.title?.slice(1)}
            </span>
          </h1>
          <div>
            <ExpandText>
              <Chemical_peeling_text chemPeelingService={chemPeelingService} />
            </ExpandText>
          </div>
        </div>

        <div className="relative mt-10 h-56 overflow-hidden rounded-lg border border-goldDark/25 shadow-md shadow-goldDark/15 md:h-125 lg:h-[90%] lg:w-full">
          <Image
            src={uploadedImageUrl || "/images/chemical_peeling.jpeg"}
            alt="Chemical peeling"
            fill
            unoptimized
            className="object-cover"
          />
        </div>

        <div className="mt-10 2xl:mt-20 lg:col-span-2">
          <Chem_peeling_pricing_form
            chemicalPeelingService={chemPeelingService}
            user={user}
            isAdmin={isAdmin}
          />
        </div>
      </div>
    </div>
  );
}
