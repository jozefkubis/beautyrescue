"use client";

import { updateDiamondMicrodermabrasion } from "@/app/_lib/actions/actions_diamond_microderma";
import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";
import toast from "react-hot-toast";
// Import zdieľaných komponentov pre formulár
import CheckboxField from "@/app/_components/CheckboxField";
import InputField from "@/app/_components/InputField";
import SubmitButton from "@/app/_components/SubmitButton";
import TextareaField from "@/app/_components/TextareaField";
import UndoButton from "@/app/_components/UndoButton";
import FileField from "../../FileField";

type diamondMicrodermabrasionData = {
  slug?: string;
  name?: string;
  image_url?: string;
  content?: {
    intro?: string;
    paragraphs?: string[];
  };
  attributes?: {
    benefits?: string[];
  };
  is_active?: boolean;
};

type DiamondMicrodermabrasionUpdateFormProps = {
  diamondMicrodermabrasionMainData: diamondMicrodermabrasionData;
  isAdmin?: boolean;
};

export default function Diamond_microderma_update_form({
  diamondMicrodermabrasionMainData,
  isAdmin,
}: DiamondMicrodermabrasionUpdateFormProps) {
  const router = useRouter();

  // isPending = true kým beží ukladanie na server; startTransition spustí async akciu.
  const [isPending, startTransition] = useTransition();

  // Počiatočné hodnoty formulára – naplnené z DB dát.
  // useMemo zabezpečí, že sa tieto hodnoty prepočítajú iba ak sa zmení aboutUsData.
  const initialValues = useMemo(
    () => ({
      name: diamondMicrodermabrasionMainData?.name ?? "",
      image_url: diamondMicrodermabrasionMainData?.image_url ?? "",
      contentIntro: diamondMicrodermabrasionMainData?.content?.intro ?? "",
      contentParagraphs: Array.isArray(
        diamondMicrodermabrasionMainData?.content?.paragraphs,
      )
        ? diamondMicrodermabrasionMainData.content.paragraphs.join("\n\n")
        : "",
      attributesBenefits: Array.isArray(
        diamondMicrodermabrasionMainData?.attributes?.benefits,
      )
        ? diamondMicrodermabrasionMainData.attributes.benefits.join("\n")
        : "",
      isActive: diamondMicrodermabrasionMainData?.is_active ?? false,
    }),
    [diamondMicrodermabrasionMainData],
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

  // Spustí sa po kliknutí na "Uložiť Diamantová mikrodermabrázia".
  // Zabalí dáta do FormData, odošle na server a po úspechu obnoví stránku.
  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      try {
        // Pridáme slug, aby server vedel, ktorý záznam v DB má aktualizovať.
        formData.set(
          "slug",
          diamondMicrodermabrasionMainData?.slug ?? "diamond-microdermabrasion",
        );
        // Celý stav formulára serializujeme do JSON v tvare, ktorý očakáva server action.
        formData.set(
          "data",
          JSON.stringify({
            name: formValues.name,
            content: {
              intro: formValues.contentIntro,
              paragraphs: formValues.contentParagraphs
                .split("\n\n")
                .map((paragraph) => paragraph.trim())
                .filter(Boolean),
            },
            attributes: {
              benefits: formValues.attributesBenefits
                .split("\n")
                .map((benefit) => benefit.trim())
                .filter(Boolean),
            },
            is_active: formValues.isActive,
          }),
        );

        if (selectedImageFile) {
          formData.set("image_file", selectedImageFile);
        }

        await updateDiamondMicrodermabrasion(formData);

        // Po úspešnom uložení aktualizujeme "zálohu" pre Undo.
        setLastSavedValues(formValues);
        // Obnoví Next.js cache a re-fetchne dáta na stránke.
        router.refresh();
        toast.success("Sekcia Diamantová mikrodermabrázia bola aktualizovaná");
      } catch (error) {
        console.error(error);
        toast.error("Chyba pri ukladaní Diamantová mikrodermabrázia");
      }
    });
  }

  // true ak sa aktuálne hodnoty líšia od posledného uloženia → aktivuje tlačidlá.
  const hasChanges =
    JSON.stringify(formValues) !== JSON.stringify(lastSavedValues) ||
    selectedImageFile !== null;

  // Ak sa dáta z DB nepodarilo načítať, zobrazíme chybovú správu namiesto formulára.
  if (!diamondMicrodermabrasionMainData) {
    return (
      <div className="section-shell mx-auto w-full max-w-3xl p-6 text-center text-redDark">
        Dáta pre stránku Diamantová mikrodermabrázia sa nepodarilo načítať.
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
              Diamantová mikrodermabrázia
            </h1>
          </div>
        </div>

        <form action={handleSubmit} className="space-y-5 px-5 pb-6 md:px-8">
          <div className="grid grid-cols-1 gap-4">
            {/* Pole pre názov */}
            <InputField
              label="Názov"
              value={formValues.name}
              onChange={(e) => handleChange("name", e.target.value)}
              readOnly={!isAdmin}
            />

            {/* Pole pre úvodný obsah */}
            <TextareaField
              label="Obsah - Úvod"
              value={formValues.contentIntro}
              onChange={(e) => handleChange("contentIntro", e.target.value)}
              readOnly={!isAdmin}
              rows={6}
            />

            {/* Pole pre hlavný obsah */}
            <TextareaField
              label="Obsah"
              value={formValues.contentParagraphs}
              onChange={(e) =>
                handleChange("contentParagraphs", e.target.value)
              }
              readOnly={!isAdmin}
              rows={12}
            />

            {/* Pole pre benefity */}
            <TextareaField
              label="Benefity"
              value={formValues.attributesBenefits}
              onChange={(e) =>
                handleChange("attributesBenefits", e.target.value)
              }
              readOnly={!isAdmin}
              rows={6}
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

            {/* Checkbox pre aktívny stav */}
            <CheckboxField
              labelActive="Aktívne"
              labelInactive="Neaktívne"
              checked={formValues.isActive}
              onChange={(e) => handleChange("isActive", e.target.checked)}
              disabled={!isAdmin}
            />

            {/* Tlačidlá pre Undo a Submit */}
            <div className="flex flex-col gap-3 border-t border-goldDark/10 pt-5 sm:flex-row sm:items-center sm:justify-end">
              <UndoButton
                onClick={handleUndo}
                disabled={!hasChanges || isPending || !isAdmin}
              >
                Undo
              </UndoButton>
              <SubmitButton
                disabled={!hasChanges || isPending || !isAdmin}
                loading={isPending}
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
