"use client"

import AboutText from "../_components/about/AboutText"
import ExpandText from "../_components/ExpandText"
import { brandFont } from "../_components/fonts"
import { dataAboutUs } from "../_lib/data_services/data_about_us"

export default function Page() {
  return (
    <div className="w-full items-center justify-center px-6 py-8 lg:px-20 lg:py-10 2xl:px-44">
      <div className="section-shell fade-up grid grid-cols-1 gap-6 p-5 lg:grid-cols-2 lg:p-7">
        {/* Ľavý stĺpec – text */}
        <div className="flex flex-col">
          <h1
            className={`premium-title py-8 text-2xl font-semibold italic 2xl:text-5xl lg:py-14 ${brandFont.className}`}
          >
            <span className="italic">{dataAboutUs.sectionTitle}</span>
          </h1>
          <div className="[&_p]:text-justify">
            <p className="whitespace-pre-wrap text-sm leading-8 text-greyMain/85 xl:text-base 2xl:text-lg">
              <span className="italic">
                <strong>&ldquo;{dataAboutUs.quote}&rdquo;</strong>
                <span className="text-xs">
                  {" "}
                  <strong>{dataAboutUs.quoteAuthor}</strong>
                </span>
              </span>
              <br />
            </p>
            <ExpandText>
              <AboutText />
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
