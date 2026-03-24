"use client"

import ExpandText from "@/app/_components/ExpandText"
import { brandFont } from "@/app/_components/fonts"
import { dataKyselinaHyaluronovaFace } from "@/app/_lib/data_services/data_kyselina_hyaluronova"
import Image from "next/image"
import Kyselina_hyaluronova_pricing_form_face from "./Kyselina_hyaluronova_pricing_form_face"
import Kyselina_hyaluronova_text_face from "./Kyselina_hyaluronova_text_face"

export default function Kyselina_hyaluronova_face() {
  return (
    <div className="w-full items-center justify-center px-6 pt-10 2xl:px-44 lg:px-20 lg:pt-20">
      <div className="section-shell fade-up grid grid-cols-1 gap-4 p-5 lg:grid-cols-2 lg:gap-8 lg:p-8">
        <div className="flex flex-col py-10">
          <h1
            className={`premium-title pb-8 text-2xl font-semibold italic 2xl:text-5xl lg:pb-12 ${brandFont.className}`}
          >
            <span className="italic uppercase">
              {dataKyselinaHyaluronovaFace.name}
            </span>
          </h1>
          <div>
            <ExpandText>
              <Kyselina_hyaluronova_text_face />
            </ExpandText>
          </div>
        </div>

        <div className="relative mt-10 h-85 overflow-hidden rounded-lg border border-goldDark/25 bg-white shadow-md shadow-goldDark/15 md:h-125 lg:h-150 lg:w-full">
          <Image
            src="/images/kyselina_hyaluronova_face.jpeg"
            alt="Kyselina hyaluronová - Výplne na tvári"
            fill
            className="object-cover object-left"
          />
        </div>
      </div>

      <div className="mt-20">
        <Kyselina_hyaluronova_pricing_form_face />
      </div>
    </div>
  )
}
