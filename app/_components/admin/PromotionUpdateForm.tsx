"use client";

import CheckboxField from "@/app/_components/CheckboxField";
import InputField from "@/app/_components/InputField";
import SubmitButton from "@/app/_components/SubmitButton";
import TextareaField from "@/app/_components/TextareaField";
import UndoButton from "@/app/_components/UndoButton";
import { updateServiceBySlug } from "@/app/_lib/actions_all/actions_services";
import type { ServiceRow } from "@/app/_lib/data_services_all/data_services";
import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";
import toast from "react-hot-toast";

// Admin formulár pre úpravu noviniek/akcie (názov, podnadpis, text, aktívnosť)
// Štruktúra a logika zjednotená podľa ostatných UpdateForm komponentov (bez obrázka)
type PromotionUpdateFormProps = {
  promotion: ServiceRow | null | undefined;
  isAdmin?: boolean;
};

export default function PromotionUpdateForm({
  promotion,
  isAdmin,
}: PromotionUpdateFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();


  // Počiatočné hodnoty formulára – naplnené z DB dát
  const initialValues = useMemo(
    () => ({
      title: promotion?.title ?? "",
      about_title: promotion?.about_title ?? "",
      text: promotion?.text ?? "",
      is_active: promotion?.is_active ?? false,
    }),
    [promotion],
  );

  // formValues = to, čo admin práve píše do formulára (live stav)
  const [formValues, setFormValues] = useState(initialValues);
  // lastSavedValues = posledný stav, ktorý bol úspešne uložený do DB
  const [lastSavedValues, setLastSavedValues] = useState(initialValues);

  // Generická funkcia na aktualizáciu ľubovoľného poľa vo formulári
  function handleChange(
    field: keyof typeof formValues,
    value: string | boolean,
  ) {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  }

  // Vráti formulár do stavu posledného úspešného uloženia
  function handleUndo() {
    setFormValues(lastSavedValues);
    toast.success("Zmeny boli vrátené");
  }

  // Spustí sa po kliknutí na uloženie a pošle textové dáta
  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      try {
        formData.set(
          "slug",
          (promotion as { slug?: string } | null)?.slug ?? "novinky",
        );
        formData.set(
          "data",
          JSON.stringify({
            title: formValues.title,
            about_title: formValues.about_title,
            text: formValues.text,
            is_active: formValues.is_active,
          }),
        );

        const result = await updateServiceBySlug(
          formData,
          promotion?.slug ?? "novinky",
        );

        if (!result.success) {
          toast.error(result.message);
          return;
        }

        setLastSavedValues(formValues);
        router.refresh();
        toast.success(result.message);
      } catch (error) {
        console.error(error);
        toast.error("Chyba pri ukladaní noviniek");
      }
    });
  }

  // Detekcia zmien vo formulári
  const hasChanges =
    JSON.stringify(formValues) !== JSON.stringify(lastSavedValues);

  if (!promotion) {
    return (
      <div className="section-shell mx-auto w-full max-w-3xl p-6 text-center text-redDark">
        Dáta pre Novinky sa nepodarilo načítať.
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
              Novinky
            </h2>
          </div>
        </div>

        <form action={handleSubmit} className="space-y-5 px-5 pb-6 md:px-8">
          <InputField
            label="Úvodný podnadpis"
            value={formValues.about_title}
            onChange={(e) => handleChange("about_title", e.target.value)}
            readOnly={!isAdmin}
          />

          <InputField
            label="Nadpis"
            value={formValues.title}
            onChange={(e) => handleChange("title", e.target.value)}
            readOnly={!isAdmin}
          />

          <TextareaField
            label="Text"
            value={formValues.text}
            onChange={(e) => handleChange("text", e.target.value)}
            readOnly={!isAdmin}
            rows={18}
          />

          <CheckboxField
            labelActive="Aktívne"
            labelInactive="Neaktívne"
            checked={Boolean(formValues.is_active)}
            onChange={(e) => handleChange("is_active", e.target.checked)}
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
