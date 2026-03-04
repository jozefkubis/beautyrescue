"use client"

import Image from "next/image"
import { useState } from "react"
import { MdKeyboardArrowDown } from "react-icons/md"

export default function Location() {
  const [openBox, setOpenBox] = useState(false)

  return (
    <section className="flex flex-col items-center px-6 py-16 sm:px-10 2xl:px-44">
      <div className="w-full max-w-5xl">
        <div
          className="
            rounded-2xl border border-[#b9800d]/40 bg-gradient-to-b from-white to-[#fff7e6]
            shadow-lg shadow-[#b9800d]/15 
          "
        >
          {/* Header */}
          <button
            type="button"
            onClick={() => setOpenBox((v) => !v)}
            className="group flex w-full items-center justify-between gap-4 p-5 sm:p-6 text-left hover:cursor-pointer"
            // aria-expanded={openBox}
          >
            <div>
              <h3 className="text-base sm:text-lg font-semibold tracking-tight text-zinc-900">
                Ako sa k nám dostanete?
              </h3>
              <p className="mt-1 text-sm text-zinc-600">
                Presná adresa + parkovanie + fotky miesta
              </p>
            </div>

            <span
              className="
                inline-flex h-10 w-10 items-center justify-center rounded-full
                border border-[#b9800d]/40 bg-white/70
                shadow-sm shadow-[#b9800d]/10
                transition-transform duration-300 ease-out
                group-hover:scale-105
              "
            >
              <MdKeyboardArrowDown
                className={`text-2xl text-[#b9800d] transition-transform duration-300 ease-out ${
                  openBox ? "rotate-180" : "rotate-0"
                }`}
              />
            </span>
          </button>

          {/* Animated content */}
          <div
            className={`
              overflow-hidden px-5 sm:px-6
              transition-[max-height,opacity] duration-1500 ease-in-out
              ${openBox ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}
            `}
          >
            <div className="pb-6 pt-1">
              <p className="text-sm leading-relaxed text-zinc-700">
                Štúdio Beauty Rescue sa nachádza na žilinskom sídlisku Hájik, v
                jeho novšej štvrti nad zastávkou M. Bela – na ulici Korzo. Korzo
                je slepá ulica pri panelovom dome s označením E6. Parkovať
                môžete kdekoľvek.
              </p>

              <div className="mt-5 grid gap-4 sm:mt-6 sm:grid-cols-2">
                <div className="relative overflow-hidden rounded-2xl border border-[#b9800d]/30 bg-white shadow-md shadow-[#b9800d]/10">
                  <Image
                    src="/images/studio_location1.jpeg"
                    alt="Studio location 1"
                    width={800}
                    height={600}
                    className="hover:cursor-pointer h-56 w-full object-cover hover:scale-105 transition-transform duration-300 ease-out sm:h-64"
                    priority={false}
                  />
                </div>

                <div className="relative overflow-hidden rounded-2xl border border-[#b9800d]/30 bg-white shadow-md shadow-[#b9800d]/10">
                  <Image
                    src="/images/studio_location2.jpeg"
                    alt="Studio location 2"
                    width={800}
                    height={600}
                    className="hover:cursor-pointer h-56 w-full object-cover hover:scale-105 transition-transform duration-300 ease-out sm:h-64"
                    priority={false}
                  />
                </div>
              </div>

              {/* Optional: little footer line */}
              <div className="mt-5 rounded-xl bg-white/70 px-4 py-3 text-xs text-zinc-600 border border-[#b9800d]/25">
                Tip: Ak ideš prvýkrát, zadaj do navigácie „Korzo, Hájik, Žilina“
                a hľadaj panelák <span className="font-semibold">E6</span>.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
