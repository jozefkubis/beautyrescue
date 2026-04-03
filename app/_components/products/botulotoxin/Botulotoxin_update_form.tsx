"use client";

import type {
  BotulotoxinMainProps,
  BotulotoxinPotenieMainProps,
  BotulotoxinVraskyMainProps,
} from "@/app/_lib/data_services/data_botulotoxin";
import { useState } from "react";
import SectionNavigation from "../../SectionNavigation";
import BotulotoxinMainPage_update_form from "./BotulotoxinMainPage_update_form";
import BotulotoxinPotenie_update_form from "./potenie/BotulotoxinPotenie_update.form";
import BotulotoxinVrasky_update_form from "./vrasky/BotulotoxinVrasky_update_form";

type Botulotoxin_update_formProps = {
  botulotoxinData: BotulotoxinMainProps["botulotoxinData"] | null;
  botulotoxinPotenieData:
    | BotulotoxinPotenieMainProps["botulotoxinPotenieData"]
    | null;
  botulotoxinVraskyData:
    | BotulotoxinVraskyMainProps["botulotoxinVraskyData"]
    | null;
  isAdmin?: boolean;
};

// Zobrazí nadpis a popis sekcie vo formulári
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

export default function Botulotoxin_update_form({
  botulotoxinData,
  botulotoxinPotenieData,
  botulotoxinVraskyData,
  isAdmin,
}: Botulotoxin_update_formProps) {
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
            <SectionHeader title="Botulotoxín (hlavná sekcia)" />
            <BotulotoxinMainPage_update_form
              botulotoxinData={botulotoxinData}
              isAdmin={isAdmin}
            />
          </>
        )}
        {index === 2 && (
          <>
            <SectionHeader title="Botulotoxín (potenie)" />
            <BotulotoxinPotenie_update_form
              botulotoxinPotenieData={botulotoxinPotenieData}
              isAdmin={isAdmin}
            />
          </>
        )}
        {index === 3 && (
          <>
            <SectionHeader title="Botulotoxín (vrásky)" />
            <BotulotoxinVrasky_update_form
              botulotoxinVraskyData={botulotoxinVraskyData}
              isAdmin={isAdmin}
            />
          </>
        )}
      </div>
    </section>
  );
}
