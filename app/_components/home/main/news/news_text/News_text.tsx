import { brandFont } from "@/app/_components/fonts"

export default function News_text() {
  return (
    <div className="section-shell fade-up mx-3 mt-8 flex flex-col items-center px-4 text-center sm:mx-4 sm:px-6 lg:mx-20 lg:mt-10 lg:px-44 2xl:mx-44">
      <h1
        className={`premium-title py-6 text-4xl sm:text-5xl lg:py-14 2xl:text-6xl ${brandFont.className}`}
      >
        <span className="italic">
          <span className="text-5xl sm:text-6xl 2xl:text-7xl">N</span>ovinka!
        </span>
      </h1>
      <p className="whitespace-pre-wrap text-sm leading-7 text-greyMain/85 sm:leading-8 xl:text-base 2xl:text-lg">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor odit
        soluta tempora repellendus magnam ut incidunt vitae, deleniti nobis
        veniam quidem debitis, enim, fugiat molestias. Doloremque cum provident
        rem facere.
      </p>
      <p className="whitespace-pre-wrap text-sm leading-7 text-greyMain/85 sm:leading-8 xl:text-base 2xl:text-lg">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor odit
        soluta tempora repellendus magnam ut incidunt vitae, deleniti nobis
        veniam quidem debitis, enim, fugiat molestias. Doloremque cum provident
        rem facere.
      </p>
      <p className="whitespace-pre-wrap text-sm leading-7 text-greyMain/85 sm:leading-8 xl:text-base 2xl:text-lg">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor odit
        soluta tempora repellendus magnam ut incidunt vitae, deleniti nobis
        veniam quidem debitis, enim, fugiat molestias. Doloremque cum provident
        rem facere.
      </p>
      <p className="pb-6 whitespace-pre-wrap text-sm leading-7 text-greyMain/85 sm:pb-8 sm:leading-8 xl:text-base 2xl:text-lg">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor odit
        soluta tempora repellendus magnam ut incidunt vitae, deleniti nobis
        veniam quidem debitis, enim, fugiat molestias. Doloremque cum provident
        rem facere.
      </p>
    </div>
  )
}
