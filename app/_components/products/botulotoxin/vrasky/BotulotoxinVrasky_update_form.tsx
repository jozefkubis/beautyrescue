"use client";

import CheckboxField from "@/app/_components/CheckboxField";
import FileField from "@/app/_components/FileField";
import InputField from "@/app/_components/InputField";
import SubmitButton from "@/app/_components/SubmitButton";
import TextareaField from "@/app/_components/TextareaField";
import UndoButton from "@/app/_components/UndoButton";
import { updateBotulotoxinVrasky } from "@/app/_lib/actions/actions_botulotoxin";
import type { BotulotoxinVraskyMainProps } from "@/app/_lib/data_services/data_botulotoxin";
import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";
import toast from "react-hot-toast";

type BotulotoxinVraskyUpdateFormProps = {
  botulotoxinVraskyData:
    | BotulotoxinVraskyMainProps["botulotoxinVraskyData"]
    | null;
  isAdmin?: boolean;
};

export default function BotulotoxinVrasky_update_form({
  botulotoxinVraskyData,
  isAdmin,
}: BotulotoxinVraskyUpdateFormProps) {
  const router = useRouter();

  // isPending = true kým beží ukladanie na server; startTransition spustí async akciu.
  const [isPending, startTransition] = useTransition();

  // Počiatočné hodnoty formulára – naplnené z DB dát.
  // useMemo zabezpečí, že sa tieto hodnoty prepočítajú iba ak sa zmení aboutUsData.
  const initialValues = useMemo(
    () => ({
      name: botulotoxinVraskyData?.name ?? "",
      summary: botulotoxinVraskyData?.summary ?? "",
      image_url: botulotoxinVraskyData?.image_url ?? "",
      paragraphs: Array.isArray(botulotoxinVraskyData?.content.paragraphs)
        ? botulotoxinVraskyData.content.paragraphs.join("\n\n")
        : (botulotoxinVraskyData?.content.paragraphs ?? ""),
      isActive: botulotoxinVraskyData?.is_active ?? false,
    }),
    [botulotoxinVraskyData],
  );

  // formValues = to, čo admin práve píše do formulára (live stav).
  const [formValues, setFormValues] = useState(initialValues);

  // lastSavedValues = posledný stav, ktorý bol úspešne uložený do DB.
  // Používa sa na detekciu zmien a funkciu Undo.
  const [lastSavedValues, setLastSavedValues] = useState(initialValues);

  // selectedImageFile = aktuálne vybraný obrázok z file pickeru.
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);

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
        formData.set(
          "slug",
          botulotoxinVraskyData?.slug ?? "botulotoxin-vrasky",
        );
        // Celý stav formulára serializujeme do JSON v tvare, ktorý očakáva server action.
        formData.set(
          "data",
          JSON.stringify({
            name: formValues.name,
            summary: formValues.summary,
            content: {
              paragraphs: formValues.paragraphs.split("\n\n"),
            },
            is_active: formValues.isActive,
          }),
        );

        if (selectedImageFile) {
          formData.set("image_file", selectedImageFile);
        }

        await updateBotulotoxinVrasky(formData);

        // Po úspešnom uložení aktualizujeme "zálohu" pre Undo.
        setLastSavedValues(formValues);
        // Obnoví Next.js cache a re-fetchne dáta na stránke.
        router.refresh();
        toast.success("Sekcia Botulotoxín vrásky bola aktualizovaná");
      } catch (error) {
        console.error(error);
        toast.error("Chyba pri ukladaní Sekcie Botulotoxín vrásky");
      }
    });
  }

  // true ak sa aktuálne hodnoty líšia od posledného uloženia → aktivuje tlačidlá.
  const hasChanges =
    JSON.stringify(formValues) !== JSON.stringify(lastSavedValues) ||
    selectedImageFile !== null;

  // Ak sa dáta z DB nepodarilo načítať, zobrazíme chybovú správu namiesto formulára.
  if (!botulotoxinVraskyData) {
    return (
      <div className="section-shell mx-auto w-full max-w-3xl p-6 text-center text-redDark">
        Dáta pre stránku Botulotoxín vrásky sa nepodarilo načítať.
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

        <InputField
          label="Krátky popis (summary)"
          value={formValues.summary}
          onChange={(e) => handleChange("summary", e.target.value)}
          readOnly={!isAdmin}
        />

        <TextareaField
          label="Obsah"
          value={formValues.paragraphs}
          onChange={(e) => handleChange("paragraphs", e.target.value)}
          readOnly={!isAdmin}
          rows={12}
        />

        <FileField
          type="file"
          label="Hlavná fotka (image_url)"
          value={formValues.image_url}
          onChange={(e) => setSelectedImageFile(e.target.files?.[0] ?? null)}
          readOnly={!isAdmin}
        />
        {selectedImageFile ? (
          <p className="text-xs text-greyMain/80">
            Vybraný súbor: {selectedImageFile.name}
          </p>
        ) : null}

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
