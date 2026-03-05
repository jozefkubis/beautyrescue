"use client"

import Modal from "@/app/_components/Modal"
import Image from "next/image"
import { useState } from "react"

const INTERIOR_IMAGES = [
  {
    id: 1,
    src: "/images/studio1.jpg",
    alt: "Studio 1",
  },
  {
    id: 2,
    src: "/images/studio2.jpg",
    alt: "Studio 2",
  },
  {
    id: 3,
    src: "/images/studio3.jpg",
    alt: "Studio 3",
  },
]

export default function Interior() {
  const [activeImageId, setActiveImageId] = useState<number | null>(null)

  const activeImage = INTERIOR_IMAGES.find(
    (image) => image.id === activeImageId,
  )

  return (
    <>
      <div className="flex flex-wrap justify-around gap-4 px-6 text-center sm:px-10 2xl:px-44">
        {INTERIOR_IMAGES.map((image) => (
          <div
            key={image.id}
            className="relative overflow-hidden rounded-2xl border border-goldDark/30 bg-white shadow-md shadow-goldDark/10"
          >
            <button
              type="button"
              className="block"
              onClick={() => setActiveImageId(image.id)}
              aria-label={`Otvoriť ${image.alt} v modale`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={800}
                height={600}
                className="h-56 w-full object-cover transition-transform duration-300 ease-out hover:scale-105 hover:cursor-pointer sm:h-80"
                priority={false}
              />
            </button>
          </div>
        ))}
      </div>

      <Modal
        isOpen={Boolean(activeImage)}
        onClose={() => setActiveImageId(null)}
        title={activeImage?.alt}
        maxWidthClass="max-w-5xl"
      >
        {activeImage && (
          <Image
            src={activeImage.src}
            alt={activeImage.alt}
            width={1600}
            height={1100}
            className="h-auto w-full rounded-xl object-contain ring-2 ring-goldDark shadow-lg shadow-goldDark/20"
            priority={false}
          />
        )}
      </Modal>
    </>
  )
}
