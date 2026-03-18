import { dataAboutUs } from "@/app/_lib/data_services/data_about_us"

export default function AboutText() {
  return (
    <div>
      <p className="text-gray-700 leading-8 text-sm 2xl:text-lg whitespace-pre-wrap text-justify">
        {dataAboutUs.body}
      </p>
    </div>
  )
}
