"use client"

import { FaFacebookSquare, FaInstagramSquare } from "react-icons/fa"
import ContactForm from "../forms/ContactForm"

export default function Footer() {
  return (
    <footer className="mt-15 w-full border-t border-goldLight/25 bg-linear-to-b from-[#2f2321] via-[#2b1f1f] to-[#201616] text-background lg:mt-30">
      {/* container */}
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-8 md:grid-cols-2 lg:grid-cols-[1fr_1fr_2fr] lg:px-30 lg:py-20">
        {/* Kontakt */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold tracking-wide text-[#ffe2a5] xl:text-2xl">
            Kontakt
          </h2>

          <p className="text-xs opacity-85 xl:text-sm">
            E-Mail: info@beautyrescue.sk
          </p>

          <p className="text-xs opacity-85 xl:text-sm">
            Telefón: +421 907 81 65 37
          </p>

          <div className="flex gap-4 mt-4">
            <FaFacebookSquare
              size={42}
              className="cursor-pointer text-background/80 transition-all duration-200 hover:scale-110 hover:text-[#1877F2] active:scale-95"
            />

            <FaInstagramSquare
              size={42}
              className="cursor-pointer text-background/80 transition-all duration-200 hover:scale-110 hover:text-[#e1306c] active:scale-95"
            />
          </div>
        </div>

        {/* Adresa */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold tracking-wide text-[#ffe2a5] xl:text-2xl">
            Adresa
          </h2>

          <p className="text-xs opacity-85 xl:text-sm">Korzo 8708/8</p>

          <p className="text-xs opacity-85 xl:text-sm">010 15 Žilina</p>
        </div>

        {/* Form */}
        <div className="rounded-2xl border border-goldLight/25 bg-white/5 p-4 backdrop-blur-sm">
          <ContactForm />
        </div>
      </div>

      {/* bottom */}
      <div className="border-t border-goldLight/20">
        <div className="mx-auto max-w-7xl px-6 py-6 text-xs opacity-70 xl:text-sm">
          © 2021 BEAUTY RESCUE, s. r. o. Všetky práva vyhradené
        </div>
      </div>
    </footer>
  )
}
