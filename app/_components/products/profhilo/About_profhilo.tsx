"use client"

import { dataProfhilo } from "@/app/_lib/data_services/data_profhilo"
import Image from "next/image"
import { useState } from "react"
import { MdKeyboardArrowDown } from "react-icons/md"

export default function About_profhilo() {
  const [openBox, setOpenBox] = useState<number | null>(null)

  const sectionDescriptions = [
    "Hydratácia, spevnenie a prirodzené omladenie pleti.",
    "Obnova strateného objemu a spevnenie kontúr tváre.",
  ]

  const sectionImages = [
    { src: "/images/profhilo_main.jpeg", alt: "Profhilo" },
    { src: "/images/profhilo-3.jpeg", alt: "Profhilo Structura" },
  ]

  function handleToggle(index: number) {
    setOpenBox((current) => (current === index ? null : index))
  }

  return (
    <section className="w-full items-center justify-center">
      <div className="w-full space-y-4 lg:space-y-5">
        {dataProfhilo.about.sections.map((section, index) => {
          const isOpen = openBox === index

          return (
            <article
              key={section.product}
              className={`
                section-shell fade-up overflow-hidden rounded-[28px] border backdrop-blur-sm
                transition-all duration-300
                ${
                  isOpen
                    ? "border-redMain/20 bg-[linear-gradient(180deg,rgba(255,250,244,0.96)_0%,rgba(255,246,238,0.98)_100%)] shadow-[0_22px_50px_rgba(157,116,16,0.14)]"
                    : "border-goldDark/15 bg-white/75 shadow-[0_10px_24px_rgba(157,116,16,0.08)] hover:-translate-y-0.5 hover:shadow-[0_18px_34px_rgba(157,116,16,0.12)]"
                }
              `}
            >
              <button
                type="button"
                onClick={() => handleToggle(index)}
                className="group w-full text-left"
              >
                <div className="flex items-center justify-between gap-4 px-5 py-5 sm:px-7 sm:py-6 lg:px-8 hover:cursor-pointer">
                  <div className="flex min-w-0 items-start gap-4">
                    <span
                      className={`
                        mt-1 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-xs font-semibold
                        transition-all duration-300
                        ${
                          isOpen
                            ? "border-redMain/30 bg-redMain/10 text-redDark"
                            : "border-goldDark/20 bg-goldLight/10 text-goldDark"
                        }
                      `}
                    >
                      {index + 1}
                    </span>

                    <div className="min-w-0">
                      <h4 className="text-lg font-semibold italic tracking-tight text-goldDark sm:text-xl lg:text-[1.75rem]">
                        {section.product}
                      </h4>

                      <p
                        className={`
                          mt-1 max-w-2xl text-sm leading-relaxed transition-colors duration-300 sm:text-[15px]
                          ${isOpen ? "text-neutral-700" : "text-neutral-500"}
                        `}
                      >
                        {sectionDescriptions[index] ?? section.whatTitle}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`
                      inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border bg-white/90
                      shadow-sm transition-all duration-300 group-hover:scale-105
                      ${
                        isOpen
                          ? "border-redMain/30 shadow-redMain/10"
                          : "border-goldDark/20 shadow-goldDark/10"
                      }
                    `}
                  >
                    <MdKeyboardArrowDown
                      className={`
                        text-2xl transition-transform duration-300 ease-out
                        ${
                          isOpen
                            ? "rotate-180 text-redDark"
                            : "rotate-0 text-goldDark"
                        }
                      `}
                    />
                  </span>
                </div>
              </button>

              <div
                className={`
                  grid transition-all duration-500 ease-in-out
                  ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}
                `}
              >
                <div className="overflow-hidden">
                  <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] px-5 pb-5 sm:px-7 sm:pb-6 lg:px-8 [&_p]:text-justify">
                    <div className="flex flex-col gap-5 border-t border-goldDark/12 pt-4 pr-24 lg:pr-32 pb-20 sm:pb-24">
                      <div className="space-y-1">
                        <h5 className="text-xs xl:text-sm font-semibold tracking-wide uppercase text-zinc-900">
                          {section.whatTitle}
                        </h5>
                        <ul className="list-disc pl-5 space-y-1 text-xs xl:text-sm leading-relaxed text-zinc-700">
                          {section.whatItems.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-1">
                        <h5 className="text-xs xl:text-sm font-semibold tracking-wide uppercase text-zinc-900">
                          {section.howTitle}
                        </h5>
                        <ul className="list-disc pl-5 space-y-1 text-xs xl:text-sm leading-relaxed text-zinc-700">
                          {section.howItems.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-1">
                        <h5 className="text-xs xl:text-sm font-semibold tracking-wide uppercase text-zinc-900">
                          {section.benefitsTitle}
                        </h5>
                        <ul className="list-disc pl-5 space-y-1 text-xs xl:text-sm leading-relaxed text-zinc-700">
                          {section.benefitsItems.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-1">
                        <h5 className="text-xs xl:text-sm font-semibold tracking-wide uppercase text-zinc-900">
                          {section.suitableTitle}
                        </h5>
                        <ul className="list-disc pl-5 space-y-1 text-xs xl:text-sm leading-relaxed text-zinc-700">
                          {section.suitableItems.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="flex flex-col justify-end">
                      <div className="relative w-full aspect-square overflow-hidden rounded-xl border border-goldDark/20 shadow-md shadow-goldDark/15">
                        <Image
                          src={
                            sectionImages[index]?.src ??
                            "/images/profhilo_main.jpeg"
                          }
                          alt={sectionImages[index]?.alt ?? section.product}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
