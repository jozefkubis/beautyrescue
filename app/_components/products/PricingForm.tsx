"use client"

import { updatePricing } from "@/app/_lib/actions_all/actions_pricing"
import { useRouter } from "next/navigation"
import { useEffect, useState, useTransition } from "react"
import toast from "react-hot-toast"

type Treatment = {
  id: number | string
  treatment: string
  price: string
  sale: string
}

type PricingFormProps = {
  title: string
  treatments: Treatment[]
  user?: string | null
  isAdmin?: boolean
}

export default function PricingForm({
  // title,
  treatments,
  isAdmin,
}: PricingFormProps) {
  const router = useRouter()
  const [formTreatments, setFormTreatments] = useState(treatments)
  const [lastSavedTreatments, setLastSavedTreatments] = useState(treatments)
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    setFormTreatments(treatments)
    setLastSavedTreatments(treatments)
  }, [treatments])

  function handleChange(
    id: number | string,
    field: "treatment" | "price" | "sale",
    value: string,
  ) {
    setFormTreatments((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    )
  }

  function copyRowToClipboard(item: Treatment) {
    const text = `${item.treatment}
Cena: ${item.price}
Akcia: ${item.sale || "-"}`

    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success("Skopírované ✨")
      })
      .catch(() => {
        toast.error("Nepodarilo sa kopírovať")
      })
  }

  function copyAllToClipboard() {
    const text = formTreatments
      .map(
        (item) =>
          `${item.treatment}\nCena: ${item.price}\nAkcia: ${item.sale || "-"}`,
      )
      .join("\n\n")

    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success("Celý cenník bol skopírovaný ✨")
      })
      .catch(() => {
        toast.error("Nepodarilo sa kopírovať celý cenník")
      })
  }

  function handleUndo() {
    setFormTreatments(lastSavedTreatments)
    toast.success("Zmeny boli vrátené ↩️")
  }

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      try {
        formData.set("data", JSON.stringify(formTreatments))
        await updatePricing(formData)

        setLastSavedTreatments(formTreatments)
        router.refresh()
        toast.success("Cenník bol aktualizovaný ✨")
      } catch (error) {
        console.error(error)
        toast.error("Chyba pri ukladaní ❌")
      }
    })
  }

  const hasChanges =
    JSON.stringify(formTreatments) !== JSON.stringify(lastSavedTreatments)

  return (
    <section className="w-full px-4">
      <div className="mx-auto w-full max-w-5xl">
        <div className="overflow-hidden rounded-[28px] border-2 border-goldDark/15 bg-[#fffdf9] shadow-[0_14px_36px_rgba(91,64,38,0.08)]">
          <div className="px-6 pb-5 pt-7 md:px-8">
            <div className="flex flex-col items-center text-center">
              <p className="inline-flex rounded-full bg-[#fff6ee] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-goldDark">
                Cenník procedúr
              </p>
            </div>
          </div>

          <form action={handleSubmit} className="px-4 pb-4 md:px-6">
            <div className="mb-4 hidden grid-cols-[1.8fr_0.6fr_0.5fr_0.12fr] gap-4 px-4 md:grid">
              <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-500/70">
                Ošetrenie
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-500/70">
                Cena
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-500/70">
                Akcia
              </span>
              {isAdmin && (
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-500/70">
                  Copy
                </span>
              )}
            </div>

            <div className="space-y-1">
              {formTreatments.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-transparent px-2 py-3 transition duration-300 hover:scale-[1.02] hover:border-goldDark/12 hover:bg-[#fffaf2] hover:shadow-[0_8px_24px_rgba(91,64,38,0.12)]"
                >
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-[1.8fr_0.6fr_0.5fr_0.12fr] md:items-end md:gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor={`treatment-${item.id}`}
                        className="pl-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-500/65 md:hidden"
                      >
                        Ošetrenie
                      </label>
                      <input
                        type="text"
                        id={`treatment-${item.id}`}
                        value={item.treatment}
                        onChange={(e) =>
                          handleChange(item.id, "treatment", e.target.value)
                        }
                        readOnly={!isAdmin}
                        aria-label="Ošetrenie"
                        className="h-12 w-full rounded-xl border border-goldDark/15 bg-white px-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-goldDark/30 2xl:h-14 2xl:text-base"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor={`price-${item.id}`}
                        className="pl-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-500/65 md:hidden"
                      >
                        Cena
                      </label>
                      <input
                        type="text"
                        id={`price-${item.id}`}
                        value={item.price}
                        onChange={(e) =>
                          handleChange(item.id, "price", e.target.value)
                        }
                        readOnly={!isAdmin}
                        aria-label="Cena"
                        className={`h-12 w-full rounded-xl border border-goldDark/20 bg-[#fff9ef] px-4 text-sm font-semibold text-goldDark outline-none transition placeholder:text-goldDark/50 focus:border-goldDark/35 2xl:h-14 2xl:text-base ${
                          item.sale ? "line-through decoration-1" : ""
                        }`}
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor={`sale-${item.id}`}
                        className="pl-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-500/65 md:hidden"
                      >
                        Akcia
                      </label>
                      <input
                        type="text"
                        id={`sale-${item.id}`}
                        value={item.sale}
                        onChange={(e) =>
                          handleChange(item.id, "sale", e.target.value)
                        }
                        readOnly={!isAdmin}
                        aria-label="Akcia"
                        placeholder="-"
                        className="h-12 w-full rounded-xl border border-goldDark/15 bg-[#fff8f3] px-4 text-sm font-semibold text-redDark outline-none transition placeholder:text-redDark/35 focus:border-goldDark/30 2xl:h-14 2xl:text-base"
                      />
                    </div>

                    {isAdmin && (
                      <button
                        type="button"
                        onClick={() => copyRowToClipboard(item)}
                        className="inline-flex h-12 items-center justify-center rounded-xl border border-goldDark/15 bg-white px-3 text-sm text-goldDark transition hover:cursor-pointer hover:border-goldDark/25 hover:bg-[#fffaf2] 2xl:h-14"
                        title="Kopírovať riadok"
                        aria-label={`Kopírovať riadok ${item.treatment}`}
                      >
                        📋
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {isAdmin && (
              <div className="mt-6 flex flex-col gap-4 border-t border-goldDark/10 px-2 pt-5 md:flex-row md:items-center md:justify-between">
                <p className="text-sm text-gray-500">
                  Počet položiek v cenníku:{" "}
                  <span className="font-semibold text-gray-800">
                    {formTreatments.length}
                  </span>
                </p>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <button
                    type="button"
                    onClick={copyAllToClipboard}
                    className="inline-flex h-11 items-center justify-center rounded-full border border-goldDark/15 bg-white px-5 text-sm font-semibold text-goldDark transition duration-300 hover:-translate-y-0.5 hover:cursor-pointer hover:border-goldDark/30 hover:bg-[#fffaf2]"
                  >
                    Kopírovať celé
                  </button>

                  <button
                    type="button"
                    onClick={handleUndo}
                    disabled={!hasChanges || isPending}
                    className="inline-flex h-11 items-center justify-center rounded-full border border-goldDark/15 bg-white px-5 text-sm font-semibold text-goldDark transition duration-300 hover:-translate-y-0.5 hover:cursor-pointer hover:border-goldDark/30 hover:bg-[#fffaf2] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                  >
                    Undo
                  </button>

                  <button
                    type="submit"
                    disabled={!hasChanges || isPending}
                    className="inline-flex h-11 items-center justify-center rounded-full bg-linear-to-r from-redMain to-redDark px-6 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(190,18,60,0.22)] transition duration-300 hover:-translate-y-0.5 hover:cursor-pointer hover:shadow-[0_14px_30px_rgba(190,18,60,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-redMain/25 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
                  >
                    {isPending ? "Ukladám..." : "Aktualizovať cenník"}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
