"use client";

import CheckboxField from "@/app/_components/CheckboxField";
import InputField from "@/app/_components/InputField";
import SectionNavigation from "@/app/_components/SectionNavigation";
import SubmitButton from "@/app/_components/SubmitButton";
import TextareaField from "@/app/_components/TextareaField";
import UndoButton from "@/app/_components/UndoButton";
import {
  updateKyselinaHyaluronova,
  updateKyselinaHyaluronovaFace,
  updateKyselinaHyaluronovaLips,
} from "@/app/_lib/actions/actions_kyselina_hyaluronova";
import { useMemo, useState, useTransition } from "react";
import toast from "react-hot-toast";

type KyselinaHyaluronovaServiceData = {
  slug?: string;
  name?: string;
  content?: {
    paragraphs?: string | string[];
  };
  is_active?: boolean;
};

type KyselinaHyaluronovaUpdateFormProps = {
  kyselinaHyaluronovaData: KyselinaHyaluronovaServiceData | null;
  kyselinaHyaluronovaLipsData: KyselinaHyaluronovaServiceData | null;
  kyselinaHyaluronovaFaceData: KyselinaHyaluronovaServiceData | null;
  isAdmin?: boolean;
};

// Zobrazí jednotnú hlavičku pre každú sekciu formulára.
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

// Jeden formulár pre jednu sekciu (hlavná, lips, face),
// aby bol kód menší a konzistentný pri všetkých troch variantoch.
function SingleKyselinaForm({
  data,
  sectionLabel,
  slugFallback,
  isAdmin,
  onSubmitAction,
}: {
  data: KyselinaHyaluronovaServiceData | null;
  sectionLabel: string;
  slugFallback: string;
  isAdmin?: boolean;
  onSubmitAction: (formData: FormData) => Promise<{
    success: boolean;
    message: string;
  }>;
}) {
  const [isPending, startTransition] = useTransition();

  const initialValues = useMemo(
    () => ({
      name: data?.name ?? "",
      content: Array.isArray(data?.content?.paragraphs)
        ? data.content.paragraphs.join("\n\n")
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

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      try {
        formData.set("slug", data?.slug ?? slugFallback);
        formData.set(
          "data",
          JSON.stringify({
            name: formValues.name,
            paragraphs: formValues.content,
            is_active: formValues.isActive,
          }),
        );

        await onSubmitAction(formData);
        setLastSavedValues(formValues);
        toast.success(`Sekcia ${sectionLabel} bola aktualizovaná`);
      } catch (error) {
        console.error(error);
        toast.error(`Chyba pri ukladaní sekcie ${sectionLabel}`);
      }
    });
  }

  const hasChanges =
    JSON.stringify(formValues) !== JSON.stringify(lastSavedValues);

  if (!data) {
    return (
      <div className="section-shell mx-auto w-full max-w-3xl p-6 text-center text-redDark">
        Dáta pre sekciu {sectionLabel} sa nepodarilo načítať.
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
          value={formValues.content}
          onChange={(e) => handleChange("content", e.target.value)}
          readOnly={!isAdmin}
          rows={12}
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

// Hlavný admin formulár pre všetky sekcie kyseliny hyalurónovej.
export default function Kyselina_hyaluronova_update_form({
  kyselinaHyaluronovaData,
  kyselinaHyaluronovaLipsData,
  kyselinaHyaluronovaFaceData,
  isAdmin,
}: KyselinaHyaluronovaUpdateFormProps) {
  const [index, setIndex] = useState(1);

  const sections = [1, 2, 3];
  const numberOfSections = sections.length;

  return (
    <section className="w-full items-center justify-center px-6 pt-10 2xl:px-44 lg:px-20 lg:pt-20">
      <div className="section-shell fade-up grid grid-cols-1 gap-8 p-5 lg:gap-8 lg:p-8 lg:px-44">
        <SectionNavigation
          sections={sections}
          index={index}
          setIndex={setIndex}
          numberOfSections={numberOfSections}
        />

        {index === 1 && (
          <>
            <SectionHeader title="Kyselina hyalurónová (hlavná sekcia)" />
            <SingleKyselinaForm
              data={kyselinaHyaluronovaData}
              sectionLabel="Kyselina hyalurónová"
              slugFallback="kyselina-hyaluronova"
              isAdmin={isAdmin}
              onSubmitAction={updateKyselinaHyaluronova}
            />
          </>
        )}

        {index === 2 && (
          <>
            <SectionHeader title="Kyselina hyalurónová (lips)" />
            <SingleKyselinaForm
              data={kyselinaHyaluronovaLipsData}
              sectionLabel="Kyselina hyalurónová lips"
              slugFallback="kyselina-hyaluronova-lips"
              isAdmin={isAdmin}
              onSubmitAction={updateKyselinaHyaluronovaLips}
            />
          </>
        )}

        {index === 3 && (
          <>
            <SectionHeader title="Kyselina hyalurónová (face)" />
            <SingleKyselinaForm
              data={kyselinaHyaluronovaFaceData}
              sectionLabel="Kyselina hyalurónová face"
              slugFallback="kyselina-hyaluronova-face"
              isAdmin={isAdmin}
              onSubmitAction={updateKyselinaHyaluronovaFace}
            />
          </>
        )}
      </div>
    </section>
  );
}
