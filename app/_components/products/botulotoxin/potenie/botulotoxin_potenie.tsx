"use client"

import ExpandTextLG from "@/app/_components/ExpandTextLG"
import { brandFont } from "@/app/_components/fonts"
import { dataBotulotoxinPotenie } from "@/app/_lib/data_services/data_botulotoxin"
import Image from "next/image"
import Botulotoxin_potenie_text from "./Botulotoxin_potenie_text"

export default function Botulotoxin_potenie() {
  return (
    <div className="w-full items-center justify-center px-6 pt-10 2xl:px-44 lg:px-20 lg:pt-20">
      <div className="section-shell fade-up grid grid-cols-1 gap-2 p-5 lg:grid-cols-2 lg:gap-4 lg:p-8">
        <div className="relative mt-2 aspect-4/3 w-full overflow-hidden rounded-sm border border-goldDark/10 lg:mt-0">
          <Image
            src="/images/botulotoxin_potenie.jpeg"
            alt="Botulotoxín nadmerné potenie"
            fill
            className="object-cover"
          />
        </div>

        <div className="flex flex-col py-3 lg:py-8">
          <h1
            className={`premium-title pb-4 text-2xl font-semibold italic 2xl:text-5xl lg:pb-6 ${brandFont.className}`}
          >
            <span className="italic text-goldDark">
              <span className="text-3xl 2xl:text-6xl">
                {dataBotulotoxinPotenie.pageTitle[0]}
              </span>
              {dataBotulotoxinPotenie.pageTitle.slice(1)}
            </span>
          </h1>

          <ExpandTextLG>
            <Botulotoxin_potenie_text />
          </ExpandTextLG>
        </div>
      </div>
    </div>
  )
}
