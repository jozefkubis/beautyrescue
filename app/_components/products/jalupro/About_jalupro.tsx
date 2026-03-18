"use client"

import { dataJalupro } from "@/app/_lib/data_services/data_jalupro"
import { useState } from "react"
import { MdKeyboardArrowDown } from "react-icons/md"

export default function About_jalupro() {
  const [openBox, setOpenBox] = useState(false)

  return (
    <section className="w-full items-center justify-center">
      <div className="w-full">
        <div className="section-shell fade-up rounded-lg border border-goldDark/25 bg-white shadow-md shadow-goldDark/15">
          <button
            type="button"
            onClick={() => setOpenBox((v) => !v)}
            className="group flex w-full items-center justify-between gap-2 p-4 text-left hover:cursor-pointer sm:p-5 lg:p-6"
          >
            <div>
              <h3 className="text-sm font-semibold tracking-tight text-zinc-900 xl:text-base">
                {dataJalupro.about.title}
              </h3>
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

          <div
            className={`
              overflow-hidden px-4 sm:px-5 lg:px-6
              transition-[max-height,opacity] duration-1500 ease-in-out
              ${openBox ? "max-h-350 opacity-100" : "max-h-0 opacity-0"}
            `}
          >
            <div className="pb-6 pt-1 flex flex-col gap-3 [&_p]:text-justify">
              <div className="space-y-1">
                <h4 className="text-xs xl:text-sm font-semibold tracking-wide uppercase text-zinc-900">
                  {dataJalupro.about.effectsTitle}
                </h4>
                <ul className="list-disc pl-5 space-y-1 text-xs xl:text-sm leading-relaxed text-zinc-700">
                  {dataJalupro.about.effects.map((effect) => (
                    <li key={effect}>{effect}</li>
                  ))}
                </ul>
              </div>

              <p className="text-xs xl:text-sm leading-relaxed text-zinc-700">
                <strong>Efekt:</strong> {dataJalupro.about.effectSummary}
              </p>

              <div className="space-y-2">
                <h4 className="text-xs xl:text-sm font-semibold tracking-wide uppercase text-zinc-900">
                  {dataJalupro.about.treatmentTitle}
                </h4>
                {dataJalupro.about.treatmentParagraphs.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-xs xl:text-sm leading-relaxed text-zinc-700"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="space-y-2">
                <h4 className="text-xs xl:text-sm font-semibold tracking-wide uppercase text-zinc-900">
                  {dataJalupro.about.aftercareTitle}
                </h4>
                {dataJalupro.about.aftercareParagraphs.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-xs xl:text-sm leading-relaxed text-zinc-700"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              <p className="text-xs xl:text-sm leading-relaxed text-zinc-700">
                <strong>Varianty Jalupro:</strong> {dataJalupro.about.variants}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
