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
          ${expanded ? "lg:max-h-[2000px]" : "lg:max-h-[300px]"}
        `}
      >
        {children}
      </div>

      {/* Button */}
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="hidden lg:inline-block mt-3 text-goldDark italic hover:cursor-pointer text-xs 2xl:text-sm font-semibold"
      >
        {expanded ? "Zobraziť menej" : "Zobraziť viac..."}
      </button>
    </div>
  )
}
