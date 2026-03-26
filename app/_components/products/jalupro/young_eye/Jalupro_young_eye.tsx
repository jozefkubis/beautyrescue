"use client"

import ExpandText from "@/app/_components/ExpandText"
import { brandFont } from "@/app/_components/fonts"
import type { JaluproYoungEyeProps } from "@/app/_lib/data_services/data_jalupro"
import Image from "next/image"
import Jalupro_young_eye_pricing_form from "./Jalupro_young_eye_pricing_form"
import Jalupro_young_eye_text from "./Jalupro_young_eye_text"

export default function Jalupro_young_eye({
  jaluproYoungEyeData,
  user,
  isAdmin,
}: JaluproYoungEyeProps & { user?: string | null; isAdmin?: boolean }) {
  return (
    <div className="w-full items-center justify-center px-6 pt-10 2xl:px-44 lg:px-20 lg:pt-20">
      <div className="section-shell fade-up grid grid-cols-1 gap-2 p-5 lg:grid-cols-2 lg:gap-4 lg:p-8">
        <div className="flex flex-col py-10">
          <h1
            className={`premium-title pb-8 text-2xl font-semibold italic 2xl:text-5xl lg:pb-12 ${brandFont.className}`}
          >
            <span className="italic">
              <span className="text-3xl 2xl:text-6xl">
                {jaluproYoungEyeData.name[0]}
              </span>
              {jaluproYoungEyeData.name.slice(1)}
            </span>
          </h1>
          <div>
            <ExpandText>
              <Jalupro_young_eye_text data={jaluproYoungEyeData} />
            </ExpandText>
          </div>
        </div>

        <div className="relative mt-10 w-full aspect-4/3 overflow-hidden rounded-lg border border-goldDark/25 shadow-md shadow-goldDark/15">
          <Image
            src="/images/jalupro_young_eye.jpeg"
            alt="Jalupro Young Eye"
            fill
            className="object-cover"
          />
        </div>

        <div className="mt-10 2xl:mt-20 lg:col-span-2">
          <Jalupro_young_eye_pricing_form
            jaluproYoungEyeData={jaluproYoungEyeData}
            user={user}
            isAdmin={isAdmin}
          />
        </div>
      </div>
    </div>
  )
}
