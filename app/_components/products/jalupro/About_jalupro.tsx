"use client";

import type { ServiceRow } from "@/app/_lib/data_services_all/data_services";
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

export default function About_jalupro({
  jalupro,
}: {
  jalupro: ServiceRow | null | undefined;
}) {
  const [openBox, setOpenBox] = useState(false);
  const aboutText = jalupro?.about ?? "";
  const aboutTitle = jalupro?.about_title ?? "";

  const highLightedAboutText = aboutText
    .replace(
      /Účinky/gi,
      "<span style='color:#9d7410;font-weight:bold;text-transform:uppercase'>Účinky</span>",
    )
    .replace(
      /Efekt/gi,
      "<span style='color:#9d7410;font-weight:bold;'>Efekt</span>",
    )
    .replace(
      /Priebeh ošetrenia/gi,
      "<span style='color:#9d7410;font-weight:bold;text-transform:uppercase'>Priebeh ošetrenia</span>",
    )
    .replace(
      /Po ošetrení/g,
      "<span style='color:#9d7410;font-weight:bold;text-transform:uppercase'>Po ošetrení</span>",
    )
    .replace(
      /Varianty Jalupro:/gi,
      "<span style='color:#9d7410;font-weight:bold;'>Varianty Jalupro:</span>",
    );

  const formattedText = highLightedAboutText
    ? wrapChecklistInUl(highLightedAboutText)
    : "";

  return (
    <section className="w-full items-center justify-center">
      <div className="w-full">
        <div className="section-shell fade-up rounded-lg border border-goldDark/25 bg-white shadow-md shadow-goldDark/15">
          <button
            type="button"
            onClick={() => setOpenBox((v) => !v)}
            className="group flex w-full items-center justify-between gap-2 p-4 text-left hover:cursor-pointer sm:p-5 lg:p-6"
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

          <div
            className={`
              overflow-hidden px-4 sm:px-5 lg:px-6
              transition-[max-height,opacity] duration-500 ease-in-out
              ${openBox ? "max-h-250 opacity-100" : "max-h-0 opacity-0"}
              `}
          >
            <div className=" text-xs 2xl:text-sm [&_p]:text-justify">
              <div
                className="text-gray-700 leading-relaxed whitespace-pre-wrap pb-4"
                dangerouslySetInnerHTML={{ __html: formattedText }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
