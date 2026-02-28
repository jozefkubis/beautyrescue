import Link from "next/link"

export default function Navigation() {
  const navigationLinks = [
    {
      name: "O nás",
      href: "/about",
    },
    {
      name: "Kozmetika",
      href: "/cosmetics",
    },
    {
      name: "Lekárska kozmetika",
      href: "/medical-cosmetics",
    },
    {
      name: "Lekárska akupunktúra",
      href: "/acupuncture",
    },
    {
      name: "Masáže a Saunový detox",
      href: "/massage-and-sauna-detox",
    },
    {
      name: "Cenník",
      href: "/pricing",
    },
  ]

  return (
    <div className="flex justify-center absolute top-34 mx-auto w-full z-10">
      <div className="flex items-center bg-redMain gap-6 px-30 py-4 rounded-l-md">
        {navigationLinks.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className="text-background hover:text-gray-900"
          >
            {link.name}
          </Link>
        ))}
      </div>
      <div className="bg-greyMain text-background flex items-center justify-center px-6 py-4 rounded-r-md">
        <h4>Kontakt</h4>
      </div>
    </div>
  )
}
