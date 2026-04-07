"use client"

import CheckboxField from "@/app/_components/CheckboxField"
import InputField from "@/app/_components/InputField"
import SubmitButton from "@/app/_components/SubmitButton"
import TextareaField from "@/app/_components/TextareaField"
import UndoButton from "@/app/_components/UndoButton"
import { updateAcupuncture } from "@/app/_lib/actions/actions_acupuncture"
import type { AcupunctureMainProps } from "@/app/_lib/data_services/data_acupuncture"
import { useRouter } from "next/navigation"
import { useMemo, useState, useTransition } from "react"
import toast from "react-hot-toast"

type AcupunctureUpdateFormProps = {
  acupunctureData: AcupunctureMainProps["acupunctureData"] | null
  isAdmin?: boolean
}

// Admin formulár pre jednoduchú úpravu Lekárskej akupunktúry.
// Upravuje názov, odseky a is_active prepínač.
export default function AcupunctureUpdateForm({
  acupunctureData,
  isAdmin,
}: AcupunctureUpdateFormProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const initialValues = useMemo(
    () => ({
      name: acupunctureData?.name ?? "",
      paragraphs: Array.isArray(acupunctureData?.content?.paragraphs)
        ? acupunctureData.content.paragraphs.join("\n\n")
        : "",
      isActive: (acupunctureData as { is_active?: boolean } | null)?.is_active ?? false,
    }),
    [acupunctureData],
  )

  const [formValues, setFormValues] = useState(initialValues)
  const [lastSavedValues, setLastSavedValues] = useState(initialValues)

  function handleChange(
    field: keyof typeof formValues,
    value: string | boolean,
  ) {
    setFormValues((prev) => ({ ...prev, [field]: value }))
  }

  function handleUndo() {
    setFormValues(lastSavedValues)
    toast.success("Zmeny boli vrátené")
  }

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      try {
        formData.set("slug", (acupunctureData as { slug?: string } | null)?.slug ?? "acupuncture")
        formData.set(
          "data",
          JSON.stringify({
            name: formValues.name,
            paragraphs: formValues.paragraphs,
            is_active: formValues.isActive,
          }),
        )

        await updateAcupuncture(formData)

        setLastSavedValues(formValues)
        router.refresh()
        toast.success("Sekcia Lekárska akupunktúra bola aktualizovaná")
      } catch (error) {
        console.error(error)
        toast.error("Chyba pri ukladaní Lekárskej akupunktúry")
      }
    })
  }

  const hasChanges =
    JSON.stringify(formValues) !== JSON.stringify(lastSavedValues)

  if (!acupunctureData) {
    return (
      <div className="section-shell mx-auto w-full max-w-3xl p-6 text-center text-redDark">
        Dáta pre stránku Lekárska akupunktúra sa nepodarilo načítať.
      </div>
    )
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
              Lekárska akupunktúra
            </h2>
          </div>
        </div>

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
      </div>
    </section>
  )
}

