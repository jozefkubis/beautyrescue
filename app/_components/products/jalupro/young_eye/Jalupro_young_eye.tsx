import ExpandText from "@/app/_components/ExpandText";
import { brandFont } from "@/app/_components/fonts";
import type { ServiceRow } from "@/app/_lib/data_services_all/data_services";
import Image from "next/image";
import Jalupro_young_eye_pricing_form from "./Jalupro_young_eye_pricing_form";
import Jalupro_young_eye_text from "./Jalupro_young_eye_text";

type Jalupro_young_eyeProps = {
  jaluproYoungEye?: ServiceRow | null | undefined;
  user?: string | null;
  isAdmin?: boolean;
};

export default function Jalupro_young_eye({
  jaluproYoungEye,
  user,
  isAdmin,
}: Jalupro_young_eyeProps) {
  const uploadedImageUrl = jaluproYoungEye?.image_url?.trim();

  return (
    <div className="w-full items-center justify-center px-6 pt-10 2xl:px-44 lg:px-20 lg:pt-20">
      <div className="section-shell fade-up grid grid-cols-1 gap-2 p-5 lg:grid-cols-2 lg:gap-4 lg:p-8">
        <div className="flex flex-col py-10">
          <h1
            className={`premium-title pb-6 text-2xl font-semibold italic 2xl:text-5xl lg:pb-10 ${brandFont.className}`}
          >
            <span className="italic">
              <span className="text-3xl 2xl:text-6xl">
                {jaluproYoungEye?.title?.[0]}
              </span>
              {jaluproYoungEye?.title?.slice(1)}
            </span>
          </h1>
          <div>
            <ExpandText>
              <Jalupro_young_eye_text jaluproYoungEye={jaluproYoungEye} />
            </ExpandText>
          </div>
        </div>

        <div className="relative mt-10 w-full aspect-4/3 overflow-hidden rounded-lg border border-goldDark/25 shadow-md shadow-goldDark/15">
          <Image
            src={uploadedImageUrl || "/images/jalupro_young_eye.jpeg"}
            alt="Jalupro Young Eye v Beauty Rescue Žilina"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        <div className="mt-10 2xl:mt-20 lg:col-span-2">
          <Jalupro_young_eye_pricing_form
            jaluproYoungEye={jaluproYoungEye}
            user={user}
            isAdmin={isAdmin}
          />
        </div>
      </div>
    </div>
  );
}
