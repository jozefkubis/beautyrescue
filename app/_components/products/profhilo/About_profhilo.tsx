"use client"

import { useState } from "react"
import { MdKeyboardArrowDown } from "react-icons/md"

export default function About_profhilo() {
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
                Viac informácií o Profhilo
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
                  Účinky
                </h4>
                <ul className="list-disc pl-5 space-y-1 text-xs xl:text-sm leading-relaxed text-zinc-700">
                  <li>Rýchla a účinná hydratácia</li>
                  <li>Stimulácia tvorby kolagénu a elastínu</li>
                  <li>Spevnenie a vypnutie pokožky</li>
                  <li>Zlepšenie elasticity a pevnosti pleti</li>
                  <li>Bioremodelácia pokožky zvnútra</li>
                  <li>Výrazný antioxidačný účinok</li>
                  <li>Prevencia starnutia</li>
                  <li>Prevencia ochabnutia pokožky</li>
                </ul>
              </div>

              <p className="text-xs xl:text-sm leading-relaxed text-zinc-700">
                <strong>Efekt:</strong> nastupuje postupne - výsledky sú
                viditeľné po 2. aplikácii, pričom celý regeneračný proces
                prebieha niekoľko týždňov. Pokožka je pevnejšia, hydratovanejšia
                a viditeľne omladená.
              </p>

              <div className="space-y-2">
                <h4 className="text-xs xl:text-sm font-semibold tracking-wide uppercase text-zinc-900">
                  Priebeh ošetrenia
                </h4>
                <p className="text-xs xl:text-sm leading-relaxed text-zinc-700">
                  Aplikácia Profhilo nie je neznesiteľne bolestivá, avšak pre
                  diskomfort spojený s inj. aplikáciou (vpichy) sa pred zákrokom
                  aplikuje anestetický krém.
                </p>
                <p className="text-xs xl:text-sm leading-relaxed text-zinc-700">
                  Profhilo sa aplikuje do 5 anatomicky definovaných bodov na
                  každej strane tváre (tzv. BAP technika – Bio Aesthetic
                  Points). Po injekcii pokračujeme ľahkou masážou, aby sme
                  liečivo rozdistribuovali čo najrovnomernejšie v aplikovanej
                  zóne.
                </p>
                <p className="text-xs xl:text-sm leading-relaxed text-zinc-700">
                  Na záver ošetrenia je potrebné pokožku dezinfekčne vyčistiť a
                  upokojiť maskou podľa typu pleti, ktorá navyše dodá ďalšie
                  výživné látky.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs xl:text-sm font-semibold tracking-wide uppercase text-zinc-900">
                  Po ošetrení
                </h4>
                <p className="text-xs xl:text-sm leading-relaxed text-zinc-700">
                  Bezprostredne po ošetrení je potrebné vystríhať sa akéhokoľvek
                  kontaktu ošetrovanej oblasti a potencionálneho rizika infekcie
                  - dotyky rukami, bozkávanie.
                </p>
                <p className="text-xs xl:text-sm leading-relaxed text-zinc-700">
                  Do 24 hodín po aplikácii nepoužívajte žiadny krém, make-up,
                  púder a vyhnite sa intenzívnemu cvičeniu alebo stavom, ktoré
                  môžu spôsobiť nadmerné potenie.
                </p>
                <p className="text-xs xl:text-sm leading-relaxed text-zinc-700">
                  72 hodín po aplikácii sa vyhnite infekčnému prostrediu
                  (vírivky, bazény, sauny, deti a pod.), oxidačnému stresu
                  (fajčenie, vlhké a nedobre odvetrané verejné prevádzky, napr.
                  telocvične a pod.). Po aplikácii Profhilo je potrebné 7 dní sa
                  vyhýbať slnku.
                </p>
                <p className="text-xs xl:text-sm leading-relaxed text-zinc-700">
                  Počas nasledujúcich 24 hodín sa vyhnite intenzívnemu cvičeniu
                  alebo stavom, ktoré môžu spôsobiť nadmerné potenie. Prvú noc
                  spite vo zvýšenej polohe, ak ste si aplikovali terapiu na
                  oblasť pokožky a krku.
                </p>
                <p className="text-xs xl:text-sm leading-relaxed text-zinc-700">
                  Cez tvár by malo prejsť čo najviac vzduchu. Pite veľa vody a
                  vyhýbajte sa alkoholu. To vás udrží hydratované a umožní
                  epidermálnemu roztoku účinne pôsobiť na vašu pokožku.
                </p>
              </div>

              <p className="text-xs xl:text-sm leading-relaxed text-zinc-700">
                <strong>Varianty Profhilo:</strong> Profhilo, Profhilo
                Structura.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
