"use client";

import CheckboxField from "@/app/_components/CheckboxField";
import InputField from "@/app/_components/InputField";
import SubmitButton from "@/app/_components/SubmitButton";
import TextareaField from "@/app/_components/TextareaField";
import UndoButton from "@/app/_components/UndoButton";

import {
  updateMezoterapia,
  updateMezoterapiaInvasive,
  updateMezoterapiaNonInvasive,
} from "@/app/_lib/actions/actions_mezoterapia";
import { useMemo, useState, useTransition } from "react";
import toast from "react-hot-toast";

export type MezoterapiaData = {
  slug?: string;
  name?: string;
  content?: {
    paragraphs?: string;
  };
  is_active?: boolean;
};

export type MezoterapiaServiceData = {
  slug?: string;
  name?: string;
  content?: {
    paragraphs?: string;
  };
  is_active?: boolean;
};

type MezoterapiaUpdateFormProps = {
  mezoterapiaData: MezoterapiaData;
  mezoterapiaInvasiveData: MezoterapiaServiceData;
  mezoterapiaNonInvasiveData: MezoterapiaServiceData;
  isAdmin?: boolean;
};

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="px-6 pb-7 pt-7 md:px-8">
      <div className="flex flex-col items-center text-center">
        <p className="inline-flex rounded-full bg-[#fff6ee] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-goldDark">
          Nastavenia obsahu
        </p>
        <h2 className="mt-4 text-2xl font-semibold italic text-goldDark sm:text-3xl">
          {title}
        </h2>
      </div>
    </div>
  );
}

function SingleMezoterapiaForm({
  data,
  label,
  isAdmin,
  type,
}: {
  data: MezoterapiaServiceData;
  label: string;
  isAdmin?: boolean;
  type: "main" | "invasive" | "noninvasive";
}) {
  const [isPending, startTransition] = useTransition();
  const initialValues = useMemo(
    () => ({
      name: data?.name ?? "",
      paragraphs: Array.isArray(data?.content?.paragraphs)
        ? data.content?.paragraphs.join("\n\n")
        : (data?.content?.paragraphs ?? ""),
      isActive: data?.is_active ?? false,
    }),
    [data],
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
  async function handleSubmit(formData: FormData) {
    startTransition(async () => {
      try {
        formData.set(
          "data",
          JSON.stringify({
            name: formValues.name,
            paragraphs: formValues.paragraphs,
            is_active: formValues.isActive,
          }),
        );
        if (type === "main") {
          await updateMezoterapia(formData);
        } else if (type === "invasive") {
          await updateMezoterapiaInvasive(formData);
        } else if (type === "noninvasive") {
          await updateMezoterapiaNonInvasive(formData);
        }
        setLastSavedValues(formValues);
        toast.success("Zmeny boli uložené");
      } catch (error) {
        console.error(error);
        toast.error("Chyba pri ukladaní " + label);
      }
    });
  }
  const hasChanges =
    JSON.stringify(formValues) !== JSON.stringify(lastSavedValues);
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
          label="Obsah (odseky, oddelené prázdnym riadkom)"
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

export default function Mezoterapia_update_form({
  mezoterapiaData,
  mezoterapiaInvasiveData,
  mezoterapiaNonInvasiveData,
  isAdmin,
}: MezoterapiaUpdateFormProps) {
  return (
    <section className="w-full items-center justify-center px-6 pt-10 2xl:px-44 lg:px-20 lg:pt-20">
      <div className="section-shell fade-up grid grid-cols-1 gap-8 p-5 lg:gap-8 lg:p-8 lg:px-44">
        <SectionHeader title="Mezoterapia (hlavná sekcia)" />
        <SingleMezoterapiaForm
          data={mezoterapiaData}
          label="Mezoterapia"
          isAdmin={isAdmin}
          type="main"
        />
        <SectionHeader title="Invazívna mezoterapia" />
        <SingleMezoterapiaForm
          data={mezoterapiaInvasiveData}
          label="Invazívna mezoterapia"
          isAdmin={isAdmin}
          type="invasive"
        />
        <SectionHeader title="Neinvazívna mezoterapia" />
        <SingleMezoterapiaForm
          data={mezoterapiaNonInvasiveData}
          label="Neinvazívna mezoterapia"
          isAdmin={isAdmin}
          type="noninvasive"
        />
      </div>
    </section>
  );
}
