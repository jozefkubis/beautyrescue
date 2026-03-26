"use client"

import { useState } from "react"

type Treatment = {
  id: number | string
  treatment: string
  price: string
  sale: string
}

type PricingFormProps = {
  title: string
  treatments: Treatment[]
  isAdmin?: boolean
}

export default function PricingForm({
  // title,
  treatments,
  // isAdmin: initialIsAdmin = false,
}: PricingFormProps) {
  // const isAdmin = initialIsAdmin

  const [isAdmin] = useState(false)

  return (
    <section className="w-full px-4">
      <div className="mx-auto w-full max-w-5xl">
        <div className="overflow-hidden rounded-[28px] border-2 border-goldDark/15 bg-[#fffdf9] shadow-[0_14px_36px_rgba(91,64,38,0.08)]">
          <div className="px-6 pb-5 pt-7 md:px-8">
            <div className="flex flex-col items-center text-center">
              <p className="inline-flex rounded-full bg-[#fff6ee] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-goldDark">
                Cenník procedúr
              </p>
            </div>
          </div>

          <div className="px-4 pb-4 md:px-6">
            <div className="mb-4 hidden grid-cols-[1.8fr_0.6fr_0.5fr] gap-4 px-4 md:grid">
              <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-500/70">
                Ošetrenie
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-500/70">
                Cena
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-500/70">
                Akcia
              </span>
            </div>

            <div className="space-y-1">
              {treatments.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-transparent px-2 py-3 transition duration-300 hover:border-goldDark/12 hover:bg-[#fffaf2] hover:cursor-pointer hover:scale-102 hover:shadow-[0_8px_24px_rgba(91,64,38,0.12)]"
                >
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-[1.8fr_0.6fr_0.5fr] md:gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="pl-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-500/65 md:hidden">
                        Ošetrenie
                      </label>
                      <input
                        type="text"
                        value={item.treatment}
                        readOnly
                        aria-label="Ošetrenie"
                        className="h-12 w-full rounded-xl border border-goldDark/15 bg-white px-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-goldDark/30 2xl:h-14 2xl:text-base hover:cursor-pointer"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="pl-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-500/65 md:hidden">
                        Cena
                      </label>
                      <input
                        type="text"
                        value={item.price}
                        readOnly
                        aria-label="Cena"
                        className={`h-12 w-full rounded-xl border border-goldDark/20 bg-[#fff9ef] px-4 text-sm font-semibold text-goldDark outline-none transition placeholder:text-goldDark/50 focus:border-goldDark/35 2xl:h-14 2xl:text-base ${
                          item.sale ? "line-through decoration-1" : ""
                        } hover:cursor-pointer`}
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="pl-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-500/65 md:hidden">
                        Akcia
                      </label>
                      <input
                        type="text"
                        value={item.sale}
                        readOnly
                        aria-label="Akcia"
                        placeholder="-"
                        className="h-12 w-full rounded-xl border border-goldDark/15 bg-[#fff8f3] px-4 text-sm font-semibold text-redDark outline-none transition placeholder:text-redDark/35 focus:border-goldDark/30 2xl:h-14 2xl:text-base hover:cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {isAdmin && (
              <div className="mt-6 flex flex-col gap-4 border-t border-goldDark/10 px-2 pt-5 md:flex-row md:items-center md:justify-between">
                <p className="text-sm text-gray-500">
                  Počet položiek v cenníku:{" "}
                  <span className="font-semibold text-gray-800">
                    {treatments.length}
                  </span>
                </p>

                <button
                  type="button"
                  className="inline-flex h-11 items-center justify-center rounded-full bg-linear-to-r from-redMain to-redDark px-6 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(190,18,60,0.22)] transition duration-300 hover:-translate-y-0.5 hover:cursor-pointer hover:shadow-[0_14px_30px_rgba(190,18,60,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-redMain/25"
                >
                  Aktualizovať cenník
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
