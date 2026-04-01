// Komponent pre checkbox prepínač (aktivita)
// Komentáre v slovenčine
import React from "react";

type CheckboxFieldProps = {
  labelActive: string;
  labelInactive: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
};

export default function CheckboxField({
  labelActive,
  labelInactive,
  checked,
  onChange,
  disabled = false,
}: CheckboxFieldProps) {
  return (
    <label className="flex items-center gap-3 cursor-pointer w-full justify-between">
      <span className="text-xs font-semibold uppercase tracking-[0.14em] text-goldDark/80">
        {checked ? labelActive : labelInactive}
      </span>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="sr-only"
      />
      <div
        className={`flex h-6 w-10 items-center rounded-full p-1 transition ${
          checked ? "bg-goldLight" : "bg-gray-400"
        }`}
      >
        <div
          className={`h-4 w-4 rounded-full bg-white shadow-md transform transition ${
            checked ? "translate-x-4" : "translate-x-0"
          }`}
        />
      </div>
    </label>
  );
}
