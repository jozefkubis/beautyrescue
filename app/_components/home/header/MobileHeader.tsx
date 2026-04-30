"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FiChevronDown, FiMenu, FiX } from "react-icons/fi";
import { robotoCondensed } from "../../fonts";

type MobileNavItem = {
  name: string;
  href: string;
  dropdown?: { name: string; href: string }[];
};

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
];

export default function MobileHeader() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (name: string) => {
    setOpenDropdown((prev) => (prev === name ? null : name));
  };

  const isLinkActive = (href: string, hasDropdown: boolean) => {
    if (hasDropdown) {
      return pathname === href || pathname.startsWith(`${href}/`);
    }

    return pathname === href;
  };

  return (
    <header className="relative z-[100] lg:hidden">
      <div className="flex items-center justify-between border-b border-goldLight/30 bg-linear-to-r from-redDark via-redMain to-redDark px-4 py-3 shadow-lg shadow-redDark/30">
        <Link href="/" className="flex items-center gap-2">
          <div className="rounded-full bg-white/90 p-1.5 shadow-sm shadow-black/15">
            <Image
              src="/images/butterflyGoldDark.png"
              alt="Beauty Rescue Žilina logo"
              width={34}
              height={34}
            />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-lg font-semibold tracking-tight text-background">
              BEAUTY
            </span>
            <span className="text-lg font-semibold tracking-tight text-[#ffe2a5]">
              RESCUE
            </span>
          </div>
        </Link>

        <button
          type="button"
          aria-label={isMenuOpen ? "Zavrieť menu" : "Otvoriť menu"}
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="rounded-md border border-goldLight/40 bg-white/10 p-2 text-background"
        >
          {isMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>
      </div>

      <div
        className={`absolute inset-x-0 top-full z-[100] grid transition-[grid-template-rows,opacity] duration-300 ease-out ${isMenuOpen ? "pointer-events-auto grid-rows-[1fr] opacity-100" : "pointer-events-none grid-rows-[0fr] opacity-0"}`}
      >
        <nav
          className={`${robotoCondensed.className} overflow-hidden border-b border-goldLight/25 bg-linear-to-b from-[#372628] to-[#2b1e20] px-4 py-4 shadow-lg shadow-black/25`}
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
                    className={`block rounded-lg px-3 py-2.5 text-base transition-colors duration-200 hover:bg-white/8 hover:text-[#ffe09d] ${
                      isLinkActive(link.href, false)
                        ? "bg-white/8 text-[#ffe09d]"
                        : "text-background/95"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ) : (
                  <div>
                    <button
                      type="button"
                      className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-base transition-colors duration-200 hover:bg-white/8 hover:text-[#ffe09d] ${
                        isLinkActive(link.href, true)
                          ? "bg-white/8 text-[#ffe09d]"
                          : "text-background/95"
                      }`}
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
                              className={`block rounded-md px-3 py-2.5 text-sm transition-colors duration-200 hover:bg-white/8 hover:text-[#ffe09d] ${
                                pathname === item.href
                                  ? "text-[#ffe09d]"
                                  : "text-background/85"
                              }`}
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
  );
}
