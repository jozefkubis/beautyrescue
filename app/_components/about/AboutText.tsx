import type { AboutMainProps } from "@/app/_lib/data_services_all/data_about";

export default function AboutText({ aboutUsData }: AboutMainProps) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-gray-700 leading-7 text-sm 2xl:text-lg text-justify whitespace-pre-wrap">
        {aboutUsData.body_intro as string}
      </p>
      <p className="text-gray-700 leading-7 text-sm 2xl:text-lg text-justify whitespace-pre-wrap">
        {aboutUsData.body_services as string}
      </p>
      <p className="text-gray-700 leading-7 text-sm 2xl:text-lg text-justify whitespace-pre-wrap">
        {aboutUsData.body_philosophy as string}
      </p>
    </div>
  );
}
