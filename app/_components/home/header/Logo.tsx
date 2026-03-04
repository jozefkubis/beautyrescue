import Image from "next/image"

export default function Logo() {
  return (
    <div className="flex items-center gap-1 hover:cursor-pointer hover:bg-gray-100 rounded-lg p-2 transition-colors duration-300">
      <div>
        <Image src="/images/butterfly.png" alt="logo" width={88} height={88} />
      </div>
      <div className="flex flex-col -space-y-2 mt-2">
        <h1 className="text-3xl font-semibold text-goldDark">BEAUTY</h1>
        <h1 className="text-3xl font-semibold text-goldDark">RESCUE</h1>
      </div>
    </div>
  )
}
