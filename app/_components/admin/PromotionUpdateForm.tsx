"use client";

import CheckboxField from "@/app/_components/CheckboxField";
import InputField from "@/app/_components/InputField";
import SubmitButton from "@/app/_components/SubmitButton";
import TextareaField from "@/app/_components/TextareaField";
import UndoButton from "@/app/_components/UndoButton";
import type { PromotionMainProps } from "@/app/_lib/data_services/data_promotion";
import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";
import toast from "react-hot-toast";
import { updatePromotion } from "../../_lib/actions/actions_promotion";

type PromotionUpdateFormProps = {
  promotionData: PromotionMainProps["promotionData"] | null;
  isAdmin?: boolean;
};

type PromotionFormValues = {
  name: string;
  summary: string;
  paragraphs: string;
  isActive: boolean;
};

// Admin formulár pre úpravu noviniek/akcie (názov, perex a odseky obsahu).
export default function PromotionUpdateForm({
  promotionData,
  isAdmin,
}: PromotionUpdateFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const initialValues = useMemo<PromotionFormValues>(
    () => ({
      name: promotionData?.name ?? "",
      summary: promotionData?.summary ?? "",
      paragraphs: Array.isArray(promotionData?.content?.paragraphs)
        ? promotionData.content.paragraphs.join("\n\n")
        : "",
      isActive: promotionData?.is_active ?? false,
    }),
    [promotionData],
  );

  const [formValues, setFormValues] = useState(initialValues);
  const [lastSavedValues, setLastSavedValues] = useState(initialValues);

  function handleChange<K extends keyof PromotionFormValues>(
    field: K,
    value: PromotionFormValues[K],
  ) {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  }

  function handleUndo() {
    setFormValues(lastSavedValues);
    toast.success("Zmeny boli vrátené");
  }

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      formData.set(
        "slug",
        (promotionData as { slug?: string } | null)?.slug ?? "novinky",
      );
      formData.set("data", JSON.stringify(formValues));

      const result = await updatePromotion(formData);

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      setLastSavedValues(formValues);
      router.refresh();
      toast.success(result.message);
    });
  }

  const hasChanges =
    JSON.stringify(formValues) !== JSON.stringify(lastSavedValues);

  if (!promotionData) {
    return (
      <div className="section-shell mx-auto w-full max-w-3xl p-6 text-center text-redDark">
        Dáta pre Novinky sa nepodarilo načítať.
      </div>
    );
  }

  return (
    <section className="w-full items-center justify-center px-6 pt-10 lg:px-20 lg:pt-20 2xl:px-44">
      <div className="section-shell fade-up grid grid-cols-1 gap-2 p-5 lg:gap-4 lg:p-8 lg:px-44">
        <div className="px-6 pb-7 pt-7 md:px-8">
          <div className="flex flex-col items-center text-center">
            <p className="inline-flex rounded-full bg-[#fff6ee] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-goldDark">
              Nastavenia obsahu
            </p>
            <h1 className="mt-4 text-3xl font-semibold italic text-goldDark sm:text-4xl">
              Novinky
            </h1>
          </div>
        </div>

        <form action={handleSubmit} className="space-y-5 px-5 pb-6 md:px-8">
          <TextareaField
            label="Summary"
            value={formValues.summary}
            onChange={(e) => handleChange("summary", e.target.value)}
            readOnly={!isAdmin}
            rows={4}
          />

          <InputField
            label="Názov"
            value={formValues.name}
            onChange={(e) => handleChange("name", e.target.value)}
            readOnly={!isAdmin}
          />

          <TextareaField
            label="Odseky obsahu"
            value={formValues.paragraphs}
            onChange={(e) => handleChange("paragraphs", e.target.value)}
            readOnly={!isAdmin}
            rows={10}
          />

          <CheckboxField
            labelActive="Aktívne"
            labelInactive="Neaktívne"
            checked={Boolean(formValues.isActive)}
            onChange={(e) => handleChange("isActive", e.target.checked)}
            disabled={!isAdmin}
          />

          <p className="text-xs text-greyMain/80">
            Odseky oddeľuj prázdnym riadkom alebo novým riadkom.
          </p>

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
        </form>
      </div>
    </section>
  );
}
