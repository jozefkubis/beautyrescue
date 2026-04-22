"use client";

import type { ServiceRow } from "@/app/_lib/data_services_all/data_services";
import { useState } from "react";
import SectionNavigation from "../../SectionNavigation";
import ProfhiloMain_update_form from "./ProfhiloMain_update_form";
import ProfhiloSectionOne_update_form from "./ProfhiloSectionOne_update_form";
import ProfhiloSectionTwo_update_form from "./ProfhiloSectionTwo_update_form";

type Profhilo_update_formProps = {
  profhiloData: ServiceRow | null;
  profhiloStructuraData: ServiceRow | null;
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

// Wrapper prepína 3 samostatné Profhilo formuláre cez SectionNavigation.
export default function Profhilo_update_form({
  profhiloData,
  profhiloStructuraData,
  isAdmin,
}: Profhilo_update_formProps) {
  const [index, setIndex] = useState(1);

  const sections = [1, 2, 3];
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
            <SectionHeader title="Profhilo (hlavná sekcia)" />
            <ProfhiloMain_update_form
              profhiloData={profhiloData}
              isAdmin={isAdmin}
            />
          </>
        )}

        {index === 2 && (
          <>
            <SectionHeader title="Profhilo (sekcia 1)" />
            <ProfhiloSectionOne_update_form
              profhiloData={profhiloData}
              isAdmin={isAdmin}
            />
          </>
        )}

        {index === 3 && (
          <>
            <SectionHeader title="Profhilo Structura (sekcia 2)" />
            <ProfhiloSectionTwo_update_form
              profhiloStructuraData={profhiloStructuraData}
              isAdmin={isAdmin}
            />
          </>
        )}
      </div>
    </section>
  );
}
