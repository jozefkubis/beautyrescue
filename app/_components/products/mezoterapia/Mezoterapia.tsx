"use client"

import Image from "next/image"
import ExpandText from "../../ExpandText"
import { brandFont } from "../../fonts"
import Mezoterapia_text from "./Mezoterapia_text"

export default function Mezoterapia() {
  return (
    <div className="w-full items-center justify-center px-6 lg:px-20 lg:pt-30 2xl:px-44">
      <div className="section-shell fade-up grid grid-cols-1 gap-4 p-5 lg:grid-cols-2 lg:gap-8 lg:p-8">
        <div className="flex flex-col py-10">
          <h1
            className={`premium-title pb-8 text-2xl font-semibold italic 2xl:text-5xl lg:pb-12 ${brandFont.className}`}
          >
            <span className="italic">
              <span className="text-3xl 2xl:text-6xl">M</span>ezoterapia
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
          <div className="md:col-start-2 md:row-start-1 relative overflow-hidden rounded-lg border border-goldDark/25 shadow-md shadow-goldDark/15 h-full aspect-square">
            <Image
              src="/images/mezoterapia1.jpeg"
              alt="Mezoterapia1"
              fill
              className="object-fit"
            />
          </div>

          {/* vlavo dole */}
          <div className="md:col-start-1 md:row-start-2 relative overflow-hidden rounded-lg border border-goldDark/25 shadow-md shadow-goldDark/15 h-full aspect-square">
            <Image
              src="/images/mezoterapia2.jpeg"
              alt="Mezoterapia2"
              fill
              className="object-fit"
            />
          </div>
        </div>
      </div>

      {/* <div className="mt-20">
        <Mezoterapia_pricing_form />
      </div> */}
    </div>
  )
}
