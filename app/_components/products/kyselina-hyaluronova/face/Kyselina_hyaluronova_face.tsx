"use client"

import { brandFont } from "../../../fonts"

export default function Kyselina_hyaluronova_face() {
  return (
    <div className="w-full items-center justify-center px-6 pt-10 2xl:px-44 lg:px-20 lg:pt-20">
      <div className="section-shell fade-up p-8 text-center">
        <h1
          className={`premium-title text-2xl font-semibold italic 2xl:text-5xl ${brandFont.className}`}
        >
          Na stranke sa pracuje.
        </h1>
      </div>
    </div>
  )
}
