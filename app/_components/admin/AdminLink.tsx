import Link from "next/link"

export default function AdminLink() {
  return (
    <Link
      href="/admin"
      className="
    flex items-center justify-center p-1 text-sm 2xl:text-lg
    transition-all duration-300
    hover:cursor-pointer group
  "
      aria-label="Admin panel"
      title="Admin panel"
    >
      <span className="inline-block font-bold text-[#ffd982]">
        {["A", "d", "m", "i", "n"].map((char, i) => (
          <span
            key={i}
            className="
          inline-block
          transition-all duration-300
          drop-shadow-[0_0_6px_rgba(255,217,130,0.4)]
        "
            style={{
              transitionDelay: `${i * 40}ms`,
            }}
          >
            <span
              className="
            inline-block
            group-hover:-translate-y-[2px]
            group-hover:text-[#fff3c4]
            group-hover:drop-shadow-[0_0_12px_rgba(255,217,130,0.9)]
            transition-all duration-300
          "
            >
              {char}
            </span>
          </span>
        ))}
      </span>
    </Link>
  )
}
