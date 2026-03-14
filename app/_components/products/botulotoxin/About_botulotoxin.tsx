"use client"

import { useState } from "react"
import { MdKeyboardArrowDown } from "react-icons/md"

export default function About_botulotoxin() {
  const [openBox, setOpenBox] = useState(false)

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
              <h3 className="text-sm font-semibold tracking-tight text-zinc-900 xl:text-base">
                Viac informácií o Botulotoxíne
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

          {/* Animated content */}
          <div
            className={`
              overflow-hidden px-4 sm:px-5 lg:px-6
              transition-[max-height,opacity] duration-1500 ease-in-out
              ${openBox ? "max-h-250 opacity-100" : "max-h-0 opacity-0"}
            `}
          >
            <div className="pb-6 pt-1 flex flex-col gap-2">
              <p className="text-xs xl:text-sm leading-relaxed text-zinc-700">
                Botulotoxín, ľud. „klobásový jed“, je neurotoxín produkovaný
                anaeróbnou grampozitívnou tyčinkou Clostridium botulinum. Jeho
                letálna dávka sa pohybuje v závislosti od sérotypu od 0,1-1
                ng/kg. Tento polypeptid obsahujúci proteínovú molekulu s ťažkým
                a ľahkým reťazcom, ktoré sú držané pohromade tepelne labilnou
                disulfidovou väzbou, štiepi dokovací proteín (synaptozomálne
                asociovaný proteín 25 kDA – [SNAP-25]) na vnútornom povrchu
                neurónonálnych membrán, čím inhibuje fúziu vezikúl acetylcholínu
                do synaptickej štrbiny neuromuskulárneho spojenia, blokuje
                cholínergickú inerváciu medzi nervom a priečne pruhovaným aj
                hladkým svalom, a tiež autonómnu inerváciu potných, slinných a
                slzných žliaz. Touto chemickou denerváciou spôsobuje(me) dočasnú
                paralýzu..
              </p>
              <p className="text-xs xl:text-sm leading-relaxed text-zinc-700">
                Prvýkrát bol botulotoxín na použitie pre kozmetické účely
                schválený americkou FDA v roku 2002 na liečbu komplexu
                glabelárnych svalov (m.procerus, m. corrugator supercilii a
                depresor supercilii alebo inak medziobočie, a tiež m.frontalis),
                ktoré svojou hyperfunkciou tvoria horizontálne i vertikálne
                vrásky na čele, neskôr 2013 na kozmetickú terapiu „kohútich
                stôp“ (m.orbicularis oculi)..
              </p>
              <p className="text-xs xl:text-sm leading-relaxed text-zinc-700">
                Skúsený aplikátor však vie, že sa s ním dá urobiť oveľa oveľa
                viac..
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
