"use client";

// --- FORMULÁR NA AKTUALIZÁCIU OBSAHU MEZOTERAPIE ---
// Tento komponent slúži na správu a úpravu obsahu pre všetky sekcie mezoterapie (hlavná, invazívna, neinvazívna) v admin rozhraní.
// Umožňuje adminovi upravovať názov, texty a aktivitu každej sekcie. Každá sekcia má vlastný formulár a vlastné tlačidlá na uloženie/vrátenie zmien.

// --- ZDIEĽANÉ KOMPONENTY PRE FORMULÁR ---
import CheckboxField from "@/app/_components/CheckboxField";
import InputField from "@/app/_components/InputField";
import SubmitButton from "@/app/_components/SubmitButton";
import TextareaField from "@/app/_components/TextareaField";
import UndoButton from "@/app/_components/UndoButton";

// --- SERVEROVÉ AKCIE NA ULOŽENIE ZMIEN DO DB ---
import {
  updateMezoterapia,
  updateMezoterapiaInvasive,
  updateMezoterapiaNonInvasive,
} from "@/app/_lib/actions/actions_mezoterapia";

// --- HOOKY A NOTIFIKÁCIE ---
import { useMemo, useState, useTransition } from "react";
import toast from "react-hot-toast";
import SectionNavigation from "../../SectionNavigation";
import { updateServiceBySlug } from "@/app/_lib/actions_all/actions_services";

// --- TYPY PRE DÁTA ---
export type MezoterapiaData = {
  slug?: string;
  title?: string;
  text?: string;
  is_active?: boolean;
};

// --- PROPS PRE HLAVNÝ FORMULÁR ---
// Prijíma dáta pre všetky tri sekcie a informáciu, či je užívateľ admin
type MezoterapiaUpdateFormProps = {
  mezoterapiaData: MezoterapiaData;
  mezoterapiaInvasiveData: MezoterapiaData;
  mezoterapiaNonInvasiveData: MezoterapiaData;
  isAdmin?: boolean;
};

// --- HLAVIČKA SEKCIÍ ---
// Zobrazí nadpis a popis sekcie vo formulári
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

// --- JEDEN FORMULÁR PRE JEDNU SEKCIU ---
// Komponent pre editáciu jednej sekcie mezoterapie (hlavná/invazívna/neinvazívna)
// Umožňuje editovať názov, text a aktivitu, a uložiť/vrátiť zmeny
function SingleMezoterapiaForm({
  data,
  label,
  isAdmin,
  type,
}: {
  data: MezoterapiaData;
  label: string;
  isAdmin?: boolean;
  type: "main" | "invasive" | "noninvasive";
}) {
  const [isPending, startTransition] = useTransition();
  const initialValues = useMemo(
    () => ({
      title: data?.title ?? "",
      text: data?.text ?? "",
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
            title: formValues.title,
            text: formValues.text,
            is_active: formValues.isActive,
          }),
        );
        if (type === "main") {
          await updateServiceBySlug(formData, data?.slug || "mezoterapia");
        } else if (type === "invasive") {
          await updateServiceBySlug(formData, data?.slug || "mezoterapia-invasive");
        } else if (type === "noninvasive") {
          await updateServiceBySlug(formData, data?.slug || "mezoterapia-noninvasive");
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
          value={formValues.title}
          onChange={(e) => handleChange("title", e.target.value)}
          readOnly={!isAdmin}
        />
        <TextareaField
          label="Obsah"
          value={formValues.text}
          onChange={(e) => handleChange("text", e.target.value)}
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
            <SectionHeader title="Mezoterapia (hlavná sekcia)" />
            <SingleMezoterapiaForm
              data={mezoterapiaData}
              label="Mezoterapia"
              isAdmin={isAdmin}
              type="main"
            />
          </>
        )}
        {index === 2 && (
          <>
            <SectionHeader title="Invazívna mezoterapia" />
            <SingleMezoterapiaForm
              data={mezoterapiaInvasiveData}
              label="Invazívna mezoterapia"
              isAdmin={isAdmin}
              type="invasive"
            />
          </>
        )}
        {index === 3 && (
          <>
            <SectionHeader title="Neinvazívna mezoterapia" />
            <SingleMezoterapiaForm
              data={mezoterapiaNonInvasiveData}
              label="Neinvazívna mezoterapia"
              isAdmin={isAdmin}
              type="noninvasive"
            />
          </>
        )}
      </div>
    </section>
  );
}
