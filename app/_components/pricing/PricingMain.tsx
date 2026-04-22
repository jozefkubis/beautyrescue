"use client";

import type { ServiceRow } from "@/app/_lib/data_services_all/data_services";
import { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import Acupuncture_pricing_form from "../products/acupuncture/Acupuncture_pricing_form";
import Biokompatibilne_nite_pricing_form from "../products/biokompatibilne-nite/Biokompatibilne_nite_pricing_form";
import Botulotoxin_pricing_form from "../products/botulotoxin/Botulotoxin_pricing_form";
import Chem_peeling_pricing_form from "../products/chemical-peeling/Chem_peeling_pricing_form";
import Dimond_micro_pricing_form from "../products/diamond-microdermabrasion/Dimond_micro_pricing_form";
import Kyselina_hyaluronova_pricing_form from "../products/kyselina-hyaluronova/Kyselina_hyaluronova_pricing_form";
import Mezoterapia_pricing_form_invasive from "../products/mezoterapia/invasive/Mezoterapia_pricing_form_invasive";
import Mezoterapia_pricing_form_non_invasive from "../products/mezoterapia/non-invasive/mezoterapia_pricing_form_non_invasive";
import Oxygeneo_pricing_form from "../products/oxygeneo/Oxygeneo_pricing_form";
import Profhilo_pricing_form from "../products/profhilo/Profhilo_pricing_form";

type PricingFormItem = {
  id: number;
  title: string;
  description: string;
  value: React.ReactNode;
};

type PricingMainProps = {
  acupunctureData: ServiceRow | null | undefined;
  diamondMicrodermabraziaData: ServiceRow | null | undefined;
  biokompatibilneNiteData: ServiceRow | null | undefined;
  botulotoxinData: ServiceRow | null | undefined;
  chemicalPeelingData: ServiceRow | null | undefined;
  kyselinaHyaluronovaData: ServiceRow | null | undefined;
  mezoterapiaInvasiveData: ServiceRow | null | undefined;
  mezoterapiaNonInvasiveData: ServiceRow | null | undefined;
  oxygeneoData: ServiceRow | null | undefined;
  profhiloData: ServiceRow | null | undefined;
};

export default function PricingMain({
  acupunctureData,
  diamondMicrodermabraziaData,
  biokompatibilneNiteData,
  botulotoxinData,
  chemicalPeelingData,
  kyselinaHyaluronovaData,
  mezoterapiaInvasiveData,
  mezoterapiaNonInvasiveData,
  oxygeneoData,
  profhiloData,
}: PricingMainProps) {
  const [openBox, setOpenBox] = useState<number | null>(null);

  const pricingFormData: PricingFormItem[] = [
    {
      id: 1,
      title: "Chemický peeling",
      description: "Obnova textúry pleti a jemné rozjasnenie.",
      // Komponent očakáva prop chemicalPeelingService
      value: (
        <Chem_peeling_pricing_form
          chemicalPeelingService={chemicalPeelingData ?? null}
        />
      ),
    },
    {
      id: 2,
      title: "Diamantová mikrodermabrázia",
      description: "Šetrná exfoliácia pre hladší a sviežejší vzhľad.",
      // Komponent očakáva prop diamondMicroderm
      value: (
        <Dimond_micro_pricing_form
          diamondMicroderm={diamondMicrodermabraziaData}
        />
      ),
    },
    {
      id: 3,
      title: "Oxygeneo",
      description: "Okamžité rozjasnenie, okysličenie a výživa pleti.",
      // Komponent očakáva prop oxygeneo
      value: <Oxygeneo_pricing_form oxygeneo={oxygeneoData} />,
    },
    {
      id: 4,
      title: "Mezoterapia - neinvazívna",
      description: "Bezihlová mezoterapia pre hydratáciu a regeneráciu pleti.",
      // Komponent očakáva prop mezoterapiaNonInvasive
      value: (
        <Mezoterapia_pricing_form_non_invasive
          mezoterapiaNonInvasive={mezoterapiaNonInvasiveData ?? null}
        />
      ),
    },
    {
      id: 5,
      title: "Mezoterapia - invazívna",
      description: "Hĺbková mezoterapia Vitalinjector pre intenzívny efekt.",
      // Komponent očakáva prop mezoterapiaInvasive
      value: (
        <Mezoterapia_pricing_form_invasive
          mezoterapiaInvasive={mezoterapiaInvasiveData}
        />
      ),
    },
    {
      id: 6,
      title: "Botulotoxín",
      description: "Vyhladenie mimických vrások s prirodzeným výsledkom.",
      // Komponent očakáva prop botulotoxin
      value: <Botulotoxin_pricing_form botulotoxin={botulotoxinData ?? null} />,
    },
    {
      id: 7,
      title: "Kyselina hyalurónová",
      description: "Hydratácia, objem a jemné kontúrovanie tváre.",
      // Komponent očakáva prop kyselinaHyaluronova
      value: (
        <Kyselina_hyaluronova_pricing_form
          kyselinaHyaluronova={kyselinaHyaluronovaData}
        />
      ),
    },
    {
      id: 8,
      title: "Biokompatibilné nite",
      description: "Spevnenie kontúr a liftingový efekt bez chirurgie.",
      // Komponent očakáva prop biokompatiblineNite
      value: (
        <Biokompatibilne_nite_pricing_form
          biokompatiblineNite={biokompatibilneNiteData}
        />
      ),
    },
    {
      id: 9,
      title: "Profhilo",
      description: "Hydratácia a regenerácia pleti pre mladistvý vzhľad.",
      // Komponent očakáva prop profhilo
      value: (
        <Profhilo_pricing_form
          profhilo={profhiloData}
          profhiloStructura={undefined}
        />
      ),
    },
    {
      id: 10,
      title: "Lekárska akupunktúra",
      description: "Podpora regenerácie a harmonizácie organizmu.",
      // Komponent očakáva prop acupuncture
      value: <Acupuncture_pricing_form acupuncture={acupunctureData} />,
    },
  ];

  function handleClick(id: number) {
    setOpenBox((currentId) => (currentId === id ? null : id));
  }

  return (
    <section className="mx-auto w-full max-w-350 px-5 pt-10 lg:px-40 lg:pt-20 2xl:px-20">
      <div className="mb-10 text-center lg:mb-14">
        <p className="mx-auto mb-3 inline-flex rounded-full border border-redMain/20 bg-redMain/8 px-4 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-redDark">
          Cenník služieb
        </p>

        <h2 className="premium-title text-3xl font-semibold italic tracking-tight text-goldDark sm:text-4xl lg:text-5xl">
          Vyberte si procedúru
        </h2>

        <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-neutral-600 sm:text-base">
          Každá procedúra je navrhnutá tak, aby podporila prirodzenú krásu,
          sviežosť a sebavedomý vzhľad.
        </p>
      </div>

      <div className="space-y-4 lg:space-y-5">
        {pricingFormData.map((item) => {
          const isOpen = openBox === item.id;

          return (
            <article
              key={item.id}
              className={`                
                overflow-hidden rounded-[28px] border backdrop-blur-sm
                transition-all duration-300
                ${
                  isOpen
                    ? "border-redMain/20 bg-[linear-gradient(180deg,rgba(255,250,244,0.96)_0%,rgba(255,246,238,0.98)_100%)] shadow-[0_22px_50px_rgba(157,116,16,0.14)]"
                    : "border-goldDark/15 bg-white/75 shadow-[0_10px_24px_rgba(157,116,16,0.08)] hover:-translate-y-0.5 hover:shadow-[0_18px_34px_rgba(157,116,16,0.12)]"
                }
              `}
            >
              <button
                type="button"
                onClick={() => handleClick(item.id)}
                // aria-expanded={isOpen}
                // aria-controls={`pricing-content-${item.id}`}
                className="group w-full text-left"
              >
                <div className="flex items-center justify-between gap-4 px-5 py-5 sm:px-7 sm:py-6 lg:px-8  hover:cursor-pointer">
                  <div className="flex min-w-0 items-start gap-4">
                    <span
                      className={`
                        mt-1 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-xs font-semibold
                        transition-all duration-300
                        ${
                          isOpen
                            ? "border-redMain/30 bg-redMain/10 text-redDark"
                            : "border-goldDark/20 bg-goldLight/10 text-goldDark"
                        }
                      `}
                    >
                      {item.id}
                    </span>

                    <div className="min-w-0">
                      <h3 className="text-lg font-semibold italic tracking-tight text-goldDark sm:text-xl lg:text-[1.75rem]">
                        {item.title}
                      </h3>

                      <p
                        className={`
                          mt-1 max-w-2xl text-sm leading-relaxed transition-colors duration-300 sm:text-[15px]
                          ${isOpen ? "text-neutral-700" : "text-neutral-500"}
                        `}
                      >
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`
                      inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border bg-white/90
                      shadow-sm transition-all duration-300 group-hover:scale-105
                      ${
                        isOpen
                          ? "border-redMain/30 shadow-redMain/10"
                          : "border-goldDark/20 shadow-goldDark/10"
                      }
                    `}
                  >
                    <MdKeyboardArrowDown
                      className={`
                        text-2xl transition-transform duration-300 ease-out
                        ${
                          isOpen
                            ? "rotate-180 text-redDark"
                            : "rotate-0 text-goldDark"
                        }
                      `}
                    />
                  </span>
                </div>
              </button>

              <div
                id={`pricing-content-${item.id}`}
                className={`
                  grid transition-all duration-500 ease-in-out
                  ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}
                `}
              >
                <div className="overflow-hidden">
                  <div className="px-2 pb-4 sm:px-3 sm:pb-6">{item.value}</div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
