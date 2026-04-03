"use client";

import type { BotulotoxinMainProps } from "@/app/_lib/data_services/data_botulotoxin";
import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";
import toast from "react-hot-toast";
import CheckboxField from "../../CheckboxField";
import InputField from "../../InputField";
import SubmitButton from "../../SubmitButton";
import TextareaField from "../../TextareaField";
import UndoButton from "../../UndoButton";

type BotulotoxinMainPageUpdateFormProps = {
  botulotoxinData: BotulotoxinMainProps["botulotoxinData"] | null;
  isAdmin?: boolean;
};

export default function BotulotoxinMainPage_update_form({
  botulotoxinData,
  isAdmin,
}: BotulotoxinMainPageUpdateFormProps) {
  const router = useRouter();

  // isPending = true kým beží ukladanie na server; startTransition spustí async akciu.
  const [isPending, startTransition] = useTransition();

  // Počiatočné hodnoty formulára – naplnené z DB dát.
  // useMemo zabezpečí, že sa tieto hodnoty prepočítajú iba ak sa zmení aboutUsData.
  const initialValues = useMemo(
    () => ({
      name: botulotoxinData?.name ?? "",
      intro: Array.isArray(botulotoxinData?.attributes.intro)
        ? botulotoxinData.attributes.intro.join("\n\n")
        : (botulotoxinData?.attributes.intro ?? ""),
      complications: Array.isArray(botulotoxinData?.attributes.complications)
        ? botulotoxinData.attributes.complications.join("\n\n")
        : (botulotoxinData?.attributes.complications ?? ""),
      contraindications: Array.isArray(
        botulotoxinData?.attributes.contraindications,
      )
        ? botulotoxinData.attributes.contraindications.join("\n\n")
        : (botulotoxinData?.attributes.contraindications ?? ""),
      title: botulotoxinData?.content.about.title ?? "",
      paragraphs: Array.isArray(botulotoxinData?.content.about.paragraphs)
        ? botulotoxinData.content.about.paragraphs.join("\n\n")
        : (botulotoxinData?.content.about.paragraphs ?? ""),
      isActive: botulotoxinData?.is_active ?? false,
    }),
    [botulotoxinData],
  );

  // formValues = to, čo admin práve píše do formulára (live stav).
  const [formValues, setFormValues] = useState(initialValues);

  // lastSavedValues = posledný stav, ktorý bol úspešne uložený do DB.
  // Používa sa na detekciu zmien a funkciu Undo.
  const [lastSavedValues, setLastSavedValues] = useState(initialValues);

  // Generická funkcia na aktualizáciu ľubovoľného poľa vo formulári.
  // na pochopenie: "prev" je starý stav formulára, "...prev" ho skopíruje
  // a [field]: value prepíše iba jedno vybrané pole.
  function handleChange(
    field: keyof typeof formValues,
    value: string | boolean,
  ) {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  }

  // Vráti formulár do stavu posledného úspešného uloženia.
  function handleUndo() {
    setFormValues(lastSavedValues);
    toast.success("Zmeny boli vrátené");
  }

  // Spustí sa po kliknutí na "Uložiť Botulotoxín".
  // Zabalí dáta do FormData, odošle na server a po úspechu obnoví stránku.
  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      try {
        // Pridáme slug, aby server vedel, ktorý záznam v DB má aktualizovať.
        formData.set("slug", botulotoxinData?.slug ?? "botulotoxin");
        // Celý stav formulára serializujeme do JSON v tvare, ktorý očakáva server action.
        formData.set(
          "data",
          JSON.stringify({
            name: formValues.name,
            attributes: {
              intro: formValues.intro,
              complications: formValues.complications,
              contraindications: formValues.contraindications,
            },
            content: {
              about: {
                title: formValues.title,
                paragraphs: formValues.paragraphs,
              },
            },
            is_active: formValues.isActive,
          }),
        );

        // await updateBotulotoxinMain(formData);

        // Po úspešnom uložení aktualizujeme "zálohu" pre Undo.
        setLastSavedValues(formValues);
        // Obnoví Next.js cache a re-fetchne dáta na stránke.
        router.refresh();
        toast.success("Sekcia Botulotoxín bola aktualizovaná");
      } catch (error) {
        console.error(error);
        toast.error("Chyba pri ukladaní Botulotoxín");
      }
    });
  }

  // true ak sa aktuálne hodnoty líšia od posledného uloženia → aktivuje tlačidlá.
  const hasChanges =
    JSON.stringify(formValues) !== JSON.stringify(lastSavedValues);

  // Ak sa dáta z DB nepodarilo načítať, zobrazíme chybovú správu namiesto formulára.
  if (!botulotoxinData) {
    return (
      <div className="section-shell mx-auto w-full max-w-3xl p-6 text-center text-redDark">
        Dáta pre stránku Botulotoxín sa nepodarilo načítať.
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
          label="Uvodný text (intro)"
          value={formValues.intro}
          onChange={(e) => handleChange("intro", e.target.value)}
          readOnly={!isAdmin}
          rows={12}
        />

        <TextareaField
          label="Komplikácie"
          value={formValues.complications}
          onChange={(e) => handleChange("complications", e.target.value)}
          readOnly={!isAdmin}
          rows={12}
        />

        <TextareaField
          label="Kontraindikácie"
          value={formValues.contraindications}
          onChange={(e) => handleChange("contraindications", e.target.value)}
          readOnly={!isAdmin}
          rows={12}
        />

        <InputField
          label="Titulok sekcie O Botulotoxíne"
          value={formValues.title}
          onChange={(e) => handleChange("title", e.target.value)}
          readOnly={!isAdmin}
        />

        <TextareaField
          label="text sekcie O Botulotoxíne"
          value={formValues.paragraphs}
          onChange={(e) => handleChange("paragraphs", e.target.value)}
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
