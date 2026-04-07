"use client";

import CheckboxField from "@/app/_components/CheckboxField";
import InputField from "@/app/_components/InputField";
import SubmitButton from "@/app/_components/SubmitButton";
import TextareaField from "@/app/_components/TextareaField";
import UndoButton from "@/app/_components/UndoButton";
import { updateJaluproClassic } from "@/app/_lib/actions/actions_jalupro";
import type { JaluproClassicProps } from "@/app/_lib/data_services/data_jalupro";
import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";
import toast from "react-hot-toast";

type JaluproClassicUpdateFormProps = {
  jaluproClassicData: JaluproClassicProps["jaluproClassicData"] | null;
  isAdmin?: boolean;
};

export default function JaluproClassic_update_form({
  jaluproClassicData,
  isAdmin,
}: JaluproClassicUpdateFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const initialValues = useMemo(
    () => ({
      name: jaluproClassicData?.name ?? "",
      paragraphs: Array.isArray(jaluproClassicData?.content.paragraphs)
        ? jaluproClassicData.content.paragraphs.join("\n\n")
        : "",
      isActive: jaluproClassicData?.is_active ?? false,
    }),
    [jaluproClassicData],
  );

  const [formValues, setFormValues] = useState(initialValues);
  const [lastSavedValues, setLastSavedValues] = useState(initialValues);

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
          (jaluproClassicData as { slug?: string } | null)?.slug ??
            "jalupro-classic",
        );
        formData.set(
          "data",
          JSON.stringify({
            name: formValues.name,
            paragraphs: formValues.paragraphs,
            is_active: formValues.isActive,
          }),
        );

        await updateJaluproClassic(formData);
        setLastSavedValues(formValues);
        router.refresh();
        toast.success("Sekcia Jalupro Classic bola aktualizovaná");
      } catch (error) {
        console.error(error);
        toast.error("Chyba pri ukladaní Jalupro Classic");
      }
    });
  }

  const hasChanges =
    JSON.stringify(formValues) !== JSON.stringify(lastSavedValues);

  if (!jaluproClassicData) {
    return (
      <div className="section-shell mx-auto w-full max-w-3xl p-6 text-center text-redDark">
        Dáta pre stránku Jalupro Classic sa nepodarilo načítať.
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
          label="Obsah"
          value={formValues.paragraphs}
          onChange={(e) => handleChange("paragraphs", e.target.value)}
          readOnly={!isAdmin}
          rows={10}
        />
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
