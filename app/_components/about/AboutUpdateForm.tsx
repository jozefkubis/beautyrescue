"use client"

// Serverová akcia, ktorá uloží zmenené dáta do databázy (Supabase).
import { updateAboutUs } from "@/app/_lib/actions/actions_about"
// useRouter slúži na obnovenie stránky po uložení, aby sa zobrazili nové dáta.
import { useRouter } from "next/navigation"
// useMemo – vypočíta počiatočné hodnoty iba raz pri načítaní (nie pri každom renderi).
// useState – udržiava aktuálny stav hodnôt vo formulári.
// useTransition – umožňuje spustiť async akciu (uloženie) bez zablokovania UI.
import { useMemo, useState, useTransition } from "react"
// Knižnica na zobrazovanie notifikácií (toast správy).
import toast from "react-hot-toast"

// Typ popisuje, aký tvar majú dáta pre stránku O nás z databázy.
type AboutData = {
  slug?: string
  name?: string
  summary?: string
  is_active?: boolean
  metadata?: {
    quoteAuthor?: string
  }
  content?: {
    bodyIntro?: string
    bodyTeam?: string
    bodyServices?: string
    bodyPhilosophy?: string
  }
}

// Props, ktoré formulár dostane z nadradenej stránky:
// - aboutUsData: aktuálne dáta z DB (predvyplnia formulár)
// - isAdmin: či je prihlásený admin (ak nie, inputy sú readOnly a tlačidlá disabled)
type AboutUpdateFormProps = {
  aboutUsData: AboutData | null
  isAdmin?: boolean
}

export default function AboutUpdateForm({
  aboutUsData,
  isAdmin,
}: AboutUpdateFormProps) {
  const router = useRouter()

  // isPending = true kým beží ukladanie na server; startTransition spustí async akciu.
  const [isPending, startTransition] = useTransition()

  // Počiatočné hodnoty formulára – naplnené z DB dát.
  // useMemo zabezpečí, že sa tieto hodnoty prepočítajú iba ak sa zmení aboutUsData.
  const initialValues = useMemo(
    () => ({
      name: aboutUsData?.name ?? "",
      summary: aboutUsData?.summary ?? "",
      quoteAuthor: aboutUsData?.metadata?.quoteAuthor ?? "",
      bodyIntro: aboutUsData?.content?.bodyIntro ?? "",
      bodyTeam: aboutUsData?.content?.bodyTeam ?? "",
      bodyServices: aboutUsData?.content?.bodyServices ?? "",
      bodyPhilosophy: aboutUsData?.content?.bodyPhilosophy ?? "",
      isActive: aboutUsData?.is_active ?? false,
    }),
    [aboutUsData],
  )

  // formValues = to, čo admin práve píše do formulára (live stav).
  const [formValues, setFormValues] = useState(initialValues)

  // lastSavedValues = posledný stav, ktorý bol úspešne uložený do DB.
  // Používa sa na detekciu zmien a funkciu Undo.
  const [lastSavedValues, setLastSavedValues] = useState(initialValues)

  // Generická funkcia na aktualizáciu ľubovoľného poľa vo formulári.
  // na pochopenie: "prev" je starý stav formulára, "...prev" ho skopíruje
  // a [field]: value prepíše iba jedno vybrané pole.
  function handleChange(field: keyof typeof formValues, value: string) {
    setFormValues((prev) => ({ ...prev, [field]: value }))
  }

  // Vráti formulár do stavu posledného úspešného uloženia.
  function handleUndo() {
    setFormValues(lastSavedValues)
    toast.success("Zmeny boli vrátené")
  }

  // Spustí sa po kliknutí na "Uložiť O nás".
  // Zabalí dáta do FormData, odošle na server a po úspechu obnoví stránku.
  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      try {
        // Pridáme slug, aby server vedel, ktorý záznam v DB má aktualizovať.
        formData.set("slug", aboutUsData?.slug ?? "about-us")
        // Celý stav formulára serializujeme do JSON a pošleme ako jeden parameter.
        formData.set("data", JSON.stringify(formValues))

        await updateAboutUs(formData)

        // Po úspešnom uložení aktualizujeme "zálohu" pre Undo.
        setLastSavedValues(formValues)
        // Obnoví Next.js cache a re-fetchne dáta na stránke.
        router.refresh()
        toast.success("Sekcia O nás bola aktualizovaná")
      } catch (error) {
        console.error(error)
        toast.error("Chyba pri ukladaní O nás")
      }
    })
  }

  // true ak sa aktuálne hodnoty líšia od posledného uloženia → aktivuje tlačidlá.
  const hasChanges =
    JSON.stringify(formValues) !== JSON.stringify(lastSavedValues)

  // Ak sa dáta z DB nepodarilo načítať, zobrazíme chybovú správu namiesto formulára.
  if (!aboutUsData) {
    return (
      <div className="section-shell mx-auto w-full max-w-3xl p-6 text-center text-redDark">
        Dáta pre stránku O nás sa nepodarilo načítať.
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
            <h1 className="mt-4 text-3xl font-semibold italic text-goldDark sm:text-4xl">
              Stránka O nás
            </h1>
          </div>
        </div>

        <form action={handleSubmit} className="space-y-5 px-5 pb-6 md:px-8">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <label className="flex flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-goldDark/80">
                Názov
              </span>
              <input
                type="text"
                value={formValues.name}
                onChange={(e) => handleChange("name", e.target.value)}
                readOnly={!isAdmin}
                className="h-12 rounded-xl border border-goldDark/20 bg-white px-4 text-sm text-gray-800 outline-none transition focus:border-goldDark/35"
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-goldDark/80">
                Autor citátu
              </span>
              <input
                type="text"
                value={formValues.quoteAuthor}
                onChange={(e) => handleChange("quoteAuthor", e.target.value)}
                readOnly={!isAdmin}
                className="h-12 rounded-xl border border-goldDark/20 bg-white px-4 text-sm text-gray-800 outline-none transition focus:border-goldDark/35"
              />
            </label>
          </div>

          <label className="flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-goldDark/80">
              Krátky citát
            </span>
            <textarea
              value={formValues.summary}
              onChange={(e) => handleChange("summary", e.target.value)}
              readOnly={!isAdmin}
              rows={3}
              className="w-full rounded-xl border border-goldDark/20 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-goldDark/35"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-goldDark/80">
              Úvod
            </span>
            <textarea
              value={formValues.bodyIntro}
              onChange={(e) => handleChange("bodyIntro", e.target.value)}
              readOnly={!isAdmin}
              rows={5}
              className="w-full rounded-xl border border-goldDark/20 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-goldDark/35"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-goldDark/80">
              Tím
            </span>
            <textarea
              value={formValues.bodyTeam}
              onChange={(e) => handleChange("bodyTeam", e.target.value)}
              readOnly={!isAdmin}
              rows={5}
              className="w-full rounded-xl border border-goldDark/20 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-goldDark/35"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-goldDark/80">
              Služby
            </span>
            <textarea
              value={formValues.bodyServices}
              onChange={(e) => handleChange("bodyServices", e.target.value)}
              readOnly={!isAdmin}
              rows={5}
              className="w-full rounded-xl border border-goldDark/20 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-goldDark/35"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-goldDark/80">
              Filozofia
            </span>
            <textarea
              value={formValues.bodyPhilosophy}
              onChange={(e) => handleChange("bodyPhilosophy", e.target.value)}
              readOnly={!isAdmin}
              rows={5}
              className="w-full rounded-xl border border-goldDark/20 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-goldDark/35"
            />
          </label>

          <div className="flex flex-col gap-3 border-t border-goldDark/10 pt-5 sm:flex-row sm:items-center sm:justify-end">
            <button
              type="button"
              onClick={handleUndo}
              disabled={!hasChanges || isPending || !isAdmin}
              className="inline-flex h-11 items-center justify-center rounded-full border border-goldDark/15 bg-white px-5 text-sm font-semibold text-goldDark transition duration-300 hover:-translate-y-0.5 hover:cursor-pointer hover:border-goldDark/30 hover:bg-[#fffaf2] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
            >
              Undo
            </button>

            <button
              type="submit"
              disabled={!hasChanges || isPending || !isAdmin}
              className="inline-flex h-11 items-center justify-center rounded-full bg-linear-to-r from-redMain to-redDark px-6 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(190,18,60,0.22)] transition duration-300 hover:-translate-y-0.5 hover:cursor-pointer hover:shadow-[0_14px_30px_rgba(190,18,60,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-redMain/25 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
            >
              {isPending ? "Ukladám..." : "Uložiť O nás"}
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
