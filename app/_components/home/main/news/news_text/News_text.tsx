import { brandFont } from "@/app/_components/fonts"

export default function News_text() {
  return (
    <div className="flex flex-col items-center px-6 lg:px-44 text-center">
      <h1
        className={`italic text-5xl 2xl:text-6xl py-8 lg:py-18 font-semibold text-goldDark ${brandFont.className}`}
      >
        <span className="italic">
          <span className="text-6xl 2xl:text-7xl">N</span>ovinka!
        </span>
      </h1>
      <p className="text-grey-700 line leading-8 text-sm xl:text-base 2xl:text-lg">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor odit
        soluta tempora repellendus magnam ut incidunt vitae, deleniti nobis
        veniam quidem debitis, enim, fugiat molestias. Doloremque cum provident
        rem facere.
      </p>
      <p className="text-grey-700 leading-8 text-sm xl:text-base 2xl:text-lg">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor odit
        soluta tempora repellendus magnam ut incidunt vitae, deleniti nobis
        veniam quidem debitis, enim, fugiat molestias. Doloremque cum provident
        rem facere.
      </p>
      <p className="text-grey-700 leading-8 text-sm xl:text-base 2xl:text-lg">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor odit
        soluta tempora repellendus magnam ut incidunt vitae, deleniti nobis
        veniam quidem debitis, enim, fugiat molestias. Doloremque cum provident
        rem facere.
      </p>
      <p className="text-grey-700 leading-8 text-sm xl:text-base 2xl:text-lg">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor odit
        soluta tempora repellendus magnam ut incidunt vitae, deleniti nobis
        veniam quidem debitis, enim, fugiat molestias. Doloremque cum provident
        rem facere.
      </p>
    </div>
  )
}
