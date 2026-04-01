// Komponent pre tlačidlo submit
// Komentáre v slovenčine
import React from "react";

type SubmitButtonProps = {
  loading: boolean;
  disabled: boolean;
  children: React.ReactNode;
};

export default function SubmitButton({
  loading,
  disabled,
  children,
}: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className="inline-flex h-11 items-center justify-center rounded-full bg-linear-to-r from-redMain to-redDark px-6 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(190,18,60,0.22)] transition duration-300 hover:-translate-y-0.5 hover:cursor-pointer hover:shadow-[0_14px_30px_rgba(190,18,60,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-redMain/25 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
    >
      {loading ? "Ukladám..." : children}
    </button>
  );
}
