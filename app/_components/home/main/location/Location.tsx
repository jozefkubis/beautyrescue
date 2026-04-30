"use client";

import Image from "next/image";
import { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

export default function Location() {
  const [openBox, setOpenBox] = useState(false);

  return (
    <section className="fade-up flex flex-col items-center px-4 py-12 sm:px-8 sm:py-14 lg:px-44 lg:py-16">
      <div className="w-full max-w-3xl xl:max-w-6xl">
        <div
          className="
            rounded-2xl border border-goldDark/35 bg-linear-to-b from-white to-[#fff3e4]
            shadow-[0_18px_40px_rgba(157,116,16,0.14)]
          "
        >
          {/* Header */}
          <button
            type="button"
            onClick={() => setOpenBox((v) => !v)}
            className="group flex w-full items-center justify-between gap-4 p-4 text-left hover:cursor-pointer sm:p-5 lg:p-6"
            // aria-expanded={openBox}
          >
            <div>
              <h3 className="text-sm font-semibold tracking-tight text-zinc-900 xl:text-base">
                Ako sa k nám dostanete?
              </h3>
              <p className="mt-1 text-xs text-zinc-600 xl:text-sm">
                Presná adresa + parkovanie + fotky miesta
              </p>
            </div>

            <span
              className="
                inline-flex h-10 w-10 items-center justify-center rounded-full
                border border-goldDark/35 bg-white/75
                shadow-sm shadow-goldDark/15
                transition-transform duration-300 ease-out
                group-hover:scale-105
              "
            >
              <MdKeyboardArrowDown
                className={`text-2xl text-goldDark transition-transform duration-300 ease-out ${
                  openBox ? "rotate-180" : "rotate-0"
                }`}
              />
            </span>
          </button>

          {/* Animated content */}
          <div
            className={`
              overflow-hidden px-4 sm:px-5 lg:px-6
              transition-[max-height,opacity] duration-1500 ease-in-out
              ${openBox ? "max-h-250 opacity-100" : "max-h-0 opacity-0"}
            `}
          >
            <div className="pb-6 pt-1">
              <p className="text-xs xl:text-sm leading-relaxed text-zinc-700">
                Štúdio Beauty Rescue sa nachádza na žilinskom sídlisku Hájik, v
                jeho novšej štvrti nad zastávkou M. Bela – na ulici Korzo. Korzo
                je slepá ulica pri panelovom dome s označením E6. Parkovať
                môžete kdekoľvek.
              </p>

              <div className="mt-5 flex flex-col justify-around gap-4 sm:mt-6 lg:flex-row sm:grid-cols-2">
                <div className="relative h-52 aspect-4/3 overflow-hidden rounded-2xl border border-goldDark/25 bg-white shadow-md shadow-goldDark/15 sm:h-56 lg:h-60 xl:h-64">
                  <Image
                    src="/images/studio_location1.jpeg"
                    alt="Beauty Rescue Žilina Hájik exteriér štúdia"
                    fill
                    className="h-52 w-full object-cover transition-transform duration-300 ease-out hover:scale-105 hover:cursor-pointer sm:h-56 lg:h-60 xl:h-64"
                    priority={false}
                  />
                </div>

                <div className="relative h-52 aspect-4/3 overflow-hidden rounded-2xl border border-goldDark/25 bg-white shadow-md shadow-goldDark/15 sm:h-56 lg:h-60 xl:h-64">
                  <Image
                    src="/images/studio_location2.jpeg"
                    alt="Beauty Rescue Žilina Hájik vstup k štúdiu"
                    fill
                    className="h-52 w-full object-cover transition-transform duration-300 ease-out hover:scale-105 hover:cursor-pointer sm:h-56 lg:h-60 xl:h-64"
                    priority={false}
                  />
                </div>

                <div className="relative h-52 aspect-4/3 overflow-hidden rounded-2xl border border-goldDark/25 bg-white shadow-md shadow-goldDark/15 sm:h-56 lg:h-60 xl:h-64">
                  <a
                    title="Google Maps - Korzo 8707/8, 010 15 Žilina-Hájik"
                    href="https://www.google.com/maps/place/Korzo+8707%2F8,+010+15+%C5%BDilina-H%C3%A1jik/@49.2114221,18.6921066,15z/data=!3m1!4b1!4m6!3m5!1s0x47145e949e06440b:0xb9e41028416cd805!8m2!3d49.2114096!4d18.7105605!16s%2Fg%2F11yfdg47mw?entry=ttu&g_ep=EgoyMDI2MDQwNS4wIKXMDSoASAFQAw%3D%3D"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src="/images/studio_location3.jpeg"
                      alt="Beauty Rescue Žilina Hájik mapa a okolie"
                      fill
                      className="h-52 w-full object-cover transition-transform duration-300 ease-out hover:scale-105 hover:cursor-pointer sm:h-56 lg:h-60 xl:h-64"
                      priority={false}
                    />
                  </a>
                </div>
              </div>

              {/* Optional: little footer line */}
              <div className="mt-5 rounded-xl border border-goldDark/25 bg-white/75 px-4 py-3 text-xs text-zinc-600 shadow-sm shadow-goldDark/10">
                Tip: Ak ideš prvýkrát, zadaj do navigácie „Korzo, Hájik, Žilina“
                a hľadaj panelák <span className="font-semibold">E6</span>,
                alebo klikni na mapu vyššie.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
