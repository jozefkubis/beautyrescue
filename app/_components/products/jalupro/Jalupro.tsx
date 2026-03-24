"use client"

import { dataJalupro } from "@/app/_lib/data_services/data_jalupro"
import Image from "next/image"
import Link from "next/link"
import ExpandText from "../../ExpandText"
import { brandFont } from "../../fonts"
import About_jalupro from "./About_jalupro"
import Jalupro_text from "./Jalupro_text"

export default function Jalupro() {
  const jaluproLinks = [
    "/medical-cosmetics/jalupro/classic",
    "/medical-cosmetics/jalupro/hmw",
    "/medical-cosmetics/jalupro/super_hydro",
    "/medical-cosmetics/jalupro/young_eye",
  ]

  return (
    <div className="w-full items-center justify-center px-6 pt-10 2xl:px-44 lg:px-20 lg:pt-20">
      <div className="section-shell fade-up grid grid-cols-1 gap-2 p-5 lg:grid-cols-2 lg:gap-4 lg:p-8">
        <div className="flex flex-col py-10">
          <h1
            className={`premium-title pb-8 text-2xl font-semibold italic 2xl:text-5xl lg:pb-12 ${brandFont.className}`}
          >
            <span className="italic">
              <span className="text-3xl 2xl:text-6xl">
                {dataJalupro.name[0]}
              </span>
              {dataJalupro.name.slice(1)}
            </span>
          </h1>
          <div>
            <ExpandText>
              <Jalupro_text />
            </ExpandText>
          </div>
        </div>

        <div className="relative mt-10 w-full aspect-4/3 overflow-hidden rounded-lg border border-goldDark/25 shadow-md shadow-goldDark/15">
          <Image
            src="/images/jalupro_main.jpeg"
            alt="Jalupro"
            fill
            className="object-cover"
          />
        </div>

        <div className="mt-10 2xl:mt-20 lg:col-span-2">
          <About_jalupro />
        </div>

        <div className="fade-up mt-10 2xl:mt-20 lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
            {dataJalupro.gallery.map(({ src, alt }, index) => (
              <Link
                href={
                  jaluproLinks[index] ?? "/medical-cosmetics/jalupro/classic"
                }
                key={src}
                className="relative aspect-square w-full overflow-hidden rounded-2xl border border-goldDark/25 shadow-md shadow-goldDark/15"
              >
                <Image
                  src={src}
                  alt={alt ?? ""}
                  fill
                  className="object-cover transition-transform duration-300 ease-out hover:scale-105 hover:cursor-pointer"
                />
              </Link>
            ))}
          </div>
        </div>

        {/* <div className="mt-10 lg:mt-12 lg:col-span-2">
        <Jalupro_pricing_form />
        </div> */}
      </div>
    </div>
  )
}
