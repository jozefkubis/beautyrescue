"use client";

import type { MicroneedlingMainProps } from "@/app/_lib/data_services/data_microneedling";
import { dataDashboard } from "@/app/_lib/data_services_all/data_dashboard";
import type { ServiceRow } from "@/app/_lib/data_services_all/data_services";
import type { TknCategoryWithProducts } from "@/app/_lib/data_services_all/data_tkn";
import { getVisibleTknCategories } from "@/app/_lib/data_services_all/tkn_visibility";
import Image from "next/image";
import Link from "next/link";
import ExpandText from "../../ExpandText";
import { brandFont } from "../../fonts";
import Microneedling_pricing_form from "./Microneedling_pricing_form";
import Microneedling_text from "./Microneedling_text";

type MicroneedlingProps = {
  microneedlingData: MicroneedlingMainProps["microneedlingData"];
  tknCategories: TknCategoryWithProducts[];
  user?: string | null;
  isAdmin?: boolean;
  microneedling?: ServiceRow | null;
};

export default function Microneedling({
  microneedlingData,
  tknCategories,
  user,
  isAdmin,
  microneedling,
}: MicroneedlingProps) {
  const uploadedImageUrl = microneedling?.image_url?.trim();

  // Pouzijeme spolocny UI helper, ktory je bezpecny aj pre client komponent.
  const visibleTknCategories = getVisibleTknCategories(tknCategories);

  return (
    <div className="w-full items-center justify-center px-6 pt-10 2xl:px-44 lg:px-20 lg:pt-20">
      <div className="section-shell fade-up grid grid-cols-1 gap-4 p-5 lg:grid-cols-2 lg:gap-8 lg:p-8">
        <div className="flex flex-col py-10">
          <h1
            className={`premium-title pb-6 text-2xl font-semibold italic 2xl:text-5xl lg:pb-10 ${brandFont.className}`}
          >
            <span className="italic">
              <span className="text-3xl 2xl:text-6xl">
                {microneedling?.title?.[0]}
              </span>
              {microneedling?.title?.slice(1)}
            </span>
          </h1>
          <div>
            <ExpandText>
              <Microneedling_text microneedling={microneedling} />
            </ExpandText>
          </div>
        </div>

        <div className="relative mt-10 w-full aspect-4/3 overflow-hidden rounded-lg border border-goldDark/25 shadow-md shadow-goldDark/15">
          <div className="absolute inset-0 bg-linear-to-br from-white via-white/10 to-white z-50"></div>
          <Image
            src={uploadedImageUrl || "/images/microneedling.jpg"}
            alt="Microneedling"
            fill
            unoptimized
            className="object-cover"
          />
        </div>

        <div className="2xl:mt-2 p-5 lg:p-8 lg:col-span-2">
          <h2
            className={`premium-title text-xl font-semibold italic lg:text-3xl ${brandFont.className}`}
          >
            {dataDashboard.microneedling.tknTitle}
          </h2>
          <p className="mt-3 text-sm leading-6 text-greyMain/80 lg:max-w-4xl lg:text-base">
            {dataDashboard.microneedling.tknDescription}
          </p>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            {visibleTknCategories.map((category) => (
              <Link
                key={category.slug}
                href={`/cosmetics/microneedling/tkn/${category.slug}`}
                className="group relative overflow-hidden rounded-xl border border-goldDark/20 bg-linear-to-br from-white to-[#f8f1e8] p-5 shadow-sm transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-goldLight/15 blur-2xl transition-opacity duration-300 group-hover:opacity-90" />
                <p className="text-xs uppercase tracking-[0.16em] text-goldDark/70">
                  {dataDashboard.microneedling.categoryBadge}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-greyMain">
                  {category.title}
                </h3>
                {/* Kratky uvod ku kategorii, aby uzivatel vedel, co v sekcii najde. */}
                <p className="mt-2 text-sm leading-6 text-greyMain/80">
                  {category.intro}
                </p>
                <div className="mt-4 flex items-center justify-between text-sm">
                  <span className="rounded-full border border-goldDark/25 px-3 py-1 text-goldDark">
                    {category.products.length}{" "}
                    {dataDashboard.microneedling.productsSuffix}
                  </span>
                  <span className="font-semibold text-redDark transition-transform duration-300 group-hover:translate-x-1">
                    {dataDashboard.microneedling.openCta}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-10 2xl:mt-20 lg:col-span-2">
          <Microneedling_pricing_form
            microneedlingData={microneedlingData}
            user={user}
            isAdmin={isAdmin}
          />
        </div>
      </div>
    </div>
  );
}
