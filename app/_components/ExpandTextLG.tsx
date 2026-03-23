"use client"

import { useState } from "react"

type ExpandTextProps = {
  children: React.ReactNode
}

export default function ExpandTextLG({ children }: ExpandTextProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="w-full">
      {/* Text */}
      <div
        className={`
          overflow-hidden transition-all duration-1000 ease-in-out
          ${expanded ? "lg:max-h-500" : "lg:max-h-100"}
        `}
      >
        {children}
      </div>

      {/* Button */}
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="mt-3 hidden rounded-full border border-goldDark/30 bg-[#fff4e6] px-4 py-1.5 text-xs font-semibold italic text-goldDark transition duration-200 hover:cursor-pointer hover:bg-[#ffe8cf] 2xl:text-sm lg:inline-block"
      >
        {expanded ? "Zobraziť menej" : "Zobraziť viac..."}
      </button>
    </div>
  )
}
