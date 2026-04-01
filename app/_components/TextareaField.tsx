// Komponent pre textarea
// Komentáre v slovenčine
import React from "react";

type TextareaFieldProps = {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  readOnly?: boolean;
  rows?: number;
};

export default function TextareaField({
  label,
  value,
  onChange,
  readOnly = false,
  rows = 6,
}: TextareaFieldProps) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-xs font-semibold uppercase tracking-[0.14em] text-goldDark/80">
        {label}
      </span>
      <textarea
        rows={rows}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        className="w-full rounded-xl border border-goldDark/20 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-goldDark/35"
      />
    </label>
  );
}
