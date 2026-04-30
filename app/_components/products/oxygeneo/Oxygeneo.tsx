import type { ServiceRow } from "@/app/_lib/data_services_all/data_services";
import Image from "next/image";
import ExpandText from "../../ExpandText";
import { brandFont } from "../../fonts";
import Oxygeneo_pricing_form from "./Oxygeneo_pricing_form";
import Oxygeneo_text from "./Oxygeneo_text";

type OxygeneoProps = {
  oxygeneo?: ServiceRow | null;
  user?: string | null;
  isAdmin?: boolean;
};

export default function Oxygeneo({ oxygeneo, user, isAdmin }: OxygeneoProps) {
  // Ak je v DB nahraný obrázok zo Storage, použijeme ho; inak ostáva lokálny fallback.
  const uploadedImageUrl = oxygeneo?.image_url?.trim();

  return (
    <div className="w-full items-center justify-center px-6 pt-10 2xl:px-44 lg:px-20 lg:pt-20">
      <div className="section-shell fade-up grid grid-cols-1 gap-4 p-5 lg:grid-cols-2 lg:gap-8 lg:p-8">
        <div className="flex flex-col py-10">
          <h1
            className={`premium-title pb-6 text-2xl font-semibold italic 2xl:text-5xl lg:pb-10 ${brandFont.className}`}
          >
            <span className="italic">
              <span className="text-3xl 2xl:text-6xl">
                {oxygeneo?.title?.[0]}
              </span>
              {oxygeneo?.title?.slice(1)}
            </span>
          </h1>
          <div>
            <ExpandText>
              <Oxygeneo_text oxygeneo={oxygeneo} />
            </ExpandText>
          </div>
        </div>

        <div className="relative mt-10 w-full aspect-4/3 overflow-hidden rounded-lg border border-goldDark/25 shadow-md shadow-goldDark/15">
          <Image
            src={uploadedImageUrl || "/images/oxygeneo.jpeg"}
            alt="Oxygeneo v Beauty Rescue Žilina"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        <div className="mt-10 2xl:mt-20 lg:col-span-2">
          <Oxygeneo_pricing_form
            oxygeneo={oxygeneo}
            user={user}
            isAdmin={isAdmin}
          />
        </div>
      </div>
    </div>
  );
}
