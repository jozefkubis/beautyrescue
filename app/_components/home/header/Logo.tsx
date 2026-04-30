import Image from "next/image"
import Link from "next/link"

export default function Logo() {
  return (
    <Link
      href="/"
      className="group flex items-center gap-2 rounded-xl border border-goldDark/20 bg-white/70 p-2.5 shadow-sm shadow-goldDark/10 transition-all duration-300 hover:-translate-y-0.5 hover:cursor-pointer hover:border-goldDark/35 hover:shadow-md hover:shadow-goldDark/20 active:translate-y-0.5 active:border-goldDark/15 active:shadow-sm active:shadow-goldDark/10"
    >
      <div className="">
        <Image
          src="/images/logo_br_redMain.png"
          alt="Beauty Rescue Žilina logo"
          width={88}
          height={88}
          className="rounded-full ring-2 ring-goldLight/70"
        />
      </div>
      <div className="flex flex-col -space-y-2">
        <span className="text-3xl lg:text-4xl font-semibold tracking-tight text-redDark transition-colors duration-300 group-hover:text-redMain">
          BEAUTY
        </span>
        <span className="text-3xl lg:text-4xl font-semibold tracking-tight text-goldDark transition-colors duration-300 group-hover:text-goldLight">
          RESCUE
        </span>
      </div>
    </Link>
  )
}
