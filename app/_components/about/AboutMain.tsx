"use client";

import { AboutMainProps } from "@/app/_lib/data_services_all/data_about";
import Image from "next/image";
import ExpandText from "../ExpandText";
import { brandFont } from "../fonts";
import AboutText from "./AboutText";

export default function AboutMain({ aboutUsData }: AboutMainProps) {
  const uploadedImageUrl = aboutUsData.image_url?.trim();

  return (
    <div className="w-full items-center justify-center px-6 pt-10 2xl:px-44 lg:px-20 lg:pt-20">
      <div className="section-shell fade-up grid grid-cols-1 gap-6 p-5 lg:grid-cols-2 lg:p-7">
        {/* Ľavý stĺpec – text */}
        <div className="flex flex-col">
          <h1
            className={`premium-title py-8 text-2xl font-semibold italic 2xl:text-5xl  ${brandFont.className}`}
          >
            <span className="italic">{aboutUsData.title}</span>
          </h1>
          <div className="[&_p]:text-justify">
            <p className="whitespace-pre-wrap text-sm leading-8 text-greyMain/85 xl:text-base 2xl:text-lg">
              <span className="italic">
                <strong>&ldquo;{aboutUsData.quote}&rdquo;</strong>
                <span className="text-xs">
                  {" "}
                  <strong>{aboutUsData.quote_author as string}</strong>
                </span>
              </span>
              <br />
            </p>
            <ExpandText>
              <AboutText aboutUsData={aboutUsData} />
            </ExpandText>
          </div>
        </div>

        {/* Pravý stĺpec – obrázok */}
        <div className="relative mt-10 h-56 overflow-hidden rounded-lg border border-goldDark/25 shadow-md shadow-goldDark/15 md:h-125 lg:h-[90%] lg:w-full">
          <Image
            src={uploadedImageUrl || "/images/about_us.jpg"}
            alt="About Us"
            fill
            unoptimized
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
