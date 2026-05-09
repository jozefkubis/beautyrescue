import { ADDRESS, EMAIL, PHONE } from "@/app/_lib/helpers";
import { FaFacebookSquare, FaInstagramSquare } from "react-icons/fa";
import ContactForm from "../forms/ContactForm";

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

          <p className="text-xs opacity-85 xl:text-sm">E-Mail: {EMAIL}</p>

          <p className="text-xs opacity-85 xl:text-sm">Telefón: {PHONE}</p>

          <div className="mt-4 flex gap-4">
            <a
              href="https://www.facebook.com/beautyrescueprofikozmetika"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook Beauty Rescue"
              title="Facebook Beauty Rescue"
            >
              <FaFacebookSquare
                size={42}
                className="cursor-pointer text-background/80 transition-all duration-200 hover:scale-110 hover:text-[#1877F2] active:scale-95"
              />
            </a>

            <a
              href="https://www.instagram.com/beautyrescue_profi/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram beautyrescue_profi"
              title="Instagram beautyrescue_profi"
            >
              <FaInstagramSquare
                size={42}
                className="cursor-pointer text-background/80 transition-all duration-200 hover:scale-110 hover:text-[#e1306c] active:scale-95"
              />
            </a>
          </div>
        </div>

        {/* Adresa */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold tracking-wide text-[#ffe2a5] xl:text-2xl">
            Adresa
          </h2>

          <p className="text-xs opacity-85 xl:text-sm">{ADDRESS}</p>

          {/* <p className="text-xs opacity-85 xl:text-sm">010 15 Žilina</p> */}
        </div>

        {/* Form */}
        <div
          id="kontakt"
          className="rounded-2xl border border-goldLight/25 bg-white/5 p-4 backdrop-blur-sm"
        >
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
  );
}
