"use client"

import AboutText from "../_components/about/AboutText"
import ExpandText from "../_components/ExpandText"
import { brandFont } from "../_components/fonts"

export default function Page() {
  return (
    <div className="w-full items-center justify-center px-6 py-8 lg:px-20 lg:py-10 2xl:px-44">
      <h1
        className={`premium-title py-8 text-2xl font-semibold italic 2xl:text-5xl lg:py-14 ${brandFont.className}`}
      >
        <span className="italic">
          <span className="text-3xl 2xl:text-6xl">
            <span className="text-sm">...</span>O
          </span>{" "}
          nás
        </span>
      </h1>
      <div className="section-shell fade-up grid grid-cols-1 gap-4 p-5 lg:grid-cols-2 lg:p-7">
        <div>
          <p className="whitespace-pre-wrap text-sm leading-8 text-greyMain/85 xl:text-base 2xl:text-lg">
            <span className="italic">
              „Krása je vonkajší manifest vnútorného zdravia.“
              <span className="text-xs">
                {" "}
                (Katie Brindle, expertka v čínskej medicíne)
              </span>
            </span>
            <br />
          </p>
          <ExpandText>
            <AboutText />
          </ExpandText>
        </div>

        <div className="flex h-full items-center justify-center rounded-lg border border-goldDark/25 bg-linear-to-br from-[#fff7ea] to-[#ffeed9]">
          <h1 className="text-4xl font-semibold text-goldDark/45">Foto</h1>
        </div>
      </div>
    </div>
  )
}
