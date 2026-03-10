import Image from "next/image"
import Link from "next/link"

export default function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 hover:cursor-pointer hover:bg-gray-100 rounded-lg p-2 transition-colors duration-300"
    >
      <div className="">
        <Image
          src="/images/logo_br.png"
          alt="logo_br.png"
          width={88}
          height={88}
        />
      </div>
      <div className="flex flex-col -space-y-2">
        <h1 className="text-3xl lg:text-4xl font-semibold bg-clip-text text-redDark">
          BEAUTY
        </h1>
        <h1 className="text-3xl lg:text-4xl font-semibold bg-clip-text text-redDark">
          RESCUE
        </h1>
      </div>
    </Link>
  )
}
