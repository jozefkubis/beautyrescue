"use client"

import { dataKyselinaHyaluronova } from "@/app/_lib/data_services/data_kyselina_hyaluronova"
import Image from "next/image"
import ExpandText from "../../ExpandText"
import { brandFont } from "../../fonts"
import Kyselina_hyaluronova_pricing_form from "./Kyselina_hyaluronova_pricing_form"
import Kyselina_hyaluronova_text from "./Kyselina_hyaluronova_text"

export default function Kyselina_hyaluronova() {
  return (
    <div className="w-full items-center justify-center px-6 pt-10 2xl:px-44 lg:px-20 lg:pt-20">
      <div className="section-shell fade-up grid grid-cols-1 gap-4 p-5 lg:grid-cols-2 lg:gap-8 lg:p-8">
        <div className="flex flex-col py-10">
          <h1
            className={`premium-title pb-8 text-2xl font-semibold italic 2xl:text-5xl lg:pb-12 ${brandFont.className}`}
          >
            <span className="italic">
              <span className="text-3xl 2xl:text-6xl">
                {dataKyselinaHyaluronova.pageTitle[0]}
              </span>
              {dataKyselinaHyaluronova.pageTitle.slice(1)}
            </span>
          </h1>
          <div>
            <ExpandText>
              <Kyselina_hyaluronova_text />
            </ExpandText>
          </div>
        </div>

        <div className="relative mt-10 h-56 overflow-hidden rounded-lg border border-goldDark/25 shadow-md shadow-goldDark/15 md:h-125 lg:h-[90%] lg:w-full aspect-auto">
          <Image
            src="/images/kyselina_hyaluronova.jpeg"
            alt="Kyselina hyaluronová"
            fill
            className="object-cover"
          />
        </div>
      </div>

      <div dataKyselinaHyaluronova.gallery   alt: "Kyselina hyaluronová 2",
            },
          ].map(({ src, alt }) => (
            <div
              key={src}
              className="relative aspect-square w-1/4 overflow-hidden rounded-2xl border border-goldDark/25 shadow-md shadow-goldDark/15"
            >
              <Image
                src={src}
                alt={alt}
                fill
                className="object-cover transition-transform duration-300 ease-out hover:scale-105 hover:cursor-pointer"
                priority={false}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-20">
        <Kyselina_hyaluronova_pricing_form />
      </div>
    </div>
  )
}
