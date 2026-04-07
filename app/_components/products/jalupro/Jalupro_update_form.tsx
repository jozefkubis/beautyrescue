"use client";

import type {
  JaluproClassicProps,
  JaluproHMWProps,
  JaluproMainProps,
  JaluproSuperHydroProps,
  JaluproYoungEyeProps,
} from "@/app/_lib/data_services/data_jalupro";
import { useState } from "react";
import SectionNavigation from "../../SectionNavigation";
import JaluproMainPage_update_form from "./JaluproMainPage_update_form";
import JaluproClassic_update_form from "./classic/JaluproClassic_update_form";
import JaluproHMW_update_form from "./hmw/JaluproHMW_update_form";
import JaluproSuperHydro_update_form from "./super_hydro/JaluproSuperHydro_update_form";
import JaluproYoungEye_update_form from "./young_eye/JaluproYoungEye_update_form";

type Jalupro_update_formProps = {
  jaluproData: JaluproMainProps["jaluproData"] | null;
  jaluproClassicData: JaluproClassicProps["jaluproClassicData"] | null;
  jaluproHMWData: JaluproHMWProps["jaluproHMWData"] | null;
  jaluproSuperHydroData: JaluproSuperHydroProps["jaluproSuperHydroData"] | null;
  jaluproYoungEyeData: JaluproYoungEyeProps["jaluproYoungEyeData"] | null;
  isAdmin?: boolean;
};

// Zobrazí nadpis a popis sekcie vo formulári.
function SectionHeader({ title }: { title: string }) {
  return (
    <div className="px-6 pb-7 pt-7 md:px-8">
      <div className="flex flex-col items-center text-center">
        <p className="inline-flex rounded-full bg-[#fff6ee] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-goldDark">
          Nastavenia obsahu
        </p>
        <h2 className="mt-4 text-2xl font-semibold italic text-goldDark sm:text-3xl">
          {title}
        </h2>
      </div>
    </div>
  );
}

export default function Jalupro_update_form({
  jaluproData,
  jaluproClassicData,
  jaluproHMWData,
  jaluproSuperHydroData,
  jaluproYoungEyeData,
  isAdmin,
}: Jalupro_update_formProps) {
  const [index, setIndex] = useState(1);

  const sections = [1, 2, 3, 4, 5];
  const numberOfSections = sections.length;

  return (
    <section className="w-full items-center justify-center px-6 pt-10 2xl:px-44 lg:px-20 lg:pt-20">
      <div className="section-shell fade-up grid grid-cols-1 gap-2 p-5 lg:gap-4 lg:p-8 lg:px-44">
        <SectionNavigation
          sections={sections}
          index={index}
          setIndex={setIndex}
          numberOfSections={numberOfSections}
        />

        {index === 1 && (
          <>
            <SectionHeader title="Jalupro (hlavná sekcia)" />
            <JaluproMainPage_update_form
              jaluproData={jaluproData}
              isAdmin={isAdmin}
            />
          </>
        )}

        {index === 2 && (
          <>
            <SectionHeader title="Jalupro (Classic)" />
            <JaluproClassic_update_form
              jaluproClassicData={jaluproClassicData}
              isAdmin={isAdmin}
            />
          </>
        )}

        {index === 3 && (
          <>
            <SectionHeader title="Jalupro (HMW)" />
            <JaluproHMW_update_form
              jaluproHMWData={jaluproHMWData}
              isAdmin={isAdmin}
            />
          </>
        )}

        {index === 4 && (
          <>
            <SectionHeader title="Jalupro (Super Hydro)" />
            <JaluproSuperHydro_update_form
              jaluproSuperHydroData={jaluproSuperHydroData}
              isAdmin={isAdmin}
            />
          </>
        )}

        {index === 5 && (
          <>
            <SectionHeader title="Jalupro (Young Eye)" />
            <JaluproYoungEye_update_form
              jaluproYoungEyeData={jaluproYoungEyeData}
              isAdmin={isAdmin}
            />
          </>
        )}
      </div>
    </section>
  );
}
