"use client";

import { getCurrentAdminStatus } from "@/app/_lib/actions_all/auth_actions";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FiChevronDown, FiMenu, FiX } from "react-icons/fi";
import MobileLogoutButton from "../../admin/MobileLogoutButton";
import { robotoCondensed } from "../../fonts";

// Typ drzime jednoduchy, aby bolo jasne, ktore polozky menu maju aj rozbalovacie podmenu.
type MobileNavItem = {
  name: string;
  href: string;
  dropdown?: { name: string; href: string }[];
};

// Toto je zdroj vsetkych mobilnych odkazov, aby sa menu skladalo z jedneho miesta.
const navigationLinks: MobileNavItem[] = [
  {
    name: "O nás",
    href: "/onas",
  },
  {
    name: "Kozmetika",
    href: "/kozmetika",
    dropdown: [
      { name: "Chemický peeling", href: "/kozmetika/chemicky_peeling" },
      {
        name: "Diamantová mikrodermabrázia",
        href: "/kozmetika/diamantova_mikrodermabrazia",
      },
      {
        name: "Oxygeneo",
        href: "/kozmetika/oxygeneo",
      },
      { name: "Mezoterapia", href: "/kozmetika/mezoterapia" },
      { name: "Microneedling/dermapen", href: "/kozmetika/microneedling" },
    ],
  },
  {
    name: "Lekárska kozmetika",
    href: "/lekarska_kozmetika",
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
  {
    name: "Lekárska akupunktúra",
    href: "/lekarska_akupunktura",
  },
  {
    name: "Masáže a Saunový detox",
    href: "/massage-and-sauna-detox",
  },
  {
    name: "Cenník",
    href: "/cennik",
  },
  {
    name: "Novinky",
    href: "/novinky",
  },
  {
    name: "Admin",
    href: "/admin",
  },
  {
    name: "Prihlásenie",
    href: "/login",
  },
];

// Tento komponent renderuje mobilny header, ovlada otvorenie menu a prepina admin/auth prvky podla stavu usera.
export default function MobileHeader() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Auth stav obnovime aj po zmene route, lebo mobilny header zostava v layoute namountovany.
  useEffect(() => {
    let isMounted = true;

    getCurrentAdminStatus().then((status) => {
      if (!isMounted) return;

      setIsAuthenticated(status.isAuthenticated);
      setIsAdmin(status.isAdmin);
    });

    return () => {
      isMounted = false;
    };
  }, [pathname]);

  // Udrziavame otvorene len jedno dropdown menu naraz, aby bolo ovladanie na mobile citelne.
  const toggleDropdown = (name: string) => {
    setOpenDropdown((prev) => (prev === name ? null : name));
  };

  // Pri sekciach s podstrankami chceme zvysraznit aktivny aj rodicovsky odkaz, nielen presnu zhodu URL.
  const isLinkActive = (href: string, hasDropdown: boolean) => {
    if (hasDropdown) {
      return pathname === href || pathname.startsWith(`${href}/`);
    }

    return pathname === href;
  };

  return (
    <header className="relative z-100 lg:hidden">
      {/* Vrchny riadok headera drzi brand vlavo a rychle akcie vpravo. */}
      <div className="flex items-center justify-between border-b border-goldLight/30 bg-linear-to-r from-redDark via-redMain to-redDark px-4 py-3 shadow-lg shadow-redDark/30">
        <Link href="/" className="flex items-center gap-2">
          {/* Logo a nazov vedu vzdy na homepage, preto su obalene jednym linkom. */}
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

        <div className="flex justify-center items-center gap-3">
          {/* Logout ma zmysel iba pre prihlaseneho usera, inak by zaberal miesto bez funkcie. */}
          {isAuthenticated && <MobileLogoutButton />}

          {/* Toto tlacidlo iba prepina otvorenie mobilneho menu. */}
          <button
            type="button"
            aria-label={isMenuOpen ? "Zavrieť menu" : "Otvoriť menu"}
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="rounded-md border border-goldLight/40 bg-white/10 p-2 text-background"
          >
            {isMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
          </button>
        </div>
      </div>

      {/* Menu je vysuvny panel pod headerom, aby nezaberal miesto ked je zatvorene. */}
      <div
        className={`absolute inset-x-0 top-full z-100 grid transition-[grid-template-rows,opacity] duration-300 ease-out ${isMenuOpen ? "pointer-events-auto grid-rows-[1fr] opacity-100" : "pointer-events-none grid-rows-[0fr] opacity-0"}`}
      >
        <nav
          className={`${robotoCondensed.className} overflow-hidden border-b border-goldLight/25 bg-linear-to-b from-[#372628] to-[#2b1e20] px-4 py-4 shadow-lg shadow-black/25`}
        >
          <ul>
            {navigationLinks.map((link, index) => {
              // Admin sekciu ma vidiet len admin a login odkaz iba neprihlaseny user.
              if (link.href === "/admin" && !isAdmin) return null;
              if (link.href === "/login" && isAuthenticated) return null;

              return (
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
                      {/* Rodicovsky odkaz s dropdownom len otvara podmenu, aby user neodisiel omylom hned prec. */}
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

                      {/* Podmenu schovavame cez grid riadky, lebo animacia je plynula a bez skakania vysky. */}
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
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
