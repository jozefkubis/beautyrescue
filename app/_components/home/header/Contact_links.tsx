import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { MdEmail, MdPhone } from "react-icons/md";

export default function Contact_links() {
  const contactLinks = [
    {
      type: "Email",
      value: "info@beautyrescue.sk",
      href: "mailto:info@beautyrescue.sk",
      icon: (
        <MdEmail className="rounded-full bg-linear-to-br from-[#fff5db] to-[#ffe8c7] p-2 text-3xl text-redDark ring-1 ring-goldLight/60 xl:text-4xl" />
      ),
    },
    {
      type: "Telefón",
      value: "0907 81 65 37",
      href: "tel:+421907816537",
      icon: (
        <MdPhone className="rounded-full bg-linear-to-br from-[#fff5db] to-[#ffe8c7] p-2 text-3xl text-redDark ring-1 ring-goldLight/60 xl:text-4xl" />
      ),
    },
    {
      type: "Adresa",
      value: "Korzo 8708/8 010 15 Žilina",
      href: "https://www.google.com/maps/place/Korzo+8707%2F8,+010+15+%C5%BDilina-H%C3%A1jik/@49.2114221,18.6921066,15z/data=!3m1!4b1!4m6!3m5!1s0x47145e949e06440b:0xb9e41028416cd805!8m2!3d49.2114096!4d18.7105605!16s%2Fg%2F11yfdg47mw?entry=ttu&g_ep=EgoyMDI2MDQwNS4wIKXMDSoASAFQAw%3D%3D",
      icon: (
        <FaMapMarkerAlt className="rounded-full bg-linear-to-br from-[#fff5db] to-[#ffe8c7] p-2 text-3xl text-redDark ring-1 ring-goldLight/60 xl:text-4xl" />
      ),
    },
  ];

  return (
    <div className="flex items-center gap-3 xl:gap-8">
      {contactLinks.map((link, index) => {
        const content = (
          <>
            {link.icon}
            <div className="flex flex-col items-start justify-center">
              <h4 className="text-sm font-semibold text-redDark xl:text-md">
                {link.type}
              </h4>
              <p className="text-xs font-medium text-greyMain/85 xl:text-[14px]">
                {link.value}
              </p>
            </div>
          </>
        );

        const className =
          "flex items-center gap-3 rounded-xl border border-goldDark/15 bg-white/70 px-3 py-2 shadow-sm shadow-goldDark/10 transition-all duration-300 hover:-translate-y-0.5 hover:border-goldDark/35 hover:bg-white active:translate-y-0.5 active:border-goldDark/15 active:bg-white/90";

        // Externé URL (https) otvoriť na novej karte, mailto/tel nechať bez target.
        if (link.href) {
          const isExternal = link.href.startsWith("http");
          return (
            <a
              key={index}
              href={link.href}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              className={`${className} hover:cursor-pointer`}
            >
              {content}
            </a>
          );
        }

        return (
          <div key={index} className={className}>
            {content}
          </div>
        );
      })}
      <div className="ml-1 flex items-center gap-1 rounded-xl border border-goldDark/15 bg-white/70 px-2 py-1 shadow-sm shadow-goldDark/10">
        <a
          href="https://www.facebook.com/beautyrescueprofikozmetika"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook Beauty Rescue"
          title="Facebook Beauty Rescue"
        >
          <FaFacebookSquare
            size={38}
            className="text-redDark transition-all duration-200 hover:cursor-pointer hover:scale-105 hover:text-[#1877F2] active:scale-95"
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
            size={38}
            className="text-redDark transition-all duration-200 hover:cursor-pointer hover:scale-105 hover:text-[#e1306c] active:scale-95"
          />
        </a>
      </div>
    </div>
  );
}
