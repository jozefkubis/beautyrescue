"use client"

import { useState } from "react"

type ExpandTextProps = {
  text: string
}

export default function ExpandText({ text }: ExpandTextProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="md:max-h-none">
      <div
        className={`overflow-hidden transition-all duration-1000 ease-in-out md:max-h-none ${
          expanded ? "max-h-[2000px] opacity-100" : "max-h-40 opacity-90"
        }`}
      >
        <p className="text-gray-700 leading-8 text-sm xl:text-base 2xl:text-lg whitespace-pre-wrap">
          {text}
        </p>
      </div>

      <button
        type="button"
        onClick={() => setExpanded((prev) => !prev)}
        className="md:hidden mt-3 font-semibold text-goldDark cursor-pointer text-sm italic"
      >
        {expanded ? "Späť" : "Čítať viac"}
      </button>
    </div>
  )
}
