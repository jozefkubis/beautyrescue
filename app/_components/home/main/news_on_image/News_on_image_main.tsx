"use client" // musí byť, lebo používame animácie na klientovi

import { motion } from "framer-motion" // import z framer-motion
import Image from "next/image"

// definujeme "stavy" animácie
const textVariants = {
  hidden: {
    opacity: 0,
    x: -800,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8, // stačí duration, ease môžeme vynechať
    },
  },
}

export default function News_on_image_main() {
  return (
    <section className="relative w-full h-150 overflow-hidden">
      {/* Obrázok na pozadí */}
      <Image
        src="/images/imageHome.jpg"
        alt="Beauty Rescue"
        fill
        priority
        className="object-cover object-right"
      />

      {/* Tmavý overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Text s animáciou zľava */}
      <motion.div
        className="absolute inset-0 flex flex-col justify-center items-center text-center px-4"
        variants={textVariants} // povieme, aké stavy animácie používame
        initial="hidden" // štart – hidden
        animate="visible" // cieľ – visible (spustí animáciu po mountnutí)
      >
        <h1 className="text-white text-5xl font-semibold italic mb-6">
          Novinky
        </h1>
        <h1 className="text-white text-5xl font-semibold italic mb-6">
          Novinky
        </h1>
        <h1 className="text-white text-5xl font-semibold italic mb-6">
          Novinky
        </h1>
      </motion.div>
    </section>
  )
}
