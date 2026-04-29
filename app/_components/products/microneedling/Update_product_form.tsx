"use client";

import FileField from "@/app/_components/FileField";
import InputField from "@/app/_components/InputField";
import SubmitButton from "@/app/_components/SubmitButton";
import TextareaField from "@/app/_components/TextareaField";
import { updateTknProductBySlug } from "@/app/_lib/actions_all/actions_tkn";
import type { TknProductRow } from "@/app/_lib/data_services_all/data_tkn";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

type UpdateProductFormProps = {
  product: TknProductRow | null;
  // initialCategorySlug?: string;
  onSaved?: () => void;
};

export default function Update_product_form({
  product,
  onSaved,
}: UpdateProductFormProps) {
  const initialValues = useMemo(
    () => ({
      slug: product?.slug ?? "",
      name: product?.name ?? "",
      summary: product?.summary ?? "",
      description: product?.description ?? "",
      // content.indications je pole stringov:
      // ["mastná pleť", "pleť so sklonom k akné"]
      // do textarea to prevedieme na text, každý riadok jedna indikácia
      indications: Array.isArray(product?.content?.indications)
        ? product.content.indications.join("\n")
        : "",
    }),
    [product],
  );

  const [values, setValues] = useState(initialValues);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Keď príde nový produkt, prepíš hodnoty vo formulári
  useEffect(() => {
    setValues(initialValues);
    setImageFile(null);
  }, [initialValues]);

  function handleChange<K extends keyof typeof values>(
    key: K,
    value: (typeof values)[K],
  ) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Bez produktu nemáme podľa čoho updateovať
    if (!product?.slug) {
      toast.error("Chýba slug produktu.");
      return;
    }

    try {
      setIsSubmitting(true);

      const formData = new FormData();

      // Slug sem neposielame, lebo ho nechceme meniť
      formData.set("name", values.name.trim());
      formData.set("summary", values.summary ?? "");
      formData.set("description", values.description ?? "");
      formData.set("indications", values.indications ?? "");

      if (imageFile) {
        formData.set("image_file", imageFile);
      }

      // product.slug je pôvodný slug, slúži iba ako identifikátor
      const result = await updateTknProductBySlug(formData, product.slug);

      if (!result.ok) {
        toast.error(result.error);
        return;
      }

      toast.success(result.message);

      // Pri update formulár nečistíme, nech ostanú aktuálne hodnoty
      setImageFile(null);

      onSaved?.();
    } finally {
      setIsSubmitting(false);
    }
  }

  const isSubmitDisabled =
    initialValues === values ||
    isSubmitting ||
    !product?.slug ||
    !values.name.trim();

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-2xl border border-goldDark/15 bg-white p-5 md:p-6"
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <InputField
          label="Názov produktu"
          value={values.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />

        <div className="space-y-1">
          <label
            htmlFor="slug-input"
            className="text-sm font-medium text-greyMain/80"
          >
            Slug - identifikátor produktu, nedá sa meniť
          </label>

          <input
            id="slug-input"
            value={values.slug}
            disabled
            title="Slug - identifikátor produktu, nedá sa meniť"
            placeholder="Slug produktu"
            className="h-12 rounded-xl border border-goldDark/20 bg-gray-100 px-4 text-sm text-greyMain/70 outline-none transition focus:border-goldDark/35"
          />
        </div>
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

      <TextareaField
        label="Indikácie a použitie"
        value={values.indications}
        onChange={(e) => handleChange("indications", e.target.value)}
        rows={4}
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

      <div className="flex justify-end border-t border-goldDark/10 pt-4">
        <SubmitButton loading={isSubmitting} disabled={isSubmitDisabled}>
          Aktualizovať produkt
        </SubmitButton>
      </div>
    </form>
  );
}
