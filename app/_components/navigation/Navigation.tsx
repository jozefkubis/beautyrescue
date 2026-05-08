"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { IoTriangle } from "react-icons/io5";
import { robotoCondensed } from "../fonts";
import AuthNavControls from "./AuthNavControls";

export default function Navigation() {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (!navRef.current) return;
      if (!navRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenDropdown(null);
      }
    };

    window.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  // Slovensky: Keď má kategória svoj prefix, stačí kontrolovať začiatok URL.
  // Je to jednoduchšie a spoľahlivé aj pre ďalšie podstránky v danej sekcii.
  const isLinkActive = (href: string, activePrefix?: string) => {
    if (activePrefix) {
      return (
        pathname === activePrefix || pathname.startsWith(`${activePrefix}/`)
      );
    }

    return pathname === href;
  };

  const navigationLinks = [
    { name: "O nás", href: "/onas" },
    {
      name: "Kozmetika",
      href: "/kozmetika/chemicky_peeling",
      activePrefix: "/kozmetika",
      dropdown: [
        { name: "Chemický peeling", href: "/kozmetika/chemicky_peeling" },
        {
          name: "Diamantová mikrodermabrázia",
          href: "/kozmetika/diamantova_mikrodermabrazia",
        },
        { name: "Oxygeneo", href: "/kozmetika/oxygeneo" },
        { name: "Mezoterapia", href: "/kozmetika/mezoterapia" },
        { name: "Microneedling/dermapen", href: "/kozmetika/microneedling" },
      ],
    },
    {
      name: "Lekárska kozmetika",
      href: "/lekarska_kozmetika/botulotoxin",
      activePrefix: "/lekarska_kozmetika",
      dropdown: [
        { name: "Botulotoxín", href: "/lekarska_kozmetika/botulotoxin" },
        {
          name: "Kyselina hyalurónová",
          href: "/lekarska_kozmetika/kyselina_hyaluronova",
        },
        {
          name: "Biokompatibilné nite",
          href: "/lekarska_kozmetika/biokompatibilne_nite",
        },
        { name: "Jalupro", href: "/lekarska_kozmetika/jalupro" },
        { name: "Profhilo", href: "/lekarska_kozmetika/profhilo" },
      ],
    },
    { name: "Lekárska akupunktúra", href: "/lekarska_akupunktura" },
    { name: "Cenník", href: "/cennik" },
    { name: "Novinky", href: "/novinky" },
  ];

  return (
    <>
      <div className="absolute top-33 left-1/2 z-30 w-full -translate-x-1/2 px-20 xl:top-35 xl:px-20 2xl:px-44">
        <div
          ref={navRef}
          className={`${robotoCondensed.className} fade-up relative flex w-full items-stretch overflow-visible rounded-xl border border-goldLight bg-redDark/95 shadow-[0_16px_36px_rgba(20,10,10,0.36)]`}
        >
          <div className="flex flex-1 items-center gap-8 rounded-l-xl bg-linear-to-r from-redDark via-redMain to-redDark pl-10 py-5 pr-4 text-sm tracking-wide text-background xl:py-7 xl:pr-6 2xl:text-lg 2xl:pr-8">
            {navigationLinks.map((link) => (
              <div key={link.name} className="relative group flex items-center">
                {!link.dropdown && (
                  <Link
                    href={link.href}
                    className={`transition-colors duration-300 hover:text-[#ffd982] ${
                      isLinkActive(link.href)
                        ? "text-[#ffe09d]"
                        : "text-background/95"
                    }`}
                  >
                    {link.name}
                  </Link>
                )}

                {link.dropdown && (
                  <>
                    <div className="flex items-center gap-1.5">
                      <Link
                        href={link.href}
                        className={`transition-colors duration-300 hover:text-[#ffd982] ${
                          isLinkActive(link.href, link.activePrefix)
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

                    <div
                      className={`absolute left-1/2 top-full z-20 -translate-x-1/2 pt-3 transition-all duration-200 ease-out ${
                        openDropdown === link.name
                          ? "pointer-events-auto translate-y-0 opacity-100"
                          : "pointer-events-none -translate-y-1 opacity-0"
                      }`}
                    >
                      <div className="flex justify-center">
                        <IoTriangle className="-mt-0.5 text-[#39292b] 2xl:mt-1.5" />
                      </div>

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

            <AuthNavControls />
          </div>

          {/* Slovensky: Kontakt je teraz link, ktorý plynulo scrolluje na sekciu s kontaktným formulárom v pätičke */}
          <button
            type="button"
            className="flex items-center justify-center rounded-r-xl bg-linear-to-r from-goldDark via-goldLight to-goldDark px-12 py-4 text-xl font-medium tracking-wide text-greyMain transition duration-300 hover:cursor-pointer hover:brightness-110"
            onClick={() => {
              const el = document.getElementById("kontakt");
              if (el) {
                el.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            <h4>Kontakt</h4>
          </button>
        </div>
      </div>
    </>
  );
}
