"use client";

import imageCompression from "browser-image-compression";
import { useState } from "react";

type FileFieldProps = {
  label: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
  accept?: string;
  type?: "file";
};

// Komponent pre výber súboru so zjednoteným štýlom ako ostatné formulárové polia.
export default function FileField({
  label,
  value,
  onChange,
  readOnly = false,
  accept,
  type = "file",
}: FileFieldProps) {
  const [uploadHint, setUploadHint] = useState<string | null>(null);

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = e.target.files?.[0];

    setUploadHint(null);

    // Ked admin vyberie vacsi obrazok, skusime ho zmensit este pred odoslanim,
    // aby sa do storage bezne nedostavali zbytocne tazke subory.
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      const warningLimit = 1000 * 1024;

      if (selectedFile.size > warningLimit) {
        try {
          const compressedFile = await imageCompression(selectedFile, {
            maxSizeMB: 0.95,
            maxWidthOrHeight: 2200,
            useWebWorker: true,
            initialQuality: 0.82,
          });

          const nextFile =
            compressedFile.size < selectedFile.size
              ? compressedFile
              : selectedFile;

          const dataTransfer = new DataTransfer();
          dataTransfer.items.add(nextFile);
          e.target.files = dataTransfer.files;

          setUploadHint(
            nextFile.size < selectedFile.size
              ? `Obrázok mal viac ako 1000 KB, preto sme ho pred nahraním zmenšili na ${Math.round(nextFile.size / 1024)} KB.`
              : "Obrázok má viac ako 1000 KB. Skús menší súbor, aby upload prešiel bez problémov.",
          );
        } catch {
          setUploadHint(
            "Obrázok má viac ako 1000 KB a nepodarilo sa ho automaticky zmenšiť. Skús menší súbor.",
          );
        }
      }
    }

    onChange(e);
  }

  return (
    <label className="flex flex-col gap-2">
      <span className="text-xs font-semibold uppercase tracking-[0.14em] text-goldDark/80">
        {label}
      </span>

      {/* File input nesmie byť controlled cez value, preto ho nechávame bez value atribútu. */}
      <div className="rounded-xl border border-goldDark/20 bg-white px-4 py-3 text-sm text-gray-800 transition focus-within:border-goldDark/35 hover:cursor-pointer">
        <input
          type={type}
          onChange={handleChange}
          disabled={readOnly}
          accept={accept ?? "image/jpeg,image/png,image/webp"}
          className="block hover:cursor-pointer w-full text-sm text-gray-800 file:mr-3 file:rounded-full file:border-0 file:bg-[#fff6ee] file:px-4 file:py-2 file:text-xs file:font-semibold file:uppercase file:tracking-[0.12em] file:text-goldDark hover:file:bg-[#ffeedf] disabled:cursor-not-allowed disabled:opacity-60"
        />
      </div>

      <p className="text-xs text-greyMain/70">
        Odporúčaná veľkosť obrázka je do 1000 KB.
      </p>

      {value ? (
        <p className="text-xs text-greyMain/80">
          Aktuálny obrázok je nastavený.
        </p>
      ) : null}

      {uploadHint ? (
        <p className="text-xs text-goldDark">{uploadHint}</p>
      ) : null}
    </label>
  );
}
