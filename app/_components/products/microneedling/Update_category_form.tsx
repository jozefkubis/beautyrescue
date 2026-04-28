"use client";

import { updateTknCategoryBySlug } from "@/app/_lib/actions_all/actions_tkn";
import type { TknCategoryRow } from "@/app/_lib/data_services_all/data_tkn";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import InputField from "../../InputField";
import SubmitButton from "../../SubmitButton";
import TextareaField from "../../TextareaField";

type UpdateCategoryFormProps = {
  category: TknCategoryRow | null;
  onSaved?: () => void;
};

export default function Update_category_form({
  category,
  onSaved,
}: UpdateCategoryFormProps) {
  const initialValues = useMemo(
    () => ({
      slug: category?.slug ?? "",
      title: category?.title ?? "",
      intro: category?.intro ?? "",
      text: category?.text ?? "",
    }),
    [category],
  );

  const [values, setValues] = useState(initialValues);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Keď príde nový produkt, prepíš hodnoty vo formulári
  useEffect(() => {
    setValues(initialValues);
  }, [initialValues]);

  function handleChange<K extends keyof typeof values>(
    key: K,
    value: (typeof values)[K],
  ) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Bez kategórie nemáme podľa čoho updateovať
    if (!category?.slug) {
      toast.error("Chýba slug kategórie.");
      return;
    }

    try {
      setIsSubmitting(true);

      const formData = new FormData();

      // Slug sem neposielame, lebo ho nechceme meniť
      formData.set("title", values.title.trim());
      formData.set("intro", values.intro ?? "");
      formData.set("text", values.text ?? "");

      // category.slug je pôvodný slug, slúži iba ako identifikátor
      const result = await updateTknCategoryBySlug(formData, category.slug);

      if (!result.ok) {
        toast.error(result.error);
        return;
      }

      toast.success(result.message);

      onSaved?.();
    } finally {
      setIsSubmitting(false);
    }
  }

  const isButtonDisabled =
    initialValues === values ||
    isSubmitting ||
    !values.title.trim() ||
    !values?.intro?.trim() ||
    !values?.text?.trim();

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-2xl border border-goldDark/15 bg-white p-5 md:p-6"
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <InputField
          label="Názov kategórie"
          value={values.title}
          onChange={(e) => handleChange("title", e.target.value)}
        />
        <div className="space-y-1">
          <label
            htmlFor="slug-input"
            className="text-sm font-medium text-greyMain/80"
          >
            Slug - identifikátor kategórie, nedá sa meniť
          </label>

          <input
            id="slug-input"
            value={values.slug}
            disabled
            title="Slug - identifikátor kategórie, nedá sa meniť"
            placeholder="Slug kategórie"
            className="h-12 rounded-xl border border-goldDark/20 bg-gray-100 px-4 text-sm text-greyMain/70 outline-none transition focus:border-goldDark/35"
          />
        </div>
      </div>

      <TextareaField
        label="Úvodný text"
        value={values.intro || ""}
        onChange={(e) => handleChange("intro", e.target.value)}
      />

      <TextareaField
        label="Detailný popis"
        value={values.text || ""}
        onChange={(e) => handleChange("text", e.target.value)}
      />

      <div className="flex justify-end border-t border-goldDark/10 pt-4">
        <SubmitButton loading={isSubmitting} disabled={isButtonDisabled}>
          Aktualizovať kategóriu
        </SubmitButton>
      </div>
    </form>
  );
}
