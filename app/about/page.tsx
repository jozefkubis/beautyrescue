"use client"

import AboutText from "../_components/about/AboutText"
import ExpandText from "../_components/ExpandText"
import { brandFont } from "../_components/fonts"

export default function Page() {
  return (
    <div className="w-full justify-center items-center px-6 lg:px-20 2xl:px-44 py-8 lg:py-10">
      <h1
        className={`italic text-2xl 2xl:text-5xl py-8 lg:py-14 font-semibold text-goldDark ${brandFont.className}`}
      >
        <span className="italic">
          <span className="text-3xl 2xl:text-6xl">
            <span className="text-sm">...</span>O
          </span>{" "}
          nás
        </span>
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 ">
        <div>
          <p className="text-gray-700 leading-8 text-sm xl:text-base 2xl:text-lg whitespace-pre-wrap">
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

        <div className="flex items-center justify-center bg-gray-200 rounded-lg h-full">
          <h1 className="text-4xl font-semibold text-gray-300">Foto</h1>
        </div>
      </div>
    </div>
  )
}
