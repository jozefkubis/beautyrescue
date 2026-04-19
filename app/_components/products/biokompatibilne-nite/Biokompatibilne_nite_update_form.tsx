"use client";

import CheckboxField from "@/app/_components/CheckboxField";
import FileField from "@/app/_components/FileField";
import InputField from "@/app/_components/InputField";
import SubmitButton from "@/app/_components/SubmitButton";
import TextareaField from "@/app/_components/TextareaField";
import UndoButton from "@/app/_components/UndoButton";
import { updateServiceBySlug } from "@/app/_lib/actions_all/actions_services";
import type { ServiceRow } from "@/app/_lib/data_services_all/data_services";
import { useMemo, useState, useTransition } from "react";
import toast from "react-hot-toast";

type BiokompatibilneNiteUpdateFormProps = {
  biokompatibilneNiteData: ServiceRow | null;
  isAdmin?: boolean;
};

// Komponent slúži na úpravu hlavnej sekcie Biokompatibilné nite v admin rozhraní.
// Admin vie meniť názov, obsah odsekov a viditeľnosť sekcie na webe.
export default function Biokompatibilne_nite_update_form({
  biokompatibilneNiteData,
  isAdmin,
}: BiokompatibilneNiteUpdateFormProps) {
  const [isPending, startTransition] = useTransition();

  // Počiatočný stav formulára naplníme z dát z DB,
  // aby admin videl aktuálne uložené hodnoty hneď po otvorení stránky.
  const initialValues = useMemo(
    () => ({
      title: biokompatibilneNiteData?.title ?? "",
      image_url: biokompatibilneNiteData?.image_url ?? "",
      text: biokompatibilneNiteData?.text ?? "",
      isActive: biokompatibilneNiteData?.is_active ?? false,
    }),
    [biokompatibilneNiteData],
  );

  const [formValues, setFormValues] = useState(initialValues);
  const [lastSavedValues, setLastSavedValues] = useState(initialValues);
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);

  function handleChange(
    field: keyof typeof formValues,
    value: string | boolean,
  ) {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  }

  function handleUndo() {
    setFormValues(lastSavedValues);
    toast.success("Zmeny boli vrátené");
  }

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      try {
        formData.set(
          "slug",
          biokompatibilneNiteData?.slug ?? "biokompatibilne-nite",
        );
        formData.set(
          "data",
          JSON.stringify({
            title: formValues.title,
            text: formValues.text,
            is_active: formValues.isActive,
          }),
        );

        if (selectedImageFile) {
          formData.set("image_file", selectedImageFile);
        }

        await updateServiceBySlug(
          formData,
          biokompatibilneNiteData?.slug ?? "biokompatibilne-nite",
        );
        setLastSavedValues(formValues);
        toast.success("Sekcia Biokompatibilné nite bola aktualizovaná");
      } catch (error) {
        console.error(error);
        toast.error("Chyba pri ukladaní Biokompatibilné nite");
      }
    });
  }

  const hasChanges =
    JSON.stringify(formValues) !== JSON.stringify(lastSavedValues) ||
    selectedImageFile !== null;

  if (!biokompatibilneNiteData) {
    return (
      <div className="section-shell mx-auto w-full max-w-3xl p-6 text-center text-redDark">
        Dáta pre stránku Biokompatibilné nite sa nepodarilo načítať.
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
            <h2 className="mt-4 text-2xl font-semibold italic text-goldDark sm:text-3xl">
              Biokompatibilné nite
            </h2>
          </div>
        </div>

        <form action={handleSubmit} className="space-y-5 px-5 pb-6 md:px-8">
          <div className="grid grid-cols-1 gap-4">
            <InputField
              label="Názov"
              value={formValues.title}
              onChange={(e) => handleChange("title", e.target.value)}
              readOnly={!isAdmin}
            />

            <TextareaField
              label="Obsah"
              value={formValues.text}
              onChange={(e) => handleChange("text", e.target.value)}
              readOnly={!isAdmin}
              rows={12}
            />

            <FileField
              type="file"
              label="Hlavná fotka (image_url)"
              value={formValues.image_url}
              onChange={(e) =>
                setSelectedImageFile(e.target.files?.[0] ?? null)
              }
              readOnly={!isAdmin}
            />
            {selectedImageFile ? (
              <p className="text-xs text-greyMain/80">
                Vybraný súbor: {selectedImageFile.name}
              </p>
            ) : null}

            <CheckboxField
              labelActive="Aktívne"
              labelInactive="Neaktívne"
              checked={formValues.isActive}
              onChange={(e) => handleChange("isActive", e.target.checked)}
              disabled={!isAdmin}
            />

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
