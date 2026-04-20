"use client";

import CheckboxField from "@/app/_components/CheckboxField";
import FileField from "@/app/_components/FileField";
import InputField from "@/app/_components/InputField";
import SubmitButton from "@/app/_components/SubmitButton";
import TextareaField from "@/app/_components/TextareaField";
import UndoButton from "@/app/_components/UndoButton";
import { updateServiceBySlug } from "@/app/_lib/actions_all/actions_services";
import type { ServiceRow } from "@/app/_lib/data_services_all/data_services";
import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";
import toast from "react-hot-toast";

type JaluproHMWUpdateFormProps = {
  jaluproHMWData: ServiceRow | null;
  isAdmin?: boolean;
};

export default function JaluproHMW_update_form({
  jaluproHMWData,
  isAdmin,
}: JaluproHMWUpdateFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const initialValues = useMemo(
    () => ({
      title: jaluproHMWData?.title ?? "",
      image_url: jaluproHMWData?.image_url ?? "",
      text: jaluproHMWData?.text ?? "",
      isActive: jaluproHMWData?.is_active ?? false,
    }),
    [jaluproHMWData],
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
          (jaluproHMWData as { slug?: string } | null)?.slug ?? "jalupro-hmw",
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
          jaluproHMWData?.slug ?? "jalupro-hmw",
        );
        setLastSavedValues(formValues);
        router.refresh();
        toast.success("Sekcia Jalupro HMW bola aktualizovaná");
      } catch (error) {
        console.error(error);
        toast.error("Chyba pri ukladaní Jalupro HMW");
      }
    });
  }

  const hasChanges =
    JSON.stringify(formValues) !== JSON.stringify(lastSavedValues) ||
    selectedImageFile !== null;

  if (!jaluproHMWData) {
    return (
      <div className="section-shell mx-auto w-full max-w-3xl p-6 text-center text-redDark">
        Dáta pre stránku Jalupro HMW sa nepodarilo načítať.
      </div>
    );
  }

  return (
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
          rows={10}
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
