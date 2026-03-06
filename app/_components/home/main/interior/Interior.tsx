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
      <div className="flex flex-wrap justify-around gap-4 px-6 lg:px-20 text-center sm:px-0 2xl:px-44">
        {INTERIOR_IMAGES.map((image) => (
          <div
            key={image.id}
            className="relative aspect-4/3 w-[90%] overflow-hidden rounded-2xl border border-goldDark/30 bg-white shadow-md shadow-goldDark/10 lg:w-[30%]"
          >
            <button
              type="button"
              className="block h-full w-full"
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
              className="h-auto max-h-[80vh] w-auto rounded-xl object-contain ring-2 ring-goldDark shadow-lg shadow-goldDark/20"
            />
          </div>
        )}
      </Modal>
    </>
  )
}
