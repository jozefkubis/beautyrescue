"use client";

import CheckboxField from "@/app/_components/CheckboxField";
import FileField from "@/app/_components/FileField";
import InputField from "@/app/_components/InputField";
import SubmitButton from "@/app/_components/SubmitButton";
import TextareaField from "@/app/_components/TextareaField";
import UndoButton from "@/app/_components/UndoButton";
import { updateJaluproMain } from "@/app/_lib/actions/actions_jalupro";
import type { JaluproMainProps } from "@/app/_lib/data_services/data_jalupro";
import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";
import toast from "react-hot-toast";

type JaluproMainPageUpdateFormProps = {
  jaluproData: JaluproMainProps["jaluproData"] | null;
  isAdmin?: boolean;
};

export default function JaluproMainPage_update_form({
  jaluproData,
  isAdmin,
}: JaluproMainPageUpdateFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const initialValues = useMemo(
    () => ({
      name: jaluproData?.name ?? "",
      image_url: jaluproData?.image_url ?? "",
      paragraphs: Array.isArray(jaluproData?.content?.paragraphs)
        ? jaluproData.content.paragraphs.join("\n\n")
        : "",
      aboutTitle:
        (jaluproData?.content?.about as Record<string, string> | undefined)
          ?.title ?? "",
      effectsTitle:
        (jaluproData?.content?.about as Record<string, string> | undefined)
          ?.effectsTitle ?? "",
      treatmentTitle:
        (jaluproData?.content?.about as Record<string, string> | undefined)
          ?.treatmentTitle ?? "",
      aftercareTitle:
        (jaluproData?.content?.about as Record<string, string> | undefined)
          ?.aftercareTitle ?? "",
      variants:
        (jaluproData?.content?.about as Record<string, string> | undefined)
          ?.variants ?? "",
      effects: Array.isArray(jaluproData?.attributes?.effects)
        ? jaluproData.attributes.effects.join("\n")
        : "",
      effectSummary: jaluproData?.attributes?.effectSummary ?? "",
      treatmentParagraphs: Array.isArray(
        jaluproData?.attributes?.treatmentParagraphs,
      )
        ? jaluproData.attributes.treatmentParagraphs.join("\n\n")
        : "",
      aftercareParagraphs: Array.isArray(
        jaluproData?.attributes?.aftercareParagraphs,
      )
        ? jaluproData.attributes.aftercareParagraphs.join("\n\n")
        : "",
      isActive: jaluproData?.is_active ?? false,
    }),
    [jaluproData],
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
          (jaluproData as { slug?: string } | null)?.slug ?? "jalupro",
        );
        formData.set(
          "data",
          JSON.stringify({
            name: formValues.name,
            paragraphs: formValues.paragraphs,
            about: {
              title: formValues.aboutTitle,
              effectsTitle: formValues.effectsTitle,
              treatmentTitle: formValues.treatmentTitle,
              aftercareTitle: formValues.aftercareTitle,
              variants: formValues.variants,
            },
            attributes: {
              effects: formValues.effects,
              effectSummary: formValues.effectSummary,
              treatmentParagraphs: formValues.treatmentParagraphs,
              aftercareParagraphs: formValues.aftercareParagraphs,
            },
            is_active: formValues.isActive,
          }),
        );

        if (selectedImageFile) {
          formData.set("image_file", selectedImageFile);
        }

        await updateJaluproMain(formData);
        setLastSavedValues(formValues);
        router.refresh();
        toast.success("Sekcia Jalupro bola aktualizovaná");
      } catch (error) {
        console.error(error);
        toast.error("Chyba pri ukladaní Jalupro");
      }
    });
  }

  const hasChanges =
    JSON.stringify(formValues) !== JSON.stringify(lastSavedValues) ||
    selectedImageFile !== null;

  if (!jaluproData) {
    return (
      <div className="section-shell mx-auto w-full max-w-3xl p-6 text-center text-redDark">
        Dáta pre stránku Jalupro sa nepodarilo načítať.
      </div>
    );
  }

  return (
    <form action={handleSubmit} className="space-y-5 px-5 pb-6 md:px-8">
      <div className="grid grid-cols-1 gap-4">
        <InputField
          label="Názov"
          value={formValues.name}
          onChange={(e) => handleChange("name", e.target.value)}
          readOnly={!isAdmin}
        />

        <TextareaField
          label="Úvodné odseky"
          value={formValues.paragraphs}
          onChange={(e) => handleChange("paragraphs", e.target.value)}
          readOnly={!isAdmin}
          rows={8}
        />

        <InputField
          label="About titulok"
          value={formValues.aboutTitle}
          onChange={(e) => handleChange("aboutTitle", e.target.value)}
          readOnly={!isAdmin}
        />

        <InputField
          label="Titulok účinkov"
          value={formValues.effectsTitle}
          onChange={(e) => handleChange("effectsTitle", e.target.value)}
          readOnly={!isAdmin}
        />

        <TextareaField
          label="Účinky (riadky)"
          value={formValues.effects}
          onChange={(e) => handleChange("effects", e.target.value)}
          readOnly={!isAdmin}
          rows={6}
        />

        <TextareaField
          label="Krátky efekt"
          value={formValues.effectSummary}
          onChange={(e) => handleChange("effectSummary", e.target.value)}
          readOnly={!isAdmin}
          rows={3}
        />

        <InputField
          label="Titulok priebehu ošetrenia"
          value={formValues.treatmentTitle}
          onChange={(e) => handleChange("treatmentTitle", e.target.value)}
          readOnly={!isAdmin}
        />

        <TextareaField
          label="Priebeh ošetrenia"
          value={formValues.treatmentParagraphs}
          onChange={(e) => handleChange("treatmentParagraphs", e.target.value)}
          readOnly={!isAdmin}
          rows={6}
        />

        <InputField
          label="Titulok starostlivosti po ošetrení"
          value={formValues.aftercareTitle}
          onChange={(e) => handleChange("aftercareTitle", e.target.value)}
          readOnly={!isAdmin}
        />

        <TextareaField
          label="Starostlivosť po ošetrení"
          value={formValues.aftercareParagraphs}
          onChange={(e) => handleChange("aftercareParagraphs", e.target.value)}
          readOnly={!isAdmin}
          rows={6}
        />

        <TextareaField
          label="Varianty Jalupro"
          value={formValues.variants}
          onChange={(e) => handleChange("variants", e.target.value)}
          readOnly={!isAdmin}
          rows={3}
        />

        <FileField
          type="file"
          label="Hlavná fotka (image_url)"
          value={formValues.image_url}
          onChange={(e) => setSelectedImageFile(e.target.files?.[0] ?? null)}
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
  );
}
