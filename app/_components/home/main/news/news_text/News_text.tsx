import { brandFont } from "@/app/_components/fonts"

export default function News_text() {
  return (
    <div className="flex flex-col items-center px-6 lg:px-44 text-center">
      <h1
        className={`text-5xl 2xl:text-6xl py-8 lg:py-14 text-goldDark ${brandFont.className}`}
      >
        <span className="italic">
          <span className="text-6xl 2xl:text-7xl">N</span>ovinka!
        </span>
      </h1>
      <p className="text-gray-700 leading-8 text-sm xl:text-base 2xl:text-lg whitespace-pre-wrap">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor odit
        soluta tempora repellendus magnam ut incidunt vitae, deleniti nobis
        veniam quidem debitis, enim, fugiat molestias. Doloremque cum provident
        rem facere.
      </p>
      <p className="text-gray-700 leading-8 text-sm xl:text-base 2xl:text-lg whitespace-pre-wrap">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor odit
        soluta tempora repellendus magnam ut incidunt vitae, deleniti nobis
        veniam quidem debitis, enim, fugiat molestias. Doloremque cum provident
        rem facere.
      </p>
      <p className="text-gray-700 leading-8 text-sm xl:text-base 2xl:text-lg whitespace-pre-wrap">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor odit
        soluta tempora repellendus magnam ut incidunt vitae, deleniti nobis
        veniam quidem debitis, enim, fugiat molestias. Doloremque cum provident
        rem facere.
      </p>
      <p className="text-gray-700 leading-8 text-sm xl:text-base 2xl:text-lg whitespace-pre-wrap">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor odit
        soluta tempora repellendus magnam ut incidunt vitae, deleniti nobis
        veniam quidem debitis, enim, fugiat molestias. Doloremque cum provident
        rem facere.
      </p>
    </div>
  )
}
