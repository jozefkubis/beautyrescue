import { brandFont } from "@/app/_components/fonts";
import AdminDashboardCard from "./AdminDashboardCard";
import { RiCornerUpLeftDoubleLine, RiDropLine, RiImageLine, RiInformationLine, RiScissorsLine, RiSyringeLine, RiWindyLine } from "react-icons/ri";
import { GiChemicalDrop } from "react-icons/gi";
import { IoDiamondOutline } from "react-icons/io5";
import { BsStars } from "react-icons/bs";

const adminSections = [
  {
    href: "/admin/about_settings",
    title: "O nás",
    // description: "Úprava úvodných textov, podtextov a prezentačného obsahu značky.",
    label: "O nás",
    icon: RiInformationLine, // info → sedí pre about
  },

  // 🧴 Kozmetika
  {
    href: "/admin/cosmetics_settings/chemical-peeling_settings",
    title: "Chemický peeling",
    // description: "Úprava textov, podtextov a prezentačných detailov procedúry.",
    label: "Kozmetika",
    icon: GiChemicalDrop, // chemický proces 👍
  },
  {
    href: "/admin/cosmetics_settings/diamond-microdermabrasion_settings",
    title: "Diamantová mikrodermabrázia",
    // description: "Úprava textov, podtextov a prezentačného obsahu procedúry.",
    label: "Kozmetika",
    icon: IoDiamondOutline, // diamant 💎 → perfektné
  },
  {
    href: "/admin/cosmetics_settings/mezoterapia_settings",
    title: "Mezoterapia",
    // description: "Úprava textov, podtextov a prezentačných detailov mezoterapie.",
    label: "Kozmetika",
    icon: RiSyringeLine, // injekcie 👍
  },
  {
    href: "/admin/cosmetics_settings/microneedling_settings",
    title: "Microneedling",
    // description: "Úprava textov, podtextov a detailov microneedling sekcie.",
    label: "Kozmetika",
    icon: RiCornerUpLeftDoubleLine, // ideálne pre ihličky 👍
  },
  {
    href: "/admin/cosmetics_settings/oxygeneo_settings",
    title: "Oxygeneo",
    // description: "Úprava textov, podtextov a benefitov Oxygeneo procedúry.",
    label: "Kozmetika",
    icon: RiWindyLine, // kyslík / vzduch 🌬️ → sedí lepšie
  },

  // 🏥 Lekárska kozmetika
  {
    href: "/admin/medical-cosmetics_settings/biokompatibilne-nite_settings",
    title: "Biokompatibilné Nite",
    // description: "Úprava textov, podtextov a prezentačných detailov procedúry.",
    label: "Lekárska Kozmetika",
    icon: RiScissorsLine, // jemne evokuje zákrok
  },
  {
    href: "/admin/medical-cosmetics_settings/botulotoxin_settings",
    title: "Botulotoxín",
    // description: "Úprava textov, podkladových informácií a popisov botulotoxínu.",
    label: "Lekárska Kozmetika",
    icon: RiSyringeLine, // jasná voľba 👍
  },
  {
    href: "/admin/medical-cosmetics_settings/jalupro_settings",
    title: "Jalupro",
    // description: "Úprava textov, podtextov a prezentačných detailov Jalupro sekcie.",
    label: "Lekárska Kozmetika",
    icon: RiDropLine, // hydratácia 💧
  },
  {
    href: "/admin/medical-cosmetics_settings/kyselina-hyaluronova_settings",
    title: "Kyselina Hyalurónová",
    // description: "Úprava textov, podtextov a obsahu pre výplne a hydratáciu.",
    label: "Lekárska Kozmetika",
    icon: RiDropLine, // hydratácia 💧 (konzistentné)
  },
  {
    href: "/admin/medical-cosmetics_settings/profhilo_settings",
    title: "Profhilo",
    // description: "Úprava textov, podtextov a prezentačných detailov Profhilo ošetrenia.",
    label: "Lekárska Kozmetika",
    icon: RiSyringeLine, // stále injekčná procedúra 👍
  },
  {
    href: "/admin/acupuncture_settings",
    title: "Lekárska akupunktúra",
    label: "Akupunktúra",
    icon: RiCornerUpLeftDoubleLine, // opäť ideálne pro ihličky 👍
  },
  {
    href: "/admin/promotions_settings",
    title: "Novinky a akcie",
    label: "Promotions",
    icon: BsStars, // obecné info 👍
  },
  {
    href: "/admin/mainImage_settings",
    title: "Hlavný obrázok",
    label: "Hlavný obrázok",
    icon: RiImageLine, // hlavný obrázok 🖼️
  },
] as const;

export default function AdminDashboard() {
  return (
    <section className="w-full items-center justify-center px-6 pt-10 2xl:px-44 lg:px-20 lg:pt-20">
      <div className="section-shell fade-up overflow-hidden p-6 sm:p-8 lg:p-10">
        <div className="relative">
          <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-goldDark/35 to-transparent" />

          <div className="grid gap-8 lg:grid-cols-1 lg:items-start">
            <div className="space-y-5 mt-4 lg:space-y-6">
              <div className="inline-flex rounded-full border border-redMain/15 bg-redMain/8 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-redDark">
                Prehľad nastavení
              </div>

              <div className="space-y-4">
                <h1
                  className={`premium-title text-3xl font-semibold italic tracking-tight sm:text-4xl lg:text-5xl ${brandFont.className}`}
                >
                  Nastavenia a správa obsahu
                </h1>
              </div>
            </div>

            <aside className="rounded-[28px] border border-goldDark/15 bg-[linear-gradient(180deg,rgba(255,252,247,0.94)_0%,rgba(255,245,235,0.88)_100%)] p-5 shadow-[0_14px_32px_rgba(157,116,16,0.08)]">
              <div className="space-y-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-redDark/75">
                  Admin access
                </p>
                <h2 className="text-2xl font-semibold tracking-tight text-goldDark">
                  Centralizovaná úprava obsahu
                </h2>
                <p className="text-sm leading-7 text-greyMain/75">
                  Otvorte konkrétnu settings stránku cez karty nižšie a
                  spravujte texty, podklady a prezentačné popisy jednotlivých
                  sekcií. Na desktope sú zoradené v prehľadnom gride, na mobile
                  plynulo prechádzajú do jedného stĺpca bez straty čitateľnosti.
                </p>
              </div>
            </aside>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {adminSections.map((section) => (
              <AdminDashboardCard
                key={section.href}
                href={section.href}
                title={section.title}
                // description={section.description}
                label={section.label}
                icon={section.icon}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
