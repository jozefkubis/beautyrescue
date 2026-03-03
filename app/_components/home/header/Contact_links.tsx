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
        <MdEmail className="text-redMain text-3xl xl:text-4xl rounded-full p-2 ring-2 ring-redMain hover:cursor-pointer" />
      ),
    },
    {
      type: "Telefón",
      value: "0907 81 65 37",
      icon: (
        <MdPhone className="text-redMain text-3xl xl:text-4xl rounded-full p-2 ring-2 ring-redMain hover:cursor-pointer" />
      ),
    },
    {
      type: "Adresa",
      value: "Korzo 8708/8 010 15 Žilina",
      icon: (
        <FaMapMarkerAlt className="text-redMain text-3xl xl:text-4xl rounded-full p-2 ring-2 ring-redMain hover:cursor-pointer" />
      ),
    },
  ]

  return (
    <div className="flex items-center gap-10">
      {contactLinks.map((link, index) => (
        <div
          key={index}
          className="flex items-center gap-3 hover:bg-gray-100 rounded-lg p-2 transition-colors duration-300"
        >
          {link.icon}
          <div className="flex flex-col items-start justify-center">
            <h4 className="text-redMain font-semibold text-sm xl:text-md hover:cursor-pointer">
              {link.type}
            </h4>
            <p className="font-medium text-gray-700 text-xs xl:text-[14px]">
              {link.value}
            </p>
          </div>
        </div>
      ))}
      <div className="flex items-center gap-1">
        <FaFacebookSquare
          size={48}
          className="text-redMain hover:cursor-pointer hover:scale-102 transition-transform duration-200 hover:text-blue-500 active:scale-98"
        />
        <FaInstagramSquare
          size={48}
          className="text-redMain hover:cursor-pointer hover:scale-102 transition-transform duration-200 hover:text-orange-600 active:scale-98"
        />
      </div>
    </div>
  )
}
