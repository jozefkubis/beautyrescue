"use client"

import ExpandText from "@/app/_components/ExpandText"
import { brandFont } from "@/app/_components/fonts"
import type { MezoterapiaNonInvasiveProps } from "@/app/_lib/data_services/data_mezoterapia"
import Image from "next/image"
import Mezoterapia_pricing_form_non_invasive from "./mezoterapia_pricing_form_non_invasive"
import Mezoterapia_text_non_invasive from "./mezoterapia_text_non_invasive"

export default function Mezoterapia_non_invasive({
  mezoterapiaNonInvasiveData,
}: MezoterapiaNonInvasiveProps) {
  return (
    <div className="w-full items-center justify-center px-6 pt-10 2xl:px-44 lg:px-20 lg:pt-20">
      <div className="section-shell fade-up grid grid-cols-1 gap-4 p-5 lg:gap-8 lg:p-8">
        <div className="flex flex-col py-10">
          <h1
            className={`premium-title pb-8 text-2xl font-semibold italic 2xl:text-5xl lg:pb-12 ${brandFont.className}`}
          >
            <span className="italic">
              <span className="text-3xl 2xl:text-6xl">
                {mezoterapiaNonInvasiveData.name[0]}
              </span>
              {mezoterapiaNonInvasiveData.name.slice(1)}
            </span>
          </h1>
          <div>
            <ExpandText>
              <Mezoterapia_text_non_invasive
                data={mezoterapiaNonInvasiveData}
              />
            </ExpandText>
          </div>
        </div>

        <div className="grid grid-cols-1 items-center justify-items-center gap-3 p-6 md:grid-cols-4">
          {/* <div className="relative h-full aspect-square overflow-hidden rounded-lg border border-goldDark/25 ring-2 ring-goldDark/80 shadow-md shadow-goldDark/30">
            <Image
              src={dataMezoterapiaNonInvasive.gallery[0].src}
              alt={dataMezoterapiaNonInvasive.gallery[0].alt ?? ""}
              fill
              className="object-fit"
            />
          </div> */}

          <div className="relative aspect-square w-full max-w-75 overflow-hidden rounded-lg border border-goldDark/25 ring-2 ring-goldDark/80 shadow-md shadow-goldDark/30">
            <Image
              src={mezoterapiaNonInvasiveData.gallery[1].src}
              alt={mezoterapiaNonInvasiveData.gallery[1].alt ?? ""}
              fill
              className="object-fit"
            />
          </div>

          <div className="relative aspect-square w-full max-w-75 overflow-hidden rounded-lg border border-goldDark/25 ring-2 ring-goldDark/80 shadow-md shadow-goldDark/30">
            <Image
              src={mezoterapiaNonInvasiveData.gallery[2].src}
              alt={mezoterapiaNonInvasiveData.gallery[2].alt ?? ""}
              fill
              className="object-fit"
            />
          </div>

          <div className="relative aspect-square w-full max-w-75 overflow-hidden rounded-lg border border-goldDark/25 ring-2 ring-goldDark/80 shadow-md shadow-goldDark/30">
            <Image
              src={mezoterapiaNonInvasiveData.gallery[3].src}
              alt={mezoterapiaNonInvasiveData.gallery[3].alt ?? ""}
              fill
              className="object-fit"
            />
          </div>

          <div className="relative aspect-square w-full max-w-75 overflow-hidden rounded-lg border border-goldDark/25 ring-2 ring-goldDark/80 shadow-md shadow-goldDark/30">
            <Image
              src={mezoterapiaNonInvasiveData.gallery[4].src}
              alt={mezoterapiaNonInvasiveData.gallery[4].alt ?? ""}
              fill
              className="object-fit"
            />
          </div>
        </div>

        <div className="mt-10 2xl:mt-20">
          <Mezoterapia_pricing_form_non_invasive
            mezoterapiaNonInvasiveData={mezoterapiaNonInvasiveData}
          />
        </div>
      </div>
    </div>
  )
}
