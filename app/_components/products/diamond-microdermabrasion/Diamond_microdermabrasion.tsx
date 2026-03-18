"use client"

import { dataDiamondMicrodermabrasion } from "@/app/_lib/data_services/data_diamond_microdermabrasion"
import Image from "next/image"
import ExpandText from "../../ExpandText"
import { brandFont } from "../../fonts"
import Diamond_microdermabrasion_text from "./Diamond_microdermabrasion_text"
import Dimond_micro_pricing_form from "./Dimond_micro_pricing_form"

export default function Diamond_microdermabrasion() {
  return (
    <div className="w-full items-center justify-center px-6 pt-10 2xl:px-44 lg:px-20 lg:pt-20">
      <div className="section-shell fade-up grid grid-cols-1 gap-4 p-5 lg:grid-cols-2 lg:gap-8 lg:p-8">
        <div className="flex flex-col py-10">
          <h1
            className={`premium-title pb-8 text-2xl font-semibold italic 2xl:text-5xl lg:pb-12 ${brandFont.className}`}
          >
            <span className="italic">
              <span className="text-3xl 2xl:text-6xl">
                {dataDiamondMicrodermabrasion.pageTitle[0]}
              </span>
              {dataDiamondMicrodermabrasion.pageTitle.slice(1)}
            </span>
          </h1>
          <div>
            <ExpandText>
              <Diamond_microdermabrasion_text />
            </ExpandText>
          </div>
        </div>

        <div className="relative mt-10 w-full aspect-4/3 overflow-hidden rounded-lg border border-goldDark/25 shadow-md shadow-goldDark/15">
          <Image
            src="/images/diamond_microdermabrasion.jpeg"
            alt="Diamond microdermabrasion"
            fill
            className="object-cover"
          />
        </div>
      </div>

      <div className="mt-20">
        <Dimond_micro_pricing_form />
      </div>
    </div>
  )
}
