export default function Jalupro_super_hydro_text({ data }: { data: any }) {
  return (
    <div className="space-y-6 text-sm 2xl:text-lg">
      <ul className="list-disc space-y-2 pl-6 marker:text-gray-500">
        {(data.content.topBullets as string[]).map((paragraph, index) => (
          <li
            key={index}
            className="text-gray-700 leading-8 whitespace-pre-wrap"
          >
            {paragraph}
          </li>
        ))}
      </ul>

      <p className="text-gray-700 leading-8 whitespace-pre-wrap">
        {data.summary}
      </p>

      <ul className="list-disc space-y-2 pl-6 marker:text-gray-500">
        {(data.content.bottomBullets as string[]).map((paragraph, index) => (
          <li
            key={index}
            className="text-gray-700 leading-8 whitespace-pre-wrap"
          >
            {paragraph}
          </li>
        ))}
      </ul>
    </div>
  )
}
