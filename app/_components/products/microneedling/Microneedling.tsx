"use client"

import Image from "next/image"
import ExpandText from "../../ExpandText"
import { brandFont } from "../../fonts"
import Microneedling_pricing_form from "./Microneedling_pricing_form"
import Microneedling_text from "./Microneedling_text"

export default function Microneedling() {
  return (
    <div className="w-full items-center justify-center px-6 lg:px-20 lg:pt-30 2xl:px-44">
      <div className="section-shell fade-up grid grid-cols-1 gap-4 p-5 lg:grid-cols-2 lg:gap-8 lg:p-8">
        <div className="flex flex-col py-10">
          <h1
            className={`premium-title pb-8 text-2xl font-semibold italic 2xl:text-5xl lg:pb-12 ${brandFont.className}`}
          >
            <span className="italic">
              <span className="text-3xl 2xl:text-6xl">M</span>icroneedling
            </span>
          </h1>
          <div>
            <ExpandText>
              <Microneedling_text />
            </ExpandText>
          </div>
        </div>

        <div className="relative mt-10 w-full aspect-4/3 overflow-hidden rounded-lg border border-goldDark/25 shadow-md shadow-goldDark/15">
          <div className="absolute inset-0 bg-linear-to-br from-white via-white/10 to-white z-50"></div>
          <Image
            src="/images/microneedling.jpg"
            alt="Microneedling"
            fill
            className="object-cover"
          />
        </div>
      </div>

      <div className="mt-20">
        <Microneedling_pricing_form />
      </div>
    </div>
  )
}
