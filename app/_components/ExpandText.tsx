"use client"

import { useState } from "react"

type ExpandTextProps = {
  children: React.ReactNode
}

export default function ExpandText({ children }: ExpandTextProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="md:max-h-none">
      <div
        className={`overflow-hidden transition-all duration-1000 ease-in-out md:max-h-none ${
          expanded ? "max-h-[2000px] opacity-100" : "max-h-40 opacity-90"
        }`}
      >
        {children}
      </div>

      <button
        type="button"
        onClick={() => setExpanded((prev) => !prev)}
        className="md:hidden mt-3 font-semibold text-goldDark cursor-pointer text-sm italic"
      >
        {expanded ? "Späť" : "Čítať viac..."}
      </button>
    </div>
  )
}
