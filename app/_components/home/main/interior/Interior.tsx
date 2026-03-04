import Image from "next/image"

export default function Interior() {
  return (
    <div className="flex justify-around px-20 2xl:px-44 text-center">
      <div className="relative overflow-hidden rounded-2xl border border-goldDark/30 bg-white shadow-md shadow-goldDark/10">
        <Image
          src="/images/studio1.jpg"
          alt="Studio 1"
          width={800}
          height={600}
          className="hover:cursor-pointer h-56 w-full object-cover hover:scale-105 transition-transform duration-300 ease-out sm:h-80"
          priority={false}
        />
      </div>
      <div className="relative overflow-hidden rounded-2xl border border-goldDark/30 bg-white shadow-md shadow-goldDark/10">
        <Image
          src="/images/studio2.jpg"
          alt="Studio 2"
          width={800}
          height={600}
          className="hover:cursor-pointer h-56 w-full object-cover hover:scale-105 transition-transform duration-300 ease-out sm:h-80"
          priority={false}
        />
      </div>
      <div className="relative overflow-hidden rounded-2xl border border-goldDark/30 bg-white shadow-md shadow-goldDark/10">
        <Image
          src="/images/studio3.jpg"
          alt="Studio 3"
          width={800}
          height={600}
          className="hover:cursor-pointer h-56 w-full object-cover hover:scale-105 transition-transform duration-300 ease-out sm:h-80"
          priority={false}
        />
      </div>
    </div>
  )
}
