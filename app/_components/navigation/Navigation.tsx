"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { IoTriangle } from "react-icons/io5"
import { robotoCondensed } from "../fonts"

export default function Navigation() {
  const pathname = usePathname()
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const navRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (!navRef.current) return
      if (!navRef.current.contains(event.target as Node)) {
        setOpenDropdown(null)
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenDropdown(null)
      }
    }

    window.addEventListener("mousedown", handlePointerDown)
    window.addEventListener("keydown", handleEscape)

    return () => {
      window.removeEventListener("mousedown", handlePointerDown)
      window.removeEventListener("keydown", handleEscape)
    }
  }, [])

  const isLinkActive = (href: string, hasDropdown: boolean) => {
    if (hasDropdown) {
      return pathname === href || pathname.startsWith(`${href}/`)
    }

    return pathname === href
  }

  const navigationLinks = [
    {
      name: "O nás",
      href: "/about",
    },
    {
      name: "Kozmetika",
      href: "/cosmetics/chemical-peeling",
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
      href: "/medical-cosmetics/botulotoxin",
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
    <div className="absolute top-33 left-1/2 z-30 w-full -translate-x-1/2 px-20 xl:top-35 xl:px-20 2xl:px-44">
      <div
        ref={navRef}
        className={`${robotoCondensed.className} fade-up relative flex w-full items-stretch overflow-visible rounded-xl border border-goldLight bg-redDark/95 shadow-[0_16px_36px_rgba(20,10,10,0.36)]`}
      >
        <div className="flex flex-1 items-center gap-8 rounded-l-xl bg-linear-to-r from-redDark via-redMain to-redDark pl-10 py-5 pr-16 text-sm tracking-wide text-background xl:py-7 xl:pr-24 2xl:text-lg 2xl:pr-32">
          {navigationLinks.map((link) => (
            // každý nav item je relatívny a group kvôli hoveru
            <div key={link.name} className="relative group flex items-center">
              {/* položka bez dropdownu = klasický Link */}
              {!link.dropdown && (
                <Link
                  href={link.href}
                  className={`transition-colors duration-300 hover:text-[#ffd982] ${
                    isLinkActive(link.href, false)
                      ? "text-[#ffe09d]"
                      : "text-background/95"
                  }`}
                >
                  {link.name}
                </Link>
              )}

              {/* položka s dropdownom */}
              {link.dropdown && (
                <>
                  {/* label ako link + šípka na click toggle */}
                  <div className="flex items-center gap-1.5">
                    <Link
                      href={link.href}
                      className={`transition-colors duration-300 hover:text-[#ffd982] ${
                        isLinkActive(link.href, true)
                          ? "text-[#ffe09d]"
                          : "text-background/95"
                      }`}
                    >
                      {link.name}
                    </Link>
                    <button
                      type="button"
                      onClick={() =>
                        setOpenDropdown((prev) =>
                          prev === link.name ? null : link.name,
                        )
                      }
                      className={`flex h-6 w-6 items-center justify-center rounded-full border border-goldLight/35 text-xs leading-none transition-all duration-200 hover:cursor-pointer hover:border-goldLight hover:text-[#ffd982] ${
                        openDropdown === link.name
                          ? "bg-white/15 text-[#ffd982]"
                          : "bg-transparent text-background/90"
                      }`}
                      aria-label={`Otvoriť submenu ${link.name}`}
                      title={`Otvoriť submenu ${link.name}`}
                    >
                      <span
                        className={`transition-transform duration-200 ${
                          openDropdown === link.name ? "rotate-180" : ""
                        }`}
                      >
                        ▾
                      </span>
                    </button>
                  </div>

                  {/* DROPDOWN MENU – objaví sa pod položkou */}
                  <div
                    className={`absolute left-1/2 top-full z-20 -translate-x-1/2 pt-3 transition-all duration-200 ease-out ${
                      openDropdown === link.name
                        ? "pointer-events-auto translate-y-0 opacity-100"
                        : "pointer-events-none -translate-y-1 opacity-0 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100"
                    }`}
                  >
                    {/* biely „trojuholník“ */}
                    <div className="flex justify-center">
                      <IoTriangle className="-mt-0.5 text-[#39292b] 2xl:mt-1.5" />
                    </div>

                    {/* samotné menu */}
                    <div className="z-50 -mt-0.5 w-60 overflow-hidden rounded-md border border-goldLight/30 bg-[#39292b] text-left shadow-xl">
                      {link.dropdown.map((item, i) => (
                        <Link
                          key={i}
                          href={item.href}
                          className={`block px-6 py-3 text-base transition-colors duration-200 hover:bg-[#4f3639] hover:text-[#ffe4a4] ${
                            pathname === item.href
                              ? "text-[#ffe4a4]"
                              : "text-background/95"
                          } ${i !== 0 ? "border-t border-goldLight/10" : ""}`}
                          onClick={() => setOpenDropdown(null)}
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
        <div className="flex items-center justify-center rounded-r-xl bg-linear-to-r from-goldDark via-goldLight to-goldDark px-12 py-4 text-xl font-medium tracking-wide text-greyMain transition duration-300 hover:cursor-pointer hover:brightness-110">
          <h4>Kontakt</h4>
        </div>
      </div>
    </div>
  )
}
