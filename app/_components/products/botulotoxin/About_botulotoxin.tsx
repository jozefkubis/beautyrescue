"use client"

import type { BotulotoxinMainProps } from "@/app/_lib/data_services/data_botulotoxin"
import { useState } from "react"
import { MdKeyboardArrowDown } from "react-icons/md"

export default function About_botulotoxin({
  botulotoxinData,
}: BotulotoxinMainProps) {
  const [openBox, setOpenBox] = useState(false)
  const about = botulotoxinData.content.about
  const paragraphs = about.paragraphs ?? []

  return (
    <section className="w-full items-center justify-center">
      <div className="w-full">
        <div className="section-shell fade-up rounded-lg border border-goldDark/25 bg-white shadow-md shadow-goldDark/15">
          {/* Header */}
          <button
            type="button"
            onClick={() => setOpenBox((v) => !v)}
            className="group flex w-full items-center justify-between gap-2 p-4 text-left hover:cursor-pointer sm:p-5 lg:p-6"
            // aria-expanded={openBox}
          >
            <div>
              <h4 className="text-lg font-semibold italic tracking-tight text-goldDark sm:text-xl lg:text-[1.75rem]">
                {about.title as string}
              </h4>
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
              transition-[max-height,opacity] duration-500 ease-in-out
              ${openBox ? "max-h-250 opacity-100" : "max-h-0 opacity-0"}
            `}
          >
            <div className="pb-6 pt-1 flex flex-col gap-2 [&_p]:text-justify">
              {paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-xs xl:text-sm leading-relaxed text-zinc-700"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
