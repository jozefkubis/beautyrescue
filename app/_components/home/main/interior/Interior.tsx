"use client"

import Modal from "@/app/_components/Modal"
import Image from "next/image"
import { useState } from "react"

const INTERIOR_IMAGES = [
  {
    id: 1,
    src: "/images/studio1.jpg",
    alt: "Interiér Beauty Rescue Žilina",
  },
  {
    id: 2,
    src: "/images/studio2.jpg",
    alt: "Kozmetický salón Beauty Rescue Žilina",
  },
  {
    id: 3,
    src: "/images/studio3.jpg",
    alt: "Beauty Rescue Žilina Hájik interiér",
  },
]

export default function Interior() {
  const [activeImageId, setActiveImageId] = useState<number | null>(null)

  const activeImage = INTERIOR_IMAGES.find(
    (image) => image.id === activeImageId,
  )

  return (
    <>
      <div className="fade-up flex flex-wrap justify-around gap-4 px-4 text-center sm:gap-5 sm:px-0 lg:px-20 2xl:px-44">
        {INTERIOR_IMAGES.map((image) => (
          <div
            key={image.id}
            className="relative aspect-4/3 w-full overflow-hidden rounded-2xl border border-goldDark/25 bg-white shadow-[0_12px_28px_rgba(157,116,16,0.14)] sm:w-[90%] lg:w-[30%]"
          >
            <button
              type="button"
              className="block h-full w-full min-h-52"
              onClick={() => setActiveImageId(image.id)}
              aria-label={`Otvoriť ${image.alt} v modale`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-300 ease-out hover:scale-105 hover:cursor-pointer"
                sizes="(max-width: 640px) 100vw, (max-width: 1280px) 48vw, 30vw"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-black/25 to-transparent" />
            </button>
          </div>
        ))}
      </div>

      <Modal
        isOpen={Boolean(activeImage)}
        onClose={() => setActiveImageId(null)}
        maxWidthClass="max-w-4xl"
      >
        {activeImage && (
          <div className="relative max-h-[80vh] w-auto">
            <Image
              src={activeImage.src}
              alt={activeImage.alt}
              width={1200}
              height={800}
              className="h-auto max-h-[80vh] w-auto rounded-xl object-contain ring-2 ring-goldDark/80 shadow-[0_14px_40px_rgba(157,116,16,0.35)]"
            />
          </div>
        )}
      </Modal>
    </>
  )
}
