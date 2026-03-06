"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { FiChevronDown, FiMenu, FiX } from "react-icons/fi"
import { robotoCondensed } from "../../fonts"

type MobileNavItem = {
  name: string
  href: string
  dropdown?: { name: string; href: string }[]
}

const navigationLinks: MobileNavItem[] = [
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

export default function MobileHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  const toggleDropdown = (name: string) => {
    setOpenDropdown((prev) => (prev === name ? null : name))
  }

  return (
    <header className="relative z-40 lg:hidden">
      <div className="flex items-center justify-between bg-goldDark px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <div className="rounded-full bg-background p-1.5">
            <Image
              src="/images/butterflyGoldDark.png"
              alt="Beauty Rescue logo"
              width={34}
              height={34}
            />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-background text-lg font-semibold">
              BEAUTY
            </span>
            <span className="text-background text-lg font-semibold">
              RESCUE
            </span>
          </div>
        </Link>

        <button
          type="button"
          aria-label={isMenuOpen ? "Zavrieť menu" : "Otvoriť menu"}
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="rounded-md p-2 text-background"
        >
          {isMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>
      </div>

      <div
        className={`absolute inset-x-0 top-full z-40 grid transition-[grid-template-rows,opacity] duration-300 ease-out ${isMenuOpen ? "pointer-events-auto grid-rows-[1fr] opacity-100" : "pointer-events-none grid-rows-[0fr] opacity-0"}`}
      >
        <nav
          className={`${robotoCondensed.className} overflow-hidden border-b border-goldLight/20 bg-greyMain px-4 py-3 shadow-lg shadow-black/20`}
        >
          <ul>
            {navigationLinks.map((link, index) => (
              <li
                key={link.name}
                className={`bg-greyMain ${index !== 0 ? "border-t border-goldLight/15" : ""}`}
              >
                {!link.dropdown ? (
                  <Link
                    href={link.href}
                    className="block px-3 py-2 text-background"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ) : (
                  <div>
                    <button
                      type="button"
                      className="flex w-full items-center justify-between px-3 py-2 text-left text-background"
                      onClick={() => toggleDropdown(link.name)}
                    >
                      <span>{link.name}</span>
                      <FiChevronDown
                        className={`transition-transform duration-300 ease-out ${openDropdown === link.name ? "rotate-180" : ""}`}
                      />
                    </button>

                    <div
                      className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${openDropdown === link.name ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                    >
                      <ul className="overflow-hidden px-3 pb-2">
                        {link.dropdown.map((item, itemIndex) => (
                          <li
                            key={item.name}
                            className={
                              itemIndex !== 0
                                ? "border-t border-goldLight/10"
                                : ""
                            }
                          >
                            <Link
                              href={item.href}
                              className="block px-3 py-2 text-sm text-background/90"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
