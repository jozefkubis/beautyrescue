// Komponent pre tlačidlo Undo
// Komentáre v slovenčine
import React from "react";

type UndoButtonProps = {
  onClick: () => void;
  disabled: boolean;
  children: React.ReactNode;
};

export default function UndoButton({
  onClick,
  disabled,
  children,
}: UndoButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="inline-flex h-11 items-center justify-center rounded-full border border-goldDark/15 bg-white px-5 text-sm font-semibold text-goldDark transition duration-300 hover:-translate-y-0.5 hover:cursor-pointer hover:border-goldDark/30 hover:bg-[#fffaf2] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
    >
      {children}
    </button>
  );
}
