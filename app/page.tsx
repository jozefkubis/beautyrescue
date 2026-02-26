import Image from "next/image"

export default function Page() {
  return (
    <div className="flex w-full h-screen items-center justify-center font-semibold text-7xl text-redMain">
      <Image
        src="/logo.png"
        alt="logo"
        width={90}
        height={90}
        className="mr-4"
      />
      BEAUTYRESCUE
    </div>
  )
}
