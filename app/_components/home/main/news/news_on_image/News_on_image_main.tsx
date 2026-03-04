"use client" // musí byť, lebo používame animácie na klientovi

import { motion } from "framer-motion" // import z framer-motion
import Image from "next/image"
import { useState } from "react"
import EcgLine from "../ecg_effect/EcgLine"

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
  const [showEcg, setShowEcg] = useState(false)

  return (
    <section className="relative w-full aspect-16/6 overflow-hidden">
      {/* Pozadie */}
      <Image
        src="/images/imageHome.jpg"
        alt="Beauty Rescue"
        fill
        priority
        className="object-cover object-right"
      />

      {/* Tmavý overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-background via-transparent to-background" />
      {/* Prechod dole */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
      <div className="absolute inset-0 bg-gradient-to-tl from-transparent via-transparent to-background" />

      {/* Text – ostáva tak ako máš */}
      <motion.div
        className="absolute inset-0 flex flex-col justify-center items-center text-center px-4"
        variants={textVariants}
        initial="hidden"
        animate="visible"
        onAnimationComplete={() => setShowEcg(true)}
      >
        <h1 className="text-goldDark text-3xl xl:text-5xl font-semibold italic mb-6">
          Novinky
        </h1>
        <h1 className="text-goldDark text-3xl xl:text-5xl font-semibold italic mb-6">
          Novinky
        </h1>
        <h1 className="text-goldDark text-3xl xl:text-5xl font-semibold italic mb-6">
          Novinky
        </h1>
      </motion.div>

      {/* EKG – cez celú šírku, fixne nad spodkom */}
      <div className="pointer-events-none absolute inset-x-0 bottom-[6%] 2xl:bottom-[12%]">
        {showEcg && <EcgLine />}
      </div>
    </section>
  )
}
