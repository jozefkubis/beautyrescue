"use client";

import { ServiceRow } from "@/app/_lib/data_services_all/data_services";
import { highlightKeywords, wrapChecklistInUl } from "@/app/_lib/helpers";
import { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

export default function About_profhilo({
  profhilo,
  profhiloStructura,
}: {
  profhilo: ServiceRow | null | undefined;
  profhiloStructura: ServiceRow | null | undefined;
}) {
  const isActive = profhiloStructura?.is_active ?? false;
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

  const highLightedAboutTextProfhilo = highlightKeywords(about);

  const highLightedAboutTextProfhiloStructura =
    highlightKeywords(aboutStructura);

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
                  className="text-xs 2xl:text-sm leading-relaxed text-zinc-700 whitespace-pre-wrap pb-4"
                  dangerouslySetInnerHTML={{ __html: formattedText }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {isActive && (
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
                    className="text-xs 2xl:text-sm leading-relaxed text-zinc-700 whitespace-pre-wrap pb-4"
                    dangerouslySetInnerHTML={{ __html: formattedTextStructura }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
