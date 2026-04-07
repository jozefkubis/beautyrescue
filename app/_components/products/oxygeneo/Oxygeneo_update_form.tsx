"use client";

import CheckboxField from "@/app/_components/CheckboxField";
import InputField from "@/app/_components/InputField";
import SubmitButton from "@/app/_components/SubmitButton";
import TextareaField from "@/app/_components/TextareaField";
import UndoButton from "@/app/_components/UndoButton";
import { updateOxygeneo } from "@/app/_lib/actions/actions_oxygeneo";
import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";
import toast from "react-hot-toast";
import FileField from "../../FileField";

type OxygeneoData = {
  slug?: string;
  name?: string;
  image_url?: string;
  content: {
    intro?: string;
    description?: string;
    stepsTitle?: string;
    steps?: string[];
    result?: string;
  };
  metadata: {
    citationLabel?: string;
    citationUrl?: string;
  };
  is_active?: boolean;
};

type OxygeneoUpdateFormProps = {
  oxygeneoData: OxygeneoData;
  isAdmin?: boolean;
};

export default function Oxygeneo_update_form({
  oxygeneoData,
  isAdmin,
}: OxygeneoUpdateFormProps) {
  const router = useRouter();

  // isPending = true kým beží ukladanie na server; startTransition spustí async akciu.
  const [isPending, startTransition] = useTransition();

  // Počiatočné hodnoty formulára – naplnené z DB dát.
  // useMemo zabezpečí, že sa tieto hodnoty prepočítajú iba ak sa zmení aboutUsData.
  const initialValues = useMemo(
    () => ({
      name: oxygeneoData?.name ?? "",
      image_url: oxygeneoData?.image_url ?? "",
      intro: oxygeneoData?.content?.intro ?? "",
      steps: Array.isArray(oxygeneoData?.content?.steps)
        ? oxygeneoData.content.steps.join("\n")
        : "",
      result: oxygeneoData?.content?.result ?? "",
      stepsTitle: oxygeneoData?.content?.stepsTitle ?? "",
      description: oxygeneoData?.content?.description ?? "",
      citationLabel: oxygeneoData?.metadata?.citationLabel ?? "",
      citationUrl: oxygeneoData?.metadata?.citationUrl ?? "",
      isActive: oxygeneoData?.is_active ?? false,
    }),
    [oxygeneoData],
  );

  // formValues = to, čo admin práve píše do formulára (live stav).
  const [formValues, setFormValues] = useState(initialValues);

  // Vybraný obrázok držíme samostatne, aby sa poslal ako File vo FormData.
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);

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
    setSelectedImageFile(null);
    toast.success("Zmeny boli vrátené");
  }

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      try {
        // Pridáme slug, aby server vedel, ktorý záznam v DB má aktualizovať.
        formData.set("slug", oxygeneoData?.slug ?? "oxygeneo");
        // Celý stav formulára serializujeme do JSON v tvare, ktorý očakáva server action.
        formData.set(
          "data",
          JSON.stringify({
            name: formValues.name,
            content: {
              intro: formValues.intro,
              steps: formValues.steps,
              result: formValues.result,
              stepsTitle: formValues.stepsTitle,
              description: formValues.description,
            },
            metadata: {
              citationLabel: formValues.citationLabel,
              citationUrl: formValues.citationUrl,
            },
            is_active: formValues.isActive,
          }),
        );

        if (selectedImageFile) {
          formData.set("image_file", selectedImageFile);
        }

        await updateOxygeneo(formData);

        // Po úspešnom uložení aktualizujeme "zálohu" pre Undo.
        setLastSavedValues(formValues);
        // Obnoví Next.js cache a re-fetchne dáta na stránke.
        router.refresh();
        toast.success("Sekcia Oxygeneo bola aktualizovaná");
      } catch (error) {
        console.error(error);
        toast.error("Chyba pri ukladaní Oxygeneo");
      }
    });
  }

  // true ak sa aktuálne hodnoty líšia od posledného uloženia → aktivuje tlačidlá.
  const hasChanges =
    JSON.stringify(formValues) !== JSON.stringify(lastSavedValues) ||
    selectedImageFile !== null;

  // Ak sa dáta z DB nepodarilo načítať, zobrazíme chybovú správu namiesto formulára.
  if (!oxygeneoData) {
    return (
      <div className="section-shell mx-auto w-full max-w-3xl p-6 text-center text-redDark">
        Dáta pre stránku Oxygeneo sa nepodarilo načítať.
      </div>
    );
  }

  return (
    <section className="w-full items-center justify-center px-6 pt-10 2xl:px-44 lg:px-20 lg:pt-20">
      <div className="section-shell fade-up grid grid-cols-1 gap-2 p-5 lg:gap-4 lg:p-8 lg:px-44">
        <div className="px-6 pb-7 pt-7 md:px-8">
          <div className="flex flex-col items-center text-center">
            <p className="inline-flex rounded-full bg-[#fff6ee] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-goldDark">
              Nastavenia obsahu
            </p>
            <h1 className="mt-4 text-3xl font-semibold italic text-goldDark sm:text-4xl">
              Oxygeneo
            </h1>
          </div>
        </div>

        <form action={handleSubmit} className="space-y-5 px-5 pb-6 md:px-8">
          <div className="grid grid-cols-1 gap-4">
            {/* Textové pole pre názov */}
            <InputField
              label="Názov"
              value={formValues.name}
              onChange={(e) => handleChange("name", e.target.value)}
              readOnly={!isAdmin}
            />
            {/* Textarea pre úvod */}
            <TextareaField
              label="Obsah - Úvod"
              value={formValues.intro}
              onChange={(e) => handleChange("intro", e.target.value)}
              readOnly={!isAdmin}
            />
            {/* Textarea pre popis */}
            <TextareaField
              label="Obsah - popis"
              value={formValues.description}
              onChange={(e) => handleChange("description", e.target.value)}
              readOnly={!isAdmin}
            />
            {/* Textové pole pre kroky - nadpis */}
            <InputField
              label="Kroky - nadpis"
              value={formValues.stepsTitle}
              onChange={(e) => handleChange("stepsTitle", e.target.value)}
              readOnly={!isAdmin}
            />
            {/* Textarea pre kroky - popis */}
            <TextareaField
              label="Kroky - popis"
              value={formValues.steps}
              onChange={(e) => handleChange("steps", e.target.value)}
              readOnly={!isAdmin}
            />
            {/* Textové pole pre odkaz URL */}
            <InputField
              label="Odkaz URL"
              value={formValues.citationUrl}
              onChange={(e) => handleChange("citationUrl", e.target.value)}
              readOnly={!isAdmin}
            />
            {/* Textarea pre výsledok */}
            <TextareaField
              label="Výsledek"
              value={formValues.result}
              onChange={(e) => handleChange("result", e.target.value)}
              readOnly={!isAdmin}
            />

            <FileField
              type="file"
              label="Obrázok (URL)"
              value={formValues.image_url}
              onChange={(e) => {
                const file = e.target.files?.[0] ?? null;
                setSelectedImageFile(file);
              }}
              readOnly={!isAdmin}
            />
            {selectedImageFile ? (
              <p className="text-xs text-greyMain/80">
                Vybraný súbor: {selectedImageFile.name}
              </p>
            ) : null}

            {/* Checkbox pre aktivitu */}
            <CheckboxField
              labelActive="Aktívne"
              labelInactive="Neaktívne"
              checked={formValues.isActive}
              onChange={(e) => handleChange("isActive", e.target.checked)}
              disabled={!isAdmin}
            />
            {/* Akcie formulára */}
            <div className="flex flex-col gap-3 border-t border-goldDark/10 pt-5 sm:flex-row sm:items-center sm:justify-end">
              <UndoButton
                onClick={handleUndo}
                disabled={!hasChanges || isPending || !isAdmin}
              >
                Undo
              </UndoButton>
              <SubmitButton
                loading={isPending}
                disabled={!hasChanges || isPending || !isAdmin}
              >
                Uložiť zmeny
              </SubmitButton>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
