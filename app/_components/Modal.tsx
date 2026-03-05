"use client"

import { useEffect, type ReactNode } from "react"
import { IoIosClose } from "react-icons/io"

type ModalProps = {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  title?: string
  closeOnBackdrop?: boolean
  closeOnEscape?: boolean
  showCloseButton?: boolean
  maxWidthClass?: string
}

const OVERLAY_STYLE =
  "fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs"
const PANEL_BASE_STYLE = "w-full rounded-xl bg-transparent p-6"

export default function Modal({
  isOpen,
  onClose,
  children,
  title,
  closeOnBackdrop = true,
  closeOnEscape = true,
  showCloseButton = true,
  maxWidthClass = "max-w-2xl",
}: ModalProps) {
  useEffect(() => {
    if (!isOpen || !closeOnEscape) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [isOpen, closeOnEscape, onClose])

  return (
    <div
      className={`${OVERLAY_STYLE} transition-opacity duration-500 ease-out ${
        isOpen
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0"
      }`}
      onClick={closeOnBackdrop ? onClose : undefined}
      role="presentation"
    >
      <div
        className={`${PANEL_BASE_STYLE} ${maxWidthClass} transition-transform duration-500 ease-out ${
          isOpen ? "translate-y-0 scale-100" : "translate-y-8 scale-95"
        }`}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={title ?? "Modal"}
      >
        {(title || showCloseButton) && (
          <div className="w-full flex justify-end">
            {/* {title ? (
              <h2 className="text-lg font-semibold leading-tight">{title}</h2>
            ) : (
              <span />
            )} */}

            {showCloseButton && (
              <button
                type="button"
                onClick={onClose}
                className="rounded-md text-sm text-goldDark"
                aria-label="Close modal"
              >
                <IoIosClose
                  size={40}
                  className="hover:cursor-pointer hover:scale-105 transition-transform duration-200 ease-out"
                />
              </button>
            )}
          </div>
        )}

        <div>{children}</div>
      </div>
    </div>
  )
}
