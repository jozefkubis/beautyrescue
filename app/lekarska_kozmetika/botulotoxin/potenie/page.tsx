import Botulotoxin_potenie from "@/app/_components/products/botulotoxin/potenie/botulotoxin_potenie";
import getServiceBySlug from "@/app/_lib/data_services_all/data_services";
import { createPageMetadata } from "@/app/_lib/seo";

export const metadata = createPageMetadata("botulotoxinPotenie");

export default async function Page() {
  const botulotoxinPotenie = await getServiceBySlug("botulotoxin-potenie");

  const isActive = botulotoxinPotenie?.is_active ?? false;

  if (!isActive) {
    return (
      <div className="flex h-screen items-center justify-center px-4">
        <div className="section-shell fade-up w-full max-w-2xl p-8 text-center md:p-10">
          <p className="mb-3 text-xs font-medium tracking-[0.2em] text-goldDark uppercase">
            Signature Collection
          </p>
          <h1 className="premium-title mb-4 text-3xl leading-tight font-semibold md:text-4xl">
            Luxus potrebuje svoj moment.
          </h1>
          <p className="mx-auto max-w-xl text-sm leading-relaxed text-greyMain md:text-base">
            Táto procedúra je dočasne pozastavená, aby sme zachovali náš
            prémiový štandard výsledkov. Pre osobné odporúčanie alternatívy nás
            kontaktujte a pripravíme pre vás individuálny plán.
          </p>
        </div>
      </div>
    );
  }

  return <Botulotoxin_potenie botulotoxinPotenie={botulotoxinPotenie} />;
}
