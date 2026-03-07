"use client"

import { useState } from "react"
import { brandFont } from "../_components/fonts"

export default function Page() {
  const [onExpand, setOnExpand] = useState(false)

  const handleExpand = () => {
    setOnExpand(!onExpand)
  }

  return (
    <div className="w-full justify-center items-center px-6 lg:px-20 2xl:px-44 py-8 lg:py-10">
      <h1
        className={`italic text-4xl 2xl:text-5xl py-8 lg:py-14 font-semibold text-goldDark ${brandFont.className}`}
      >
        <span className="italic">
          <span className="text-5xl 2xl:text-6xl">O</span> nás
        </span>
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 ">
        <div>
          <p className="text-gray-700 leading-8 text-sm xl:text-base 2xl:text-lg whitespace-pre-wrap">
            <span className="italic">
              „Krása je vonkajší manifest vnútorného zdravia.“ (Katie Brindle,
              expertka v čínskej medicíne)
            </span>
            <br />
            Beauty Rescue je štúdio profesionálnej kozmetiky na oživenie či
            ozdravenie Vašej krásy. Náš tím pozostávajúci zo zdravotníkov-
            lekára, záchranárov a maséra svoje medicínske znalosti a
            zdravotnícke zručnosti už dlhé roky využíva v oblasti kozmetiky a
            ozdravovania.
          </p>

          <div
            className={`overflow-hidden transition-all duration-800 ease-in-out ${
              onExpand ? "max-h-250 opacity-100 mt-2" : "max-h-0 opacity-0"
            } md:max-h-none md:opacity-100`}
          >
            <p className="text-gray-700 leading-8 text-sm xl:text-base 2xl:text-lg whitespace-pre-wrap">
              Z portfólia našich služieb si môžete vybrať od profesionálnej
              kozmetiky, a síce najširšieho spektra mezoterapeutickej chémie,
              jej aplikačných spôsobov a iných profesionálnych kozmetických
              prístrojových ošetrení, pokračujúc lekárskou kozmetikou-
              botulotoxínom, kyselinou hyalurónovou, biokompatibilnými niťami,
              ďalej relaxom v podobe masáží, ku ktorým máme ako bonus fínsku
              saunu, základ pre náš detoxprogram, alebo je príčinou prečo sa v
              sebe necítite dobre nejaký zdravotný problém prinášajúci
              dyskomfort? Nech sa páči, lekárska akupunktúra. Cieľom i
              filozofiou „Záchranky krásy“ nie je pretvoriť Vás podľa najnovších
              estetických trendov v niečiu kópiu, ale odkryť Vašu unikátnu
              krásu, zakryť Vaše nedostatky, spomaliť progresiu starnutia,
              oživiť a zachrániť originál vo Vás, posilniť a podporiť Vaše
              zdravie – Vašu krásu.
            </p>
          </div>

          <button
            type="button"
            onClick={handleExpand}
            className="md:hidden mt-2 font-semibold text-goldDark cursor-pointer"
          >
            {onExpand ? "Späť" : "..."}
          </button>
        </div>
        <div className="flex items-center justify-center bg-gray-200 rounded-md h-full">
          <h1 className="text-4xl font-semibold text-grey-700">Foto</h1>
        </div>
      </div>
    </div>
  )
}
