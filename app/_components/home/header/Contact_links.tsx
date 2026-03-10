import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaMapMarkerAlt,
} from "react-icons/fa"
import { MdEmail, MdPhone } from "react-icons/md"

export default function Contact_links() {
  const contactLinks = [
    {
      type: "Email",
      value: "info@beautyrescue.sk",
      icon: (
        <MdEmail className="rounded-full bg-linear-to-br from-[#fff5db] to-[#ffe8c7] p-2 text-3xl text-redDark ring-1 ring-goldLight/60 xl:text-4xl" />
      ),
    },
    {
      type: "Telefón",
      value: "0907 81 65 37",
      icon: (
        <MdPhone className="rounded-full bg-linear-to-br from-[#fff5db] to-[#ffe8c7] p-2 text-3xl text-redDark ring-1 ring-goldLight/60 xl:text-4xl" />
      ),
    },
    {
      type: "Adresa",
      value: "Korzo 8708/8 010 15 Žilina",
      icon: (
        <FaMapMarkerAlt className="rounded-full bg-linear-to-br from-[#fff5db] to-[#ffe8c7] p-2 text-3xl text-redDark ring-1 ring-goldLight/60 xl:text-4xl" />
      ),
    },
  ]

  return (
    <div className="flex items-center gap-6 xl:gap-8">
      {contactLinks.map((link, index) => (
        <div
          key={index}
          className="flex items-center gap-3 rounded-xl border border-goldDark/15 bg-white/70 px-3 py-2 shadow-sm shadow-goldDark/10 transition-all duration-300 hover:-translate-y-0.5 hover:border-goldDark/35 hover:bg-white"
        >
          {link.icon}
          <div className="flex flex-col items-start justify-center">
            <h4 className="text-sm font-semibold text-redDark xl:text-md">
              {link.type}
            </h4>
            <p className="text-xs font-medium text-greyMain/85 xl:text-[14px]">
              {link.value}
            </p>
          </div>
        </div>
      ))}
      <div className="ml-1 flex items-center gap-1 rounded-xl border border-goldDark/15 bg-white/70 px-2 py-1 shadow-sm shadow-goldDark/10">
        <FaFacebookSquare
          size={38}
          className="text-redDark transition-all duration-200 hover:cursor-pointer hover:scale-105 hover:text-[#1877F2] active:scale-95"
        />
        <FaInstagramSquare
          size={38}
          className="text-redDark transition-all duration-200 hover:cursor-pointer hover:scale-105 hover:text-[#e1306c] active:scale-95"
        />
      </div>
    </div>
  )
}
