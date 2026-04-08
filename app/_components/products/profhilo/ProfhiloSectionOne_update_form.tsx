"use client";

import FileField from "@/app/_components/FileField";
import InputField from "@/app/_components/InputField";
import SubmitButton from "@/app/_components/SubmitButton";
import TextareaField from "@/app/_components/TextareaField";
import UndoButton from "@/app/_components/UndoButton";
import { updateProfhiloAboutSectionOne } from "@/app/_lib/actions/actions_profhilo";
import type { ProfhiloMainProps } from "@/app/_lib/data_services/data_profhilo";
import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";
import toast from "react-hot-toast";

type ProfhiloSectionOneUpdateFormProps = {
  profhiloData: ProfhiloMainProps["profhiloData"] | null;
  isAdmin?: boolean;
};

// Formulár upravuje prvý blok v Profhilo about sekcii (accordion karta 1).
// Je oddelený, aby bol kód jednoduchý a editácia jednej karty prehľadná.
export default function ProfhiloSectionOne_update_form({
  profhiloData,
  isAdmin,
}: ProfhiloSectionOneUpdateFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const sectionOne = ((
    profhiloData?.content?.about as {
      sections?: Array<Record<string, unknown>>;
    }
  )?.sections?.[0] ?? {}) as Record<string, unknown>;

  const initialValues = useMemo(
    () => ({
      product: (sectionOne.product as string) ?? "",
      image_url: (sectionOne.image_url as string) ?? "",
      whatTitle: (sectionOne.whatTitle as string) ?? "",
      whatItems: Array.isArray(sectionOne.whatItems)
        ? (sectionOne.whatItems as string[]).join("\n")
        : "",
      howTitle: (sectionOne.howTitle as string) ?? "",
      howItems: Array.isArray(sectionOne.howItems)
        ? (sectionOne.howItems as string[]).join("\n")
        : "",
      benefitsTitle: (sectionOne.benefitsTitle as string) ?? "",
      benefitsItems: Array.isArray(sectionOne.benefitsItems)
        ? (sectionOne.benefitsItems as string[]).join("\n")
        : "",
      suitableTitle: (sectionOne.suitableTitle as string) ?? "",
      suitableItems: Array.isArray(sectionOne.suitableItems)
        ? (sectionOne.suitableItems as string[]).join("\n")
        : "",
    }),
    [sectionOne],
  );

  const [formValues, setFormValues] = useState(initialValues);
  const [lastSavedValues, setLastSavedValues] = useState(initialValues);
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);

  function handleChange(field: keyof typeof formValues, value: string) {
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
          (profhiloData as { slug?: string } | null)?.slug ?? "profhilo",
        );
        formData.set("data", JSON.stringify(formValues));

        if (selectedImageFile) {
          formData.set("image_file", selectedImageFile);
        }

        await updateProfhiloAboutSectionOne(formData);
        setLastSavedValues(formValues);
        router.refresh();
        toast.success("Sekcia Profhilo 1 bola aktualizovaná");
      } catch (error) {
        console.error(error);
        toast.error("Chyba pri ukladaní Profhilo sekcie 1");
      }
    });
  }

  const hasChanges =
    JSON.stringify(formValues) !== JSON.stringify(lastSavedValues) ||
    selectedImageFile !== null;

  if (!profhiloData) {
    return (
      <div className="section-shell mx-auto w-full max-w-3xl p-6 text-center text-redDark">
        Dáta pre Profhilo sa nepodarilo načítať.
      </div>
    );
  }

  return (
    <form action={handleSubmit} className="space-y-5 px-5 pb-6 md:px-8">
      <div className="grid grid-cols-1 gap-4">
        <InputField
          label="Produkt"
          value={formValues.product}
          onChange={(e) => handleChange("product", e.target.value)}
          readOnly={!isAdmin}
        />
        <InputField
          label="What titulok"
          value={formValues.whatTitle}
          onChange={(e) => handleChange("whatTitle", e.target.value)}
          readOnly={!isAdmin}
        />
        <FileField
          type="file"
          label="Fotka sekcie (image_url)"
          value={formValues.image_url}
          onChange={(e) => setSelectedImageFile(e.target.files?.[0] ?? null)}
          readOnly={!isAdmin}
        />
        {selectedImageFile ? (
          <p className="text-xs text-greyMain/80">
            Vybraný súbor: {selectedImageFile.name}
          </p>
        ) : null}
        <TextareaField
          label="What body (riadky)"
          value={formValues.whatItems}
          onChange={(e) => handleChange("whatItems", e.target.value)}
          readOnly={!isAdmin}
          rows={5}
        />
        <InputField
          label="How titulok"
          value={formValues.howTitle}
          onChange={(e) => handleChange("howTitle", e.target.value)}
          readOnly={!isAdmin}
        />
        <TextareaField
          label="How body (riadky)"
          value={formValues.howItems}
          onChange={(e) => handleChange("howItems", e.target.value)}
          readOnly={!isAdmin}
          rows={5}
        />
        <InputField
          label="Benefits titulok"
          value={formValues.benefitsTitle}
          onChange={(e) => handleChange("benefitsTitle", e.target.value)}
          readOnly={!isAdmin}
        />
        <TextareaField
          label="Benefits body (riadky)"
          value={formValues.benefitsItems}
          onChange={(e) => handleChange("benefitsItems", e.target.value)}
          readOnly={!isAdmin}
          rows={5}
        />
        <InputField
          label="Suitable titulok"
          value={formValues.suitableTitle}
          onChange={(e) => handleChange("suitableTitle", e.target.value)}
          readOnly={!isAdmin}
        />
        <TextareaField
          label="Suitable body (riadky)"
          value={formValues.suitableItems}
          onChange={(e) => handleChange("suitableItems", e.target.value)}
          readOnly={!isAdmin}
          rows={5}
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
