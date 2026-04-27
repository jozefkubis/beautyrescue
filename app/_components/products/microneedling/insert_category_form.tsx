"use client";

import { insertTknCategoryRecord } from "@/app/_lib/actions_all/actions_tkn";
import { useState } from "react";
import toast from "react-hot-toast";
import CheckboxField from "../../CheckboxField";
import InputField from "../../InputField";
import SubmitButton from "../../SubmitButton";
import TextareaField from "../../TextareaField";

export type InsertCategoryFormValues = {
  slug: string;
  title: string;
  intro: string;
  text: string;
  isActive: boolean;
};

export type InsertCategoryFormProps = {
  onSaved?: () => void;
};

export default function Insert_category_form({
  onSaved,
}: InsertCategoryFormProps) {
  const [values, setValues] = useState<InsertCategoryFormValues>({
    slug: "",
    title: "",
    intro: "",
    text: "",
    isActive: true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange<K extends keyof InsertCategoryFormValues>(
    field: K,
    value: InsertCategoryFormValues[K],
  ) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      setIsSubmitting(true);

      const formData = new FormData();
      formData.set("slug", values.slug.trim());
      formData.set("title", values.title.trim());
      formData.set("intro", values.intro.trim());
      formData.set("text", values.text.trim());
      formData.set("isActive", values.isActive ? "true" : "false");
        
      const result = await insertTknCategoryRecord(formData);

      if (!result.ok) {
        toast.error(result.error);
        return;
      }

      toast.success(result.message);

      setValues((prev) => ({
        ...prev,
        slug: "",
        title: "",
        intro: "",
        text: "",
        isActive: true,
      }));

      onSaved?.();
    } finally {
      setIsSubmitting(false);
    }
  }

  const isButtonDisabled =
    isSubmitting ||
    !values.slug.trim() ||
    !values.title.trim() ||
    !values.intro.trim() ||
    !values.text.trim();

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
        <InputField
          label="Slug"
          value={values.slug}
          onChange={(e) => handleChange("slug", e.target.value)}
        />
      </div>

      <TextareaField
        label="Úvodný text"
        value={values.intro}
        onChange={(e) => handleChange("intro", e.target.value)}
      />

      <TextareaField
        label="Detailný popis"
        value={values.text}
        onChange={(e) => handleChange("text", e.target.value)}
      />

      <CheckboxField
        labelActive="Aktívny"
        labelInactive="Neaktívny"
        checked={values.isActive}
        onChange={(e) => handleChange("isActive", e.target.checked)}
      />

      <div className="flex justify-end border-t border-goldDark/10 pt-4">
        <SubmitButton loading={isSubmitting} disabled={isButtonDisabled}>
          Pridať kategóriu
        </SubmitButton>
      </div>
    </form>
  );
}
