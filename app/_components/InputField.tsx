// Komponent pre textové pole (input)
// Komentáre v slovenčine
import React from "react";

type InputFieldProps = {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
};

export default function InputField({
  label,
  value,
  onChange,
  readOnly = false,
}: InputFieldProps) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-xs font-semibold uppercase tracking-[0.14em] text-goldDark/80">
        {label}
      </span>
      <input
        type="text"
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        className="h-12 rounded-xl border border-goldDark/20 bg-white px-4 text-sm text-gray-800 outline-none transition focus:border-goldDark/35"
      />
    </label>
  );
}
