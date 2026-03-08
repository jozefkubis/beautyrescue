"use client"

import Image from "next/image"
import ExpandText from "../../about/ExpandText"
import { brandFont } from "../../fonts"
import { chemicalPeelingText } from "./Chemical_peeling_text"

export default function Chemical_peeling() {
  return (
    <div className="w-full justify-center items-center px-6 lg:px-20 2xl:px-44 py-8 lg:py-30">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 ">
        <div className="flex flex-col">
          <h1
            className={`italic text-4xl 2xl:text-5xl py-8 lg:py-12 font-semibold text-goldDark ${brandFont.className}`}
          >
            <span className="italic">
              <span className="text-5xl 2xl:text-6xl">C</span>hemický peeling
            </span>
          </h1>
          <div>
            <ExpandText text={chemicalPeelingText} />
          </div>
        </div>

        <div className="relative h-56 md:h-125 lg:w-full lg:h-full rounded-lg overflow-hidden shadow-goldDark shadow-sm">
          <Image
            src="/images/chemical_peeling.jpeg"
            alt="Chemical peeling"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  )
}
