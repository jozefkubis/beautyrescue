"use client"

// import { dataAboutUs } from "@/app/_lib/data_services/data_about_us"
import type { AboutMainProps } from "@/app/_lib/data_services/data_about_us"
import ExpandText from "../ExpandText"
import { brandFont } from "../fonts"
import AboutText from "./AboutText"

export default function AboutMain({ aboutUsData }: AboutMainProps) {
  return (
    <div className="w-full items-center justify-center px-6 pt-10 2xl:px-44 lg:px-20 lg:pt-20">
      <div className="section-shell fade-up grid grid-cols-1 gap-6 p-5 lg:grid-cols-2 lg:p-7">
        {/* Ľavý stĺpec – text */}
        <div className="flex flex-col">
          <h1
            className={`premium-title py-8 text-2xl font-semibold italic 2xl:text-5xl  ${brandFont.className}`}
          >
            <span className="italic">{aboutUsData.name}</span>
          </h1>
          <div className="[&_p]:text-justify">
            <p className="whitespace-pre-wrap text-sm leading-8 text-greyMain/85 xl:text-base 2xl:text-lg">
              <span className="italic">
                <strong>&ldquo;{aboutUsData.summary}&rdquo;</strong>
                <span className="text-xs">
                  {" "}
                  <strong>{aboutUsData.metadata.quoteAuthor as string}</strong>
                </span>
              </span>
              <br />
            </p>
            <ExpandText>
              <AboutText aboutUsData={aboutUsData} />
            </ExpandText>
          </div>
        </div>

        {/* Pravý stĺpec – obrázok */}
        <div className="flex mt-10 items-center justify-center rounded-lg border border-goldDark/25 bg-linear-to-br from-[#fff7ea] to-[#ffeed9]">
          <h1 className="text-4xl font-semibold text-goldDark/45">Foto</h1>
        </div>
      </div>
    </div>
  )
}
