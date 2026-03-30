"use client";

type ChemicalPeelingData = {
  slug?: string;
  name?: string;
  summary?: string;
  is_active?: boolean;
  metadata?: {
    quoteAuthor?: string;
  };
  content?: {
    bodyIntro?: string;
    bodyTeam?: string;
    bodyServices?: string;
    bodyPhilosophy?: string;
  };
};

type ChemicalPeelingUpdateFormProps = {
  chemicalPeelingData: ChemicalPeelingData | null;
  isAdmin?: boolean;
};

export default function Chemical_peeling_update_form({
  chemicalPeelingData,
  isAdmin,
}: ChemicalPeelingUpdateFormProps) {
  console.log("Received chemicalPeelingData:", chemicalPeelingData);
  console.log("isAdmin:", isAdmin);
  console.log("isActive:", chemicalPeelingData?.is_active);

  return (
    <section className="w-full items-center justify-center px-6 pt-10 2xl:px-44 lg:px-20 lg:pt-20">
      <div className="section-shell fade-up grid grid-cols-1 gap-2 p-5 lg:gap-4 lg:p-8 lg:px-44">
        <div className="px-6 pb-7 pt-7 md:px-8">
          <div className="flex flex-col items-center text-center">
            <p className="inline-flex rounded-full bg-[#fff6ee] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-goldDark">
              Nastavenia obsahu
            </p>
            <h1 className="mt-4 text-3xl font-semibold italic text-goldDark sm:text-4xl">
              Chemický peeling
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}
