"use client";

import FileField from "@/app/_components/FileField";
import SubmitButton from "@/app/_components/SubmitButton";
import UndoButton from "@/app/_components/UndoButton";
import { updateMainImage } from "@/app/_lib/actions/actions_main_image";
import type { HomeImageProps } from "@/app/_lib/data_services/data_home_image";
import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";
import toast from "react-hot-toast";

type Props = {
  isAdmin?: boolean;
  homeImg: HomeImageProps;
};

export default function MainImage_update_form({ isAdmin, homeImg }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const initialValues = useMemo(
    () => ({
      image_url: homeImg.image_url ?? "",
    }),
    [homeImg],
  );

  const [formValues, setFormValues] = useState(initialValues);
  const [lastSavedValues, setLastSavedValues] = useState(initialValues);
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);

  // function handleChange(field: keyof typeof formValues, value: string) {
  //   setFormValues((prev) => ({ ...prev, [field]: value }));
  // }

  function handleUndo() {
    setFormValues(lastSavedValues);
    setSelectedImageFile(null);
    toast.success("Zmeny boli vrátené");
  }

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      try {
        if (!selectedImageFile) {
          toast.error("Najprv vyber obrázok");
          return;
        }

        formData.set("image_file", selectedImageFile);

        const result = await updateMainImage(formData);

        if (!result.success) {
          toast.error(result.message);
          return;
        }

        const nextValues = {
          image_url: result.imageUrl ?? formValues.image_url,
        };

        setFormValues(nextValues);
        setLastSavedValues(nextValues);
        setSelectedImageFile(null);
        router.refresh();
        toast.success(result.message);
      } catch (error) {
        console.error(error);
        toast.error("Chyba pri ukladaní Hlavnej fotky");
      }
    });
  }

  const hasChanges =
    JSON.stringify(formValues) !== JSON.stringify(lastSavedValues) ||
    selectedImageFile !== null;

  if (!homeImg) {
    return (
      <div className="section-shell mx-auto w-full max-w-3xl p-6 text-center text-redDark">
        Dáta pre Hlavnú fotku sa nepodarilo načítať.
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
              Hlavná fotka
            </h2>
          </div>
        </div>

        <form action={handleSubmit} className="space-y-5 px-5 pb-6 md:px-8">
          <div className="grid grid-cols-1 gap-4">
            <FileField
              type="file"
              label="Hlavná fotka (image_url)"
              value={formValues.image_url}
              onChange={(e) =>
                setSelectedImageFile(e.target.files?.[0] ?? null)
              }
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
          </div>
        </form>
      </div>
    </section>
  );
}
