"use client"

import Link from "next/link"
import { IoTriangle } from "react-icons/io5"
import { robotoCondensed } from "../fonts"

export default function Navigation() {
  const navigationLinks = [
    {
      name: "O nás",
      href: "/about",
    },
    {
      name: "Kozmetika",
      href: "/cosmetics",
      dropdown: [
        { name: "Chemický peeling", href: "/cosmetics/chemical-peeling" },
        {
          name: "Diamantová mikrodermabrázia",
          href: "/cosmetics/diamond-microdermabrasion",
        },
        {
          name: "Oxygeneo",
          href: "/cosmetics/oxygeneo",
        },
        { name: "Mezoterapia", href: "/cosmetics/mezoterapia" },
        { name: "Microneedling/dermapen", href: "/cosmetics/microneedling" },
      ],
    },
    {
      name: "Lekárska kozmetika",
      href: "/medical-cosmetics",
      dropdown: [
        { name: "Botulotoxín", href: "/medical-cosmetics/botulotoxin" },
        {
          name: "Kyselina hyalurónová",
          href: "/medical-cosmetics/kyselina-hyaluronova",
        },
        {
          name: "Biokompatibilné nite",
          href: "/medical-cosmetics/biokompatibilne-nite",
        },
        { name: "Jalupro", href: "/medical-cosmetics/jalupro" },
        { name: "Profhilo", href: "/medical-cosmetics/profhilo" },
      ],
    },
    {
      name: "Lekárska akupunktúra",
      href: "/acupuncture",
    },
    {
      name: "Masáže a Saunový detox",
      href: "/massage-and-sauna-detox",
    },
    {
      name: "Cenník",
      href: "/pricing",
    },
    {
      name: "Akcia",
      href: "/promotion",
    },
  ]

  return (
    <div className="absolute top-33 xl:top-32 left-1/2 -translate-x-1/2 z-10 w-full px-20 xl:px-20 2xl:px-44">
      <div className={`${robotoCondensed.className} w-full flex items-stretch`}>
        {/* <div className="flex flex-1 items-center bg-redMain gap-8 pl-10 pr-16 xl:pr-24 2xl:pr-32 xl:py-7 py-5 rounded-l-md text-sm xl:text-base tracking-wide"> */}
        <div
          className="flex flex-1 items-center bg-goldDark gap-8 pl-10 pr-16 xl:pr-24 2xl:pr-32 
           xl:py-7 py-5 rounded-l-md text-sm xl:text-base tracking-wide"
        >
          {navigationLinks.map((link, index) => (
            // každý nav item je relatívny a group kvôli hoveru
            <div key={index} className="relative group flex items-center">
              {/* položka bez dropdownu = klasický Link */}
              {!link.dropdown && (
                <Link
                  href={link.href}
                  className="text-background hover:text-gray-300 transition-colors duration-300"
                >
                  {link.name}
                </Link>
              )}

              {/* položka s dropdownom */}
              {link.dropdown && (
                <>
                  {/* label + šípka hneď vedľa seba */}
                  <div className="flex items-center text-background hover:text-gray-300 transition-colors duration-300 cursor-pointer">
                    <span>{link.name}</span>
                    <span className="ml-1 text-xs leading-none">▾</span>
                  </div>

                  {/* DROPDOWN MENU – objaví sa pod položkou */}
                  <div className="absolute left-1/2 top-full z-20 hidden -translate-x-1/2 pt-3 group-hover:block">
                    {/* biely „trojuholník“ */}
                    <div className="flex justify-center">
                      <IoTriangle className="text-background mt-1.5" />
                    </div>

                    {/* samotné menu */}
                    <div className="w-60 text-left overflow-hidden rounded-md bg-neutral-700 shadow-lg z-50 border border-greyMain/20 -mt-0.5">
                      {link.dropdown.map((item, i) => (
                        <Link
                          key={i}
                          href={item.href}
                          className={`block px-6 py-3 text-base text-background hover:bg-greyMain/20 transition-colors duration-200 ${i !== 0 ? "border-t border-greyMain/20" : ""}`}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {/* pravé tlačidlo Kontakt */}
        <div className="bg-greyMain text-background flex items-center justify-center px-12 py-4 rounded-r-md text-xl tracking-wide font-medium hover:bg-gray-300 transition-colors duration-300 hover:cursor-pointer hover:text-goldDark">
          <h4>Kontakt</h4>
        </div>
      </div>
    </div>
  )
}
