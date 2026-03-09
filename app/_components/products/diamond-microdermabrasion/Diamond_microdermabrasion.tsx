"use client"

import Image from "next/image"
import ExpandText from "../../ExpandText"
import { brandFont } from "../../fonts"
import Diamond_microdermabrasion_text from "./Diamond_microdermabrasion_text"

export default function Diamond_microdermabrasion() {
  return (
    <div className="w-full justify-center items-center px-6 lg:px-20 2xl:px-44 lg:pt-30">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
        <div className="flex flex-col py-10">
          <h1
            className={`italic text-2xl 2xl:text-5xl pb-8 lg:pb-12 font-semibold text-goldDark ${brandFont.className}`}
          >
            <span className="italic">
              <span className="text-3xl 2xl:text-6xl">D</span>iamantová
              mikrodermabrázia
            </span>
          </h1>
          <div>
            <ExpandText>
              <Diamond_microdermabrasion_text />
            </ExpandText>
          </div>
        </div>

        <div className="relative w-full aspect-4/3 rounded-lg overflow-hidden shadow-goldDark shadow-sm mt-10">
          <Image
            src="/images/diamond_microdermabrasion.jpeg"
            alt="Diamond microdermabrasion"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  )
}
