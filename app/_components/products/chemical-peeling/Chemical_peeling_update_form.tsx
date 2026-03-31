"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";
import toast from "react-hot-toast";

type ChemicalPeelingData = {
  slug?: string;
  name?: string;
  summary?: string;
  is_active?: boolean;
  metadata?: {
    quoteAuthor?: string;
  };
  content?: {
    paragraphs?: string;
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

  const router = useRouter();

  // isPending = true kým beží ukladanie na server; startTransition spustí async akciu.
  const [isPending, startTransition] = useTransition();

  // Počiatočné hodnoty formulára – naplnené z DB dát.
  // useMemo zabezpečí, že sa tieto hodnoty prepočítajú iba ak sa zmení aboutUsData.
  const initialValues = useMemo(
    () => ({
      name: chemicalPeelingData?.name ?? "",
      content: chemicalPeelingData?.content?.paragraphs ?? "",
      isActive: chemicalPeelingData?.is_active ?? false,
    }),
    [chemicalPeelingData],
  );

  // formValues = to, čo admin práve píše do formulára (live stav).
  const [formValues, setFormValues] = useState(initialValues);

  // lastSavedValues = posledný stav, ktorý bol úspešne uložený do DB.
  // Používa sa na detekciu zmien a funkciu Undo.
  const [lastSavedValues, setLastSavedValues] = useState(initialValues);

  // Generická funkcia na aktualizáciu ľubovoľného poľa vo formulári.
  // na pochopenie: "prev" je starý stav formulára, "...prev" ho skopíruje
  // a [field]: value prepíše iba jedno vybrané pole.
  function handleChange(
    field: keyof typeof formValues,
    value: string | boolean,
  ) {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  }

  // Vráti formulár do stavu posledného úspešného uloženia.
  function handleUndo() {
    setFormValues(lastSavedValues);
    toast.success("Zmeny boli vrátené");
  }

  function handleSubmit() {
    console.log("Form submitted");
  }

  // true ak sa aktuálne hodnoty líšia od posledného uloženia → aktivuje tlačidlá.
  const hasChanges =
    JSON.stringify(formValues) !== JSON.stringify(lastSavedValues);

  // Ak sa dáta z DB nepodarilo načítať, zobrazíme chybovú správu namiesto formulára.
  if (!chemicalPeelingData) {
    return (
      <div className="section-shell mx-auto w-full max-w-3xl p-6 text-center text-redDark">
        Dáta pre stránku Chemický peeling sa nepodarilo načítať.
      </div>
    );
  }

  return (
    <section
      onSubmit={handleSubmit}
      className="w-full items-center justify-center px-6 pt-10 2xl:px-44 lg:px-20 lg:pt-20"
    >
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

        <form action={handleSubmit} className="space-y-5 px-5 pb-6 md:px-8">
          <div className="grid grid-cols-1 gap-4">
            <label className="flex flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-goldDark/80">
                Názov
              </span>
              <input
                type="text"
                value={formValues.name}
                onChange={(e) => handleChange("name", e.target.value)}
                readOnly={!isAdmin}
                className="h-12 rounded-xl border border-goldDark/20 bg-white px-4 text-sm text-gray-800 outline-none transition focus:border-goldDark/35"
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-goldDark/80">
                Obsah
              </span>
              <textarea
                rows={10}
                value={formValues.content}
                onChange={(e) => handleChange("content", e.target.value)}
                readOnly={!isAdmin}
                className="w-full rounded-xl border border-goldDark/20 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-goldDark/35"
              />
            </label>

            <label className="flex items-center gap-3 cursor-pointer w-full justify-between">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-goldDark/80">
                {formValues.isActive ? "Aktívne" : "Neaktívne"}
              </span>

              <input
                type="checkbox"
                checked={formValues.isActive}
                onChange={(e) => handleChange("isActive", e.target.checked)}
                disabled={!isAdmin}
                className="sr-only"
              />

              <div
                className={`flex h-6 w-10 items-center rounded-full p-1 transition ${
                  formValues.isActive ? "bg-goldLight" : "bg-gray-400"
                }`}
              >
                <div
                  className={`h-4 w-4 rounded-full bg-white shadow-md transform transition ${
                    formValues.isActive ? "translate-x-4" : "translate-x-0"
                  }`}
                />
              </div>
            </label>

            <div className="flex flex-col gap-3 border-t border-goldDark/10 pt-5 sm:flex-row sm:items-center sm:justify-end">
              <button
                type="button"
                onClick={handleUndo}
                disabled={!hasChanges || isPending || !isAdmin}
                className="inline-flex h-11 items-center justify-center rounded-full border border-goldDark/15 bg-white px-5 text-sm font-semibold text-goldDark transition duration-300 hover:-translate-y-0.5 hover:cursor-pointer hover:border-goldDark/30 hover:bg-[#fffaf2] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
              >
                Undo
              </button>

              <button
                type="submit"
                disabled={!hasChanges || isPending || !isAdmin}
                className="inline-flex h-11 items-center justify-center rounded-full bg-linear-to-r from-redMain to-redDark px-6 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(190,18,60,0.22)] transition duration-300 hover:-translate-y-0.5 hover:cursor-pointer hover:shadow-[0_14px_30px_rgba(190,18,60,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-redMain/25 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
              >
                {isPending ? "Ukladám..." : "Uložiť zmeny"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
