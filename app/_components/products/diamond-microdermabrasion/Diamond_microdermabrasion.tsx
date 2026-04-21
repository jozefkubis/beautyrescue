"use client";

import type { ServiceRow } from "@/app/_lib/data_services_all/data_services";
import Image from "next/image";
import ExpandText from "../../ExpandText";
import ExpandTextLG from "../../ExpandTextLG";
import { brandFont } from "../../fonts";
import Diamond_microdermabrasion_text from "./Diamond_microdermabrasion_text";
import Dimond_micro_pricing_form from "./Dimond_micro_pricing_form";

type DiamondMicrodermabrasionProps = {
  diamondMicroderm?: ServiceRow | null;
  user?: string | null;
  isAdmin?: boolean;
};

export default function Diamond_microdermabrasion({
  diamondMicroderm,
  user,
  isAdmin,
}: DiamondMicrodermabrasionProps) {
  const uploadedImageUrl = diamondMicroderm?.image_url?.trim();

  return (
    <div className="w-full items-center justify-center px-6 pt-10 2xl:px-44 lg:px-20 lg:pt-20">
      <div className="section-shell fade-up grid grid-cols-1 gap-4 p-5 lg:grid-cols-2 lg:gap-8 lg:p-8">
        <div className="flex flex-col py-10">
          <h1
            className={`premium-title pb-6 text-2xl font-semibold italic 2xl:text-5xl lg:pb-10 ${brandFont.className}`}
          >
            <span className="italic">
              <span className="text-3xl 2xl:text-6xl">
                {diamondMicroderm?.title?.[0]}
              </span>
              {diamondMicroderm?.title?.slice(1)}
            </span>
          </h1>
          <div>
            <div className="lg:hidden">
              <ExpandText>
                <Diamond_microdermabrasion_text
                  diamondMicroderm={diamondMicroderm}
                />
              </ExpandText>
            </div>
            <div className="hidden lg:block">
              <ExpandTextLG>
                <Diamond_microdermabrasion_text
                  diamondMicroderm={diamondMicroderm}
                />
              </ExpandTextLG>
            </div>
          </div>
        </div>

        <div className="relative mt-10 w-full aspect-4/3 overflow-hidden rounded-lg border border-goldDark/25 shadow-md shadow-goldDark/15">
          <Image
            src={uploadedImageUrl || "/images/diamond_microdermabrasion.jpeg"}
            alt="Diamond microdermabrasion"
            fill
            unoptimized
            className="object-cover"
          />
        </div>

        <div className="mt-10 2xl:mt-20 lg:col-span-2">
          <Dimond_micro_pricing_form
            diamondMicroderm={diamondMicroderm}
            user={user}
            isAdmin={isAdmin}
          />
        </div>
      </div>
    </div>
  );
}
