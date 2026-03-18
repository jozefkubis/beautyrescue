"use client"

import { dataProfhilo } from "@/app/_lib/data_services/data_profhilo"
import Image from "next/image"
import ExpandText from "../../ExpandText"
import { brandFont } from "../../fonts"
import Profhilo_text from "./Profhilo_text"

export default function Profhilo() {
  return (
    <div className="w-full items-center justify-center px-6 pt-10 2xl:px-44 lg:px-20 lg:pt-20">
      <div className="section-shell fade-up grid grid-cols-1 gap-2 p-5 lg:grid-cols-2 lg:gap-4 lg:p-8">
        <div className="flex flex-col py-10">
          <h1
            className={`premium-title pb-8 text-2xl font-semibold italic 2xl:text-5xl lg:pb-12 ${brandFont.className}`}
          >
            <span className="italic">
              <span className="text-3xl 2xl:text-6xl">{dataProfhilo.pageTitle[0]}</span>
              {dataProfhilo.pageTitle.slice(1)}
            </span>
          </h1>
          <div>
            <ExpandText>
              <Profhilo_text />
            </ExpandText>
          </div>
        </div>

        <div className="relative mt-10 w-full aspect-4/3 overflow-hidden rounded-lg border border-goldDark/25 shadow-md shadow-goldDark/15">
          <Image
            src="/images/profhilo_main.jpeg"
            alt="Profhilo"
            fill
            className="object-cover"
          />
        </div>
      </div>

      <div className="fade-up mt-10 lg:mt-12">
        <div className="flex justify-around gap-3 sm:gap-4 lg:gap-5">
          {dataProfhilo.gallery.map(({ src, alt }) => (
            <div
              key={src}
              className="relative aspect-square w-1/4 overflow-hidden rounded-2xl border border-goldDark/25 shadow-md shadow-goldDark/15"
            >
              <Image
                src={src}
                alt={alt}
                fill
                className="object-cover transition-transform duration-300 ease-out hover:scale-105 hover:cursor-pointer"
              />
            </div>
          ))}
        </div>
      </div>

      {/* <div className="mt-10 lg:mt-12">
        <Profhilo_pricing_form />
      </div> */}
    </div>
  )
}
