"use client"

import { dataMezoterapia } from "@/app/_lib/data_services/data_mezoterapia"
import Image from "next/image"
import Link from "next/link"
import ExpandText from "../../ExpandText"
import { brandFont } from "../../fonts"
import Mezoterapia_text from "./Mezoterapia_text"

export default function Mezoterapia() {
  return (
    <div className="w-full items-center justify-center px-6 pt-10 2xl:px-44 lg:px-20 lg:pt-20">
      <div className="section-shell fade-up grid grid-cols-1 gap-4 p-5 lg:grid-cols-2 lg:gap-8 lg:p-8">
        <div className="flex flex-col py-10">
          <h1
            className={`premium-title pb-8 text-2xl font-semibold italic 2xl:text-5xl lg:pb-12 ${brandFont.className}`}
          >
            <span className="italic">
              <span className="text-3xl 2xl:text-6xl">
                {dataMezoterapia.pageTitle[0]}
              </span>
              {dataMezoterapia.pageTitle.slice(1)}
            </span>
          </h1>
          <div>
            <ExpandText>
              <Mezoterapia_text />
            </ExpandText>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 relative p-12">
          {/* vpravo hore */}
          <Link
            href="/cosmetics/mezoterapia/invasive"
            className="md:col-start-2 md:row-start-1 relative overflow-hidden rounded-lg border border-goldDark/25 shadow-md shadow-goldDark/15 h-full aspect-square"
          >
            <Image
              src={dataMezoterapia.collage[0].src}
              alt={dataMezoterapia.collage[0].alt}
              fill
              className="object-fit hover:cursor-pointer hover:scale-105 transition-transform duration-300"
            />
          </Link>

          {/* vlavo dole */}
          <Link
            href="/cosmetics/mezoterapia/non-invasive"
            className="md:col-start-1 md:row-start-2 relative overflow-hidden rounded-lg border border-goldDark/25 shadow-md shadow-goldDark/15 h-full aspect-square"
          >
            <Image
              src={dataMezoterapia.collage[1].src}
              alt={dataMezoterapia.collage[1].alt}
              fill
              className="object-fit hover:cursor-pointer hover:scale-105 transition-transform duration-300"
            />
          </Link>
        </div>
      </div>
    </div>
  )
}
