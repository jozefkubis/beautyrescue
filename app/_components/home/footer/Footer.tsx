"use client"

import { FaFacebookSquare, FaInstagramSquare } from "react-icons/fa"
import ContactForm from "../../forms/ContactForm"

export default function Footer() {
  return (
    <footer className="w-full bg-greyMain text-background mt-30">
      {/* container */}
      <div className="max-w-6xl mx-auto px-6 lg:px-30 py-20 grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {/* Kontakt */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl xl:text-2xl font-semibold tracking-wide">
            Kontakt
          </h2>

          <p className="text-xs xl:text-sm opacity-80">
            E-Mail: info@beautyrescue.sk
          </p>

          <p className="text-xs xl:text-sm opacity-80">
            Telefón: +421 907 81 65 37
          </p>

          <div className="flex gap-4 mt-4">
            <FaFacebookSquare
              size={42}
              className="text-background/80 hover:text-blue-500 cursor-pointer transition-all duration-200 hover:scale-110 active:scale-95"
            />

            <FaInstagramSquare
              size={42}
              className="text-background/80 hover:text-orange-600 cursor-pointer transition-all duration-200 hover:scale-110 active:scale-95"
            />
          </div>
        </div>

        {/* Adresa */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl xl:text-2xl font-semibold tracking-wide">
            Adresa
          </h2>

          <p className="text-xs xl:text-sm opacity-80">Korzo 8708/8</p>

          <p className="text-xs xl:text-sm opacity-80">010 15 Žilina</p>
        </div>

        {/* Form */}
        <ContactForm />
      </div>

      {/* bottom */}
      <div className="border-t border-goldLight/20">
        <div className="max-w-6xl text-xs mx-auto px-6 py-6 xl:text-sm opacity-70">
          © 2021 BEAUTY RESCUE, s. r. o. Všetky práva vyhradené
        </div>
      </div>
    </footer>
  )
}
