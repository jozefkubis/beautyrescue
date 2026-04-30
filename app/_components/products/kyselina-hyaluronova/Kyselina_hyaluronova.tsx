"use client";

import { ServiceRow } from "@/app/_lib/data_services_all/data_services";
import Image from "next/image";
import Link from "next/link";
import ExpandText from "../../ExpandText";
import { brandFont } from "../../fonts";
import Kyselina_hyaluronova_pricing_form from "./Kyselina_hyaluronova_pricing_form";
import Kyselina_hyaluronova_text from "./Kyselina_hyaluronova_text";

type Kyselina_hyaluronovaProps = {
  kyselinaHyaluronova?: ServiceRow | null | undefined;
  user?: string | null;
  isAdmin?: boolean;
};

export default function Kyselina_hyaluronova({
  kyselinaHyaluronova,
  user,
  isAdmin,
}: Kyselina_hyaluronovaProps) {
  const uploadedImageUrl = kyselinaHyaluronova?.image_url?.trim();

  return (
    <div className="w-full items-center justify-center px-6 pt-10 2xl:px-44 lg:px-20 lg:pt-20">
      <div className="section-shell fade-up grid grid-cols-1 gap-4 p-5 lg:grid-cols-2 lg:gap-8 lg:p-8">
        <div className="flex flex-col py-10">
          <h1
            className={`premium-title pb-6 text-2xl font-semibold italic 2xl:text-5xl lg:pb-10 ${brandFont.className}`}
          >
            <span className="italic">
              <span className="text-3xl 2xl:text-6xl">
                {kyselinaHyaluronova?.title?.[0]}
              </span>
              {kyselinaHyaluronova?.title?.slice(1)}
            </span>
          </h1>
          <div>
            <ExpandText>
              <Kyselina_hyaluronova_text
                kyselinaHyaluronova={kyselinaHyaluronova}
              />
            </ExpandText>
          </div>
        </div>

        <div className="relative mt-10 h-56 overflow-hidden rounded-lg border border-goldDark/25 shadow-md shadow-goldDark/15 md:h-125 lg:h-[90%] lg:w-full aspect-auto">
          <Image
            src={uploadedImageUrl || "/images/kyselina_hyaluronova.jpeg"}
            alt="Kyselina hyaluronová v Beauty Rescue Žilina"
            fill
            unoptimized
            className="object-cover"
          />
        </div>

        <div className="fade-up mt-10 lg:mt-12 lg:col-span-2">
          <div className="flex justify-around gap-3 sm:gap-4 lg:gap-5">
            {kyselinaHyaluronova?.image_gallery?.map(
              ({ src, alt }: { src: string; alt?: string }) => {
                const isFace = src.includes("kyselina_hyaluronova2");
                const linkHref = isFace
                  ? "/medical-cosmetics/kyselina-hyaluronova/face"
                  : "/medical-cosmetics/kyselina-hyaluronova/lips";

                return (
                  <Link
                    href={linkHref}
                    key={src}
                    className="relative aspect-square w-1/4 overflow-hidden rounded-2xl border border-goldDark/25 shadow-md shadow-goldDark/15"
                  >
                    <Image
                      src={src}
                      alt={alt ? `${alt} v Beauty Rescue Žilina` : ""}
                      fill
                      className="object-cover transition-transform duration-300 ease-out hover:scale-105 hover:cursor-pointer"
                      priority={false}
                    />
                  </Link>
                );
              },
            )}
          </div>
        </div>

        <div className="mt-10 2xl:mt-20 lg:col-span-2">
          <Kyselina_hyaluronova_pricing_form
            kyselinaHyaluronova={kyselinaHyaluronova}
            user={user}
            isAdmin={isAdmin}
          />
        </div>
      </div>
    </div>
  );
}
