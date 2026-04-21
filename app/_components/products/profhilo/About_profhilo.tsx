"use client";

import { ServiceRow } from "@/app/_lib/data_services_all/data_services";
import { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

// Prejde text riadok po riadku — ak riadok začína ✓, zabalí ho do <li>
// Keď skupina ✓ riadkov skončí, celú skupinu zabalí do <ul>
function wrapChecklistInUl(text: string): string {
  const lines = text.split("\n");
  const result: string[] = [];
  let checklistBuffer: string[] = [];

  for (const line of lines) {
    if (line.trimStart().startsWith("✓")) {
      // Riadok patrí do zoznamu — odlož ho
      checklistBuffer.push(`<li>${line.trim()}</li>`);
    } else {
      // Riadok nie je ✓ — ak bol pred ním zoznam, uzavri ho
      if (checklistBuffer.length > 0) {
        result.push(
          `<ul style='list-style:none;padding:0;margin:0;text-align:left;'>${checklistBuffer.join("")}</ul>`,
        );
        checklistBuffer = [];
      }
      result.push(line);
    }
  }

  // Ak text končí ✓ riadkami, uzavri zoznam na konci
  if (checklistBuffer.length > 0) {
    result.push(
      `<ul style='list-style:none;padding:0;margin:0;text-align:left;'>${checklistBuffer.join("")}</ul>`,
    );
  }

  return result.join("\n");
}

export default function About_profhilo({
  profhilo,
  profhiloStructura,
}: {
  profhilo: ServiceRow | null;
  profhiloStructura: ServiceRow | null;
}) {
  const [openBox, setOpenBox] = useState(false);
  const [openBoxStructura, setOpenBoxStructura] = useState(false);

  const aboutTitle = profhilo?.about_title;
  const about = profhilo?.about;

  const aboutTitleStructura = profhiloStructura?.title;
  const aboutStructura = profhiloStructura?.text;

  if (!aboutTitle || !about) {
    return null;
  }

  if (!aboutTitleStructura || !aboutStructura) {
    return null;
  }

  const highLightedAboutTextProfhilo = about
    .replace(
      /Čo je Profhilo\?/gi,
      "<span style='color:#9d7410;font-weight:bold;text-transform:uppercase'>Čo je Profhilo?</span>",
    )
    .replace(
      /Ako Profhilo funguje\?/gi,
      "<span style='color:#9d7410;font-weight:bold;text-transform:uppercase'>Ako Profhilo funguje?</span>",
    )
    .replace(
      /Aké sú výhody Profhilo\?/gi,
      "<span style='color:#9d7410;font-weight:bold;text-transform:uppercase'>Aké sú výhody Profhilo?</span>",
    )
    .replace(
      /Pre koho je Profhilo vhodné\?/g,
      "<span style='color:#9d7410;font-weight:bold;text-transform:uppercase'>Pre koho je Profhilo vhodné?</span>",
    );

  const highLightedAboutTextProfhiloStructura = aboutStructura
    .replace(
      /Čo je Profhilo Structura\?/gi,
      "<span style='color:#9d7410;font-weight:bold;text-transform:uppercase'>Čo je Profhilo Structura?</span>",
    )
    .replace(
      /Ako Profhilo Structura funguje\?/gi,
      "<span style='color:#9d7410;font-weight:bold;text-transform:uppercase'>Ako Profhilo Structura funguje?</span>",
    )
    .replace(
      /Ošetrenie Profhilo Structura/gi,
      "<span style='color:#9d7410;font-weight:bold;text-transform:uppercase'>Ošetrenie Profhilo Structura</span>",
    )
    .replace(
      /Pre koho je Profhilo Structura vhodné\?/g,
      "<span style='color:#9d7410;font-weight:bold;text-transform:uppercase'>Pre koho je Profhilo Structura vhodné?</span>",
    );

  const formattedText = highLightedAboutTextProfhilo
    ? wrapChecklistInUl(highLightedAboutTextProfhilo)
    : "";

  const formattedTextStructura = highLightedAboutTextProfhiloStructura
    ? wrapChecklistInUl(highLightedAboutTextProfhiloStructura)
    : "";

  return (
    <div className="flex flex-col gap-4">
      <section className="w-full items-center justify-center">
        <div className="w-full">
          <div className="section-shell fade-up rounded-lg border border-goldDark/25 bg-white shadow-md shadow-goldDark/15">
            {/* Header */}
            <button
              type="button"
              onClick={() => {
                setOpenBox((v) => !v);
                setOpenBoxStructura(false);
              }}
              className="group flex w-full items-center justify-between gap-2 p-4 text-left hover:cursor-pointer sm:p-5 lg:p-6"
              // aria-expanded={openBox}
            >
              <div>
                <h4 className="text-lg font-semibold italic tracking-tight text-goldDark sm:text-xl lg:text-[1.75rem]">
                  {aboutTitle}
                </h4>
              </div>

              <span
                className="
              inline-flex h-10 w-10 items-center justify-center rounded-full
                border border-goldDark/35 bg-white/75
                shadow-sm shadow-goldDark/15
                transition-transform duration-300 ease-out
                group-hover:scale-105
              "
              >
                <MdKeyboardArrowDown
                  className={`text-2xl text-goldDark transition-transform duration-300 ease-out ${
                    openBox ? "rotate-180" : "rotate-0"
                  }`}
                />
              </span>
            </button>

            {/* Animated content */}
            <div
              className={`
              overflow-hidden px-4 sm:px-5 lg:px-6
              transition-[max-height,opacity] duration-500 ease-in-out
              ${openBox ? "max-h-250 opacity-100" : "max-h-0 opacity-0"}
              `}
            >
              <div className="pb-6 pt-1 flex flex-col gap-2 [&_p]:text-justify">
                <div
                  className="text-xs xl:text-sm leading-relaxed text-zinc-700 whitespace-pre-wrap"
                  dangerouslySetInnerHTML={{ __html: formattedText }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full items-center justify-center">
        <div className="w-full">
          <div className="section-shell fade-up rounded-lg border border-goldDark/25 bg-white shadow-md shadow-goldDark/15">
            {/* Header */}
            <button
              type="button"
              onClick={() => {
                setOpenBoxStructura((v) => !v);
                setOpenBox(false);
              }}
              className="group flex w-full items-center justify-between gap-2 p-4 text-left hover:cursor-pointer sm:p-5 lg:p-6"
              // aria-expanded={openBoxStructura}
            >
              <div>
                <h4 className="text-lg font-semibold italic tracking-tight text-goldDark sm:text-xl lg:text-[1.75rem]">
                  {aboutTitleStructura}
                </h4>
              </div>

              <span
                className="
                inline-flex h-10 w-10 items-center justify-center rounded-full
                border border-goldDark/35 bg-white/75
                shadow-sm shadow-goldDark/15
                transition-transform duration-300 ease-out
                group-hover:scale-105
              "
              >
                <MdKeyboardArrowDown
                  className={`text-2xl text-goldDark transition-transform duration-300 ease-out ${
                    openBoxStructura ? "rotate-180" : "rotate-0"
                  }`}
                />
              </span>
            </button>

            {/* Animated content */}
            <div
              className={`
              overflow-hidden px-4 sm:px-5 lg:px-6
              transition-[max-height,opacity] duration-500 ease-in-out
              ${openBoxStructura ? "max-h-250 opacity-100" : "max-h-0 opacity-0"}
            `}
            >
              <div className="pb-6 pt-1 flex flex-col gap-2 [&_p]:text-justify">
                <div
                  className="text-xs xl:text-sm leading-relaxed text-zinc-700 whitespace-pre-wrap"
                  dangerouslySetInnerHTML={{ __html: formattedTextStructura }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
