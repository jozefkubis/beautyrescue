export default function Jalupro_hmw_text({ data }: { data: any }) {
  return (
    <ul className="list-disc space-y-2 pl-6 text-sm 2xl:text-lg marker:text-gray-500">
      {(data.content.paragraphs as string[]).map((paragraph, index) => (
        <li key={index} className="text-gray-700 leading-8 whitespace-pre-wrap">
          {paragraph}
        </li>
      ))}
    </ul>
  )
}
