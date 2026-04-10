"use client";

// Serverová akcia, ktorá uloží zmenené dáta do databázy (Supabase).
import FileField from "@/app/_components/FileField";
import InputField from "@/app/_components/InputField";
import SubmitButton from "@/app/_components/SubmitButton";
import TextareaField from "@/app/_components/TextareaField";
import UndoButton from "@/app/_components/UndoButton";
import { updateAboutUs } from "@/app/_lib/actions_all/actions_about";
// useRouter slúži na obnovenie stránky po uložení, aby sa zobrazili nové dáta.
import { useRouter } from "next/navigation";
// useMemo – vypočíta počiatočné hodnoty iba raz pri načítaní (nie pri každom renderi).
// useState – udržiava aktuálny stav hodnôt vo formulári.
// useTransition – umožňuje spustiť async akciu (uloženie) bez zablokovania UI.
import { useMemo, useState, useTransition } from "react";
// Knižnica na zobrazovanie notifikácií (toast správy).
import toast from "react-hot-toast";

// Typ popisuje, aký tvar majú dáta pre stránku O nás z databázy.
type AboutUsData = {
  slug: string;
  title: string;
  quote: string;
  quote_author: string;
  body_intro: string;
  body_team: string;
  body_services: string;
  body_philosophy: string;
  image_url: string;
  is_active: boolean;
};

// Props, ktoré formulár dostane z nadradenej stránky:
// - aboutUsData: aktuálne dáta z DB (predvyplnia formulár)
// - isAdmin: či je prihlásený admin (ak nie, inputy sú readOnly a tlačidlá disabled)
type AboutUpdateFormProps = {
  aboutUsData: AboutUsData | null;
  isAdmin?: boolean;
};

export default function AboutUpdateForm({
  aboutUsData,
  isAdmin,
}: AboutUpdateFormProps) {
  const router = useRouter();

  // isPending = true kým beží ukladanie na server; startTransition spustí async akciu.
  const [isPending, startTransition] = useTransition();

  // Počiatočné hodnoty formulára – naplnené z DB dát.
  const initialValues = useMemo(
    () => ({
      title: aboutUsData?.title ?? "",
      quote: aboutUsData?.quote ?? "",
      quoteAuthor: aboutUsData?.quote_author ?? "",
      bodyIntro: aboutUsData?.body_intro ?? "",
      bodyTeam: aboutUsData?.body_team ?? "",
      bodyServices: aboutUsData?.body_services ?? "",
      bodyPhilosophy: aboutUsData?.body_philosophy ?? "",
      image_url: aboutUsData?.image_url ?? "",
      isActive: aboutUsData?.is_active ?? false,
    }),
    [aboutUsData],
  );

  // formValues = to, čo admin práve píše do formulára (live stav).
  const [formValues, setFormValues] = useState(initialValues);

  // Vybraný obrázok držíme samostatne, aby sa poslal ako File vo FormData.
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);

  // lastSavedValues = posledný stav, ktorý bol úspešne uložený do DB.
  // Používa sa na detekciu zmien a funkciu Undo.
  const [lastSavedValues, setLastSavedValues] = useState(initialValues);

  // Generická funkcia na aktualizáciu ľubovoľného poľa vo formulári.
  function handleChange(
    field: keyof typeof formValues,
    value: string | boolean,
  ) {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  }

  // Vráti formulár do stavu posledného úspešného uloženia.
  function handleUndo() {
    setFormValues(lastSavedValues);
    setSelectedImageFile(null);
    toast.success("Zmeny boli vrátené");
  }

  // Spustí sa po kliknutí na uloženie a pošle textové dáta aj obrázok.
  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      try {
        formData.set("slug", aboutUsData?.slug ?? "about-us");
        formData.set(
          "data",
          JSON.stringify({
            title: formValues.title,
            quote: formValues.quote,
            quoteAuthor: formValues.quoteAuthor,
            bodyIntro: formValues.bodyIntro,
            bodyTeam: formValues.bodyTeam,
            bodyServices: formValues.bodyServices,
            bodyPhilosophy: formValues.bodyPhilosophy,
            isActive: formValues.isActive,
          }),
        );

        if (selectedImageFile) {
          formData.set("image_file", selectedImageFile);
        }

        await updateAboutUs(formData);

        setLastSavedValues(formValues);
        setSelectedImageFile(null);
        router.refresh();
        toast.success("Sekcia O nás bola aktualizovaná");
      } catch (error) {
        console.error(error);
        toast.error("Chyba pri ukladaní O nás");
      }
    });
  }

  // Uložiť sa dá pri textovej zmene alebo keď je zvolený nový obrázok.
  const hasChanges =
    JSON.stringify(formValues) !== JSON.stringify(lastSavedValues) ||
    selectedImageFile !== null;

  // Ak sa dáta z DB nepodarilo načítať, zobrazíme chybovú správu namiesto formulára.
  if (!aboutUsData) {
    return (
      <div className="section-shell mx-auto w-full max-w-3xl p-6 text-center text-redDark">
        Dáta pre stránku O nás sa nepodarilo načítať.
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
            <h1 className="mt-4 text-3xl font-semibold italic text-goldDark sm:text-4xl">
              Stránka O nás
            </h1>
          </div>
        </div>

        <form action={handleSubmit} className="space-y-5 px-5 pb-6 md:px-8">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <InputField
              label="Názov"
              value={formValues.title}
              onChange={(e) => handleChange("title", e.target.value)}
              readOnly={!isAdmin}
            />
            <InputField
              label="Autor citátu"
              value={formValues.quoteAuthor}
              onChange={(e) => handleChange("quoteAuthor", e.target.value)}
              readOnly={!isAdmin}
            />
          </div>

          <TextareaField
            label="Krátky citát"
            value={formValues.quote}
            onChange={(e) => handleChange("quote", e.target.value)}
            readOnly={!isAdmin}
            rows={3}
          />

          <TextareaField
            label="Úvod"
            value={formValues.bodyIntro}
            onChange={(e) => handleChange("bodyIntro", e.target.value)}
            readOnly={!isAdmin}
            rows={5}
          />

          <TextareaField
            label="Tím"
            value={formValues.bodyTeam}
            onChange={(e) => handleChange("bodyTeam", e.target.value)}
            readOnly={!isAdmin}
            rows={5}
          />

          <TextareaField
            label="Služby"
            value={formValues.bodyServices}
            onChange={(e) => handleChange("bodyServices", e.target.value)}
            readOnly={!isAdmin}
            rows={10}
          />

          <TextareaField
            label="Filozofia"
            value={formValues.bodyPhilosophy}
            onChange={(e) => handleChange("bodyPhilosophy", e.target.value)}
            readOnly={!isAdmin}
            rows={5}
          />

          <FileField
            type="file"
            label="Obrázok (URL)"
            value={formValues.image_url}
            onChange={(e) => {
              const file = e.target.files?.[0] ?? null;
              setSelectedImageFile(file);
            }}
            readOnly={!isAdmin}
          />
          {selectedImageFile ? (
            <p className="text-xs text-greyMain/80">
              Vybraný súbor: {selectedImageFile.name}
            </p>
          ) : null}

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
