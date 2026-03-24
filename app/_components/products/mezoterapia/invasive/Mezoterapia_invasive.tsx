"use client"

import ExpandText from "@/app/_components/ExpandText"
import { brandFont } from "@/app/_components/fonts"
import { dataMezoterapiaInvasive } from "@/app/_lib/data_services/data_mezoterapia"
import Image from "next/image"
import Mezoterapia_pricing_form_invasive from "./Mezoterapia_pricing_form_invasive"
import Mezoterapia_text_invasive from "./Mezoterapia_text_invasive"

export default function Mezoterapia_invasive() {
  return (
    <div className="w-full items-center justify-center px-6 pt-10 2xl:px-44 lg:px-20 lg:pt-20">
      <div className="section-shell fade-up grid grid-cols-1 gap-4 p-5 lg:gap-8 lg:p-8">
        <div className="flex flex-col py-10">
          <h1
            className={`premium-title pb-8 text-2xl font-semibold italic 2xl:text-5xl lg:pb-12 ${brandFont.className}`}
          >
            <span className="italic">
              <span className="text-3xl 2xl:text-6xl">
                {dataMezoterapiaInvasive.name[0]}
              </span>
              {dataMezoterapiaInvasive.name.slice(1)}
            </span>
          </h1>
          <div>
            <ExpandText>
              <Mezoterapia_text_invasive />
            </ExpandText>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 relative px-6 gap-3">
          <div className="relative overflow-hidden rounded-lg border border-goldDark/25 shadow-md h-full aspect-4/3 ring-2 ring-goldDark/80 shadow-goldDark/30">
            <Image
              src={dataMezoterapiaInvasive.gallery[0].src}
              alt={dataMezoterapiaInvasive.gallery[0].alt ?? ""}
              fill
              className="object-fit"
            />
          </div>

          <div className="relative overflow-hidden rounded-lg border border-goldDark/25 shadow-md h-full aspect-4/3 ring-2 ring-goldDark/80 shadow-goldDark/30">
            <Image
              src={dataMezoterapiaInvasive.gallery[1].src}
              alt={dataMezoterapiaInvasive.gallery[1].alt ?? ""}
              fill
              className="object-fit"
            />
          </div>
          <div className="relative overflow-hidden rounded-lg border border-goldDark/25 shadow-md h-full aspect-4/3 ring-2 ring-goldDark/80 shadow-goldDark/30">
            <Image
              src={dataMezoterapiaInvasive.gallery[2].src}
              alt={dataMezoterapiaInvasive.gallery[2].alt ?? ""}
              fill
              className="object-fit"
            />
          </div>
          <div className="relative overflow-hidden rounded-lg border border-goldDark/25 shadow-md h-full aspect-4/3 ring-2 ring-goldDark/80 shadow-goldDark/30">
            <Image
              src={dataMezoterapiaInvasive.gallery[3].src}
              alt={dataMezoterapiaInvasive.gallery[3].alt ?? ""}
              fill
              className="object-fit"
            />
          </div>
          <div className="relative overflow-hidden rounded-lg border border-goldDark/25 shadow-md h-full aspect-4/3 ring-2 ring-goldDark/80 shadow-goldDark/30">
            <Image
              src={dataMezoterapiaInvasive.gallery[4].src}
              alt={dataMezoterapiaInvasive.gallery[4].alt ?? ""}
              fill
              className="object-fit"
            />
          </div>
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
          <Mezoterapia_pricing_form_invasive />
        </div>
      </div>
    </div>
  )
}
