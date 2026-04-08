"use client"

import ExpandText from "@/app/_components/ExpandText"
import { brandFont } from "@/app/_components/fonts"
import type { JaluproClassicProps } from "@/app/_lib/data_services/data_jalupro"
import Image from "next/image"
import Jalupro_classic_pricing_form from "./Jalupro_classic_pricing_form"
import Jalupro_classic_text from "./Jalupro_classic_text"

export default function Jalupro_classic({
  jaluproClassicData,
  user,
  isAdmin,
}: JaluproClassicProps & { user?: string | null; isAdmin?: boolean }) {
  const uploadedImageUrl = jaluproClassicData.image_url?.trim()

  return (
    <div className="w-full items-center justify-center px-6 pt-10 2xl:px-44 lg:px-20 lg:pt-20">
      <div className="section-shell fade-up grid grid-cols-1 gap-2 p-5 lg:grid-cols-2 lg:gap-4 lg:p-8">
        <div className="flex flex-col py-10">
          <h1
            className={`premium-title pb-8 text-2xl font-semibold italic 2xl:text-5xl lg:pb-12 ${brandFont.className}`}
          >
            <span className="italic">
              <span className="text-3xl 2xl:text-6xl">
                {jaluproClassicData.name[0]}
              </span>
              {jaluproClassicData.name.slice(1)}
            </span>
          </h1>
          <div>
            <ExpandText>
              <Jalupro_classic_text jaluproClassicData={jaluproClassicData} />
            </ExpandText>
          </div>
        </div>

        <div className="relative mt-10 w-full aspect-4/3 overflow-hidden rounded-lg border border-goldDark/25 shadow-md shadow-goldDark/15">
          <Image
            src={uploadedImageUrl || "/images/jalupro_main.jpeg"}
            alt="Jalupro"
            fill
            unoptimized
            className="object-cover"
          />
        </div>

        <div className="mt-10 2xl:mt-20 lg:col-span-2">
          <Jalupro_classic_pricing_form
            jaluproClassicData={jaluproClassicData}
            user={user}
            isAdmin={isAdmin}
          />
        </div>
      </div>
    </div>
  )
}
