"use client";

import CheckboxField from "@/app/_components/CheckboxField";
import FileField from "@/app/_components/FileField";
import InputField from "@/app/_components/InputField";
import SubmitButton from "@/app/_components/SubmitButton";
import TextareaField from "@/app/_components/TextareaField";
import { insertTknProductRecord } from "@/app/_lib/actions_all/actions_tkn";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";

type CategoryOption = {
  slug: string;
  title: string;
};

export type InsertProductFormValues = {
  categorySlug: string;
  name: string;
  slug: string;
  summary: string;
  description: string;
  isActive: boolean;
};

type InsertProductFormProps = {
  categories: CategoryOption[];
  initialCategorySlug?: string;
  onSaved?: () => void;
};

// Formular pripravi data pre novy produkt a priradi ho do zvolenej TKN kategorie.
export default function Insert_product_form({
  categories,
  initialCategorySlug,
  onSaved,
}: InsertProductFormProps) {
  const resolvedInitialCategorySlug =
    categories.find((category) => category.slug === initialCategorySlug)
      ?.slug ??
    categories[0]?.slug ??
    "";

  const initialValues = useMemo<InsertProductFormValues>(
    () => ({
      categorySlug: resolvedInitialCategorySlug,
      name: "",
      slug: "",
      summary: "",
      description: "",
      isActive: true,
    }),
    [resolvedInitialCategorySlug],
  );

  const [values, setValues] = useState<InsertProductFormValues>(initialValues);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange<K extends keyof InsertProductFormValues>(
    field: K,
    value: InsertProductFormValues[K],
  ) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      setIsSubmitting(true);

      const formData = new FormData();
      formData.set("slug", values.slug.trim());
      formData.set(
        "data",
        JSON.stringify({
          category_slug: values.categorySlug,
          name: values.name,
          summary: values.summary,
          description: values.description,
          is_active: values.isActive,
        }),
      );

      if (imageFile) {
        formData.set("image_file", imageFile);
      }

      const result = await insertTknProductRecord(formData);

      if (!result.ok) {
        toast.error(result.error);
        return;
      }

      toast.success(result.message);

      // Po uspesnom ulozeni nechame vybranu kategoriu, ale vycistime zvysok formulara.
      setValues((prev) => ({
        ...prev,
        name: "",
        slug: "",
        summary: "",
        description: "",
        isActive: true,
      }));
      setImageFile(null);

      onSaved?.();
    } finally {
      setIsSubmitting(false);
    }
  }

  const isSubmitDisabled =
    isSubmitting ||
    !values.categorySlug ||
    !values.name.trim() ||
    !values.slug.trim();

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-2xl border border-goldDark/15 bg-white p-5 md:p-6"
    >
      <div className="space-y-2">
        <h2 className="text-xl font-semibold italic text-goldDark sm:text-2xl">
          Pridať nový produkt
        </h2>
        <p className="text-sm text-greyMain/80">
          Vyplň základné údaje produktu. Ukladanie napojíme v ďalšom kroku.
        </p>
      </div>

      <label className="flex flex-col gap-2">
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-goldDark/80">
          Kategória
        </span>
        <select
          value={values.categorySlug}
          onChange={(e) => handleChange("categorySlug", e.target.value)}
          className="h-12 rounded-xl border border-goldDark/20 bg-white px-4 text-sm text-gray-800 outline-none transition focus:border-goldDark/35"
        >
          {categories.length === 0 ? (
            <option value="">Najprv vytvor kategóriu</option>
          ) : (
            categories.map((category) => (
              <option key={category.slug} value={category.slug}>
                {category.title}
              </option>
            ))
          )}
        </select>
      </label>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <InputField
          label="Názov produktu"
          value={values.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />
        <InputField
          label="Slug"
          value={values.slug}
          onChange={(e) => handleChange("slug", e.target.value)}
        />
      </div>

      <TextareaField
        label="Krátke zhrnutie"
        value={values.summary}
        onChange={(e) => handleChange("summary", e.target.value)}
        rows={4}
      />

      <TextareaField
        label="Detailný popis"
        value={values.description}
        onChange={(e) => handleChange("description", e.target.value)}
        rows={8}
      />

      <FileField
        type="file"
        label="Obrázok produktu"
        onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
        accept="image/*"
      />

      {imageFile ? (
        <p className="text-xs text-greyMain/80">
          Vybraný súbor: {imageFile.name}
        </p>
      ) : null}

      <CheckboxField
        labelActive="Aktívny"
        labelInactive="Neaktívny"
        checked={values.isActive}
        onChange={(e) => handleChange("isActive", e.target.checked)}
      />

      <div className="flex justify-end border-t border-goldDark/10 pt-4">
        <SubmitButton loading={isSubmitting} disabled={isSubmitDisabled}>
          Pridať produkt
        </SubmitButton>
      </div>
    </form>
  );
}
