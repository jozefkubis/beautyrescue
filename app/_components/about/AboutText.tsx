import { dataAboutUs } from "@/app/_lib/data_services/data_about_us"

export default function AboutText() {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-gray-700 leading-8 text-sm 2xl:text-lg text-justify">
        {dataAboutUs.content.bodyIntro as string}
      </p>
      <p className="text-gray-700 leading-8 text-sm 2xl:text-lg text-justify">
        {dataAboutUs.content.bodyTeam as string}
      </p>
      <p className="text-gray-700 leading-8 text-sm 2xl:text-lg text-justify">
        {dataAboutUs.content.bodyServices as string}
      </p>
      <p className="text-gray-700 leading-8 text-sm 2xl:text-lg text-justify">
        {dataAboutUs.content.bodyPhilosophy as string}
      </p>
    </div>
  )
}
