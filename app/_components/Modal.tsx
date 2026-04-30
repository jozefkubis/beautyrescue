"use client";

import { useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { IoIosClose } from "react-icons/io";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;
  showCloseButton?: boolean;
  maxWidthClass?: string;
};

export default function Modal({
  isOpen,
  onClose,
  children,
  closeOnBackdrop = true,
  closeOnEscape = true,
  showCloseButton = true,
  maxWidthClass = "max-w-2xl",
}: ModalProps) {
  useEffect(() => {
    if (!isOpen || !closeOnEscape) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, closeOnEscape, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex min-h-dvh w-screen items-center justify-center bg-[#1c1214]/70 px-5 backdrop-blur-sm"
      onClick={closeOnBackdrop ? onClose : undefined}
      role="presentation"
    >
      <div
        className={`relative p-5 ${maxWidthClass} rounded-xl bg-transparent`}
        onClick={(event) => event.stopPropagation()}
      >
        {showCloseButton && (
          <button
            type="button"
            onClick={onClose}
            className="absolute -right-4 -top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-goldDark/35 bg-goldLight text-goldDark shadow-lg hover:cursor-pointer hover:border-goldDark hover:bg-goldDark hover:text-goldLight transition-colors duration-200 active:scale-95"
            aria-label="Close modal"
          >
            <IoIosClose size={36} />
          </button>
        )}

        {children}
      </div>
    </div>,
    document.body,
  );
}
