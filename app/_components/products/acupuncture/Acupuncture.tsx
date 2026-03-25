"use client"

import { AcupunctureMainProps } from "@/app/_lib/data_services/data_acupuncture"
import Image from "next/image"
import ExpandText from "../../ExpandText"
import { brandFont } from "../../fonts"
import Acupuncture_pricing_form from "./Acupuncture_pricing_form"
import Acupuncture_text from "./Acupuncture_text"

export default function Acupuncture({ acupunctureData }: AcupunctureMainProps) {
  return (
    <div className="w-full items-center justify-center px-6 pt-10 2xl:px-44 lg:px-20 lg:pt-20">
      <div className="section-shell fade-up grid grid-cols-1 gap-2 p-5 lg:grid-cols-2 lg:gap-4 lg:p-8">
        <div className="flex flex-col py-10">
          <h1
            className={`premium-title pb-8 text-2xl font-semibold italic 2xl:text-5xl lg:pb-12 ${brandFont.className}`}
          >
            <span className="italic">
              <span className="text-3xl 2xl:text-6xl">
                {acupunctureData.name[0]}
              </span>
              {acupunctureData.name.slice(1)}
            </span>
          </h1>
          <div>
            <ExpandText>
              <Acupuncture_text acupunctureData={acupunctureData} />
            </ExpandText>
          </div>
        </div>

        <div className="relative mt-10 w-full aspect-4/3 overflow-hidden rounded-lg border border-goldDark/25 shadow-md shadow-goldDark/15">
          <Image
            src="/images/acupuncture_main.jpeg"
            alt="Lekárska akupunktúra"
            fill
            className="object-cover"
          />
        </div>

        <div className="mt-10 2xl:mt-20 lg:col-span-2">
          <Acupuncture_pricing_form />
        </div>
      </div>
    </div>
  )
}
