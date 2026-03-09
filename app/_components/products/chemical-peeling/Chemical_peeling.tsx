"use client"

import Image from "next/image"
import ExpandText from "../../ExpandText"
import { brandFont } from "../../fonts"
import Chem_peeling_pricing_form from "./Chem_peeling_pricing_form"
import Chemical_peeling_text from "./Chemical_peeling_text"

export default function Chemical_peeling() {
  return (
    <div className="w-full justify-center items-center px-6 lg:px-20 2xl:px-44 lg:pt-30">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
        <div className="flex flex-col py-10">
          <h1
            className={`italic text-2xl 2xl:text-5xl pb-8 lg:pb-12 font-semibold text-goldDark ${brandFont.className}`}
          >
            <span className="italic">
              <span className="text-3xl 2xl:text-6xl">C</span>hemický peeling
            </span>
          </h1>
          <div>
            <ExpandText>
              <Chemical_peeling_text />
            </ExpandText>
          </div>
        </div>

        <div className="relative h-56 md:h-125 lg:w-full lg:h-[90%] rounded-lg overflow-hidden shadow-goldDark shadow-sm mt-10">
          <Image
            src="/images/chemical_peeling.jpeg"
            alt="Chemical peeling"
            fill
            className="object-cover"
          />
        </div>
      </div>

      <div className="mt-20">
        <Chem_peeling_pricing_form />
      </div>
    </div>
  )
}
