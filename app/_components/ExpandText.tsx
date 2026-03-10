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
          expanded ? "max-h-500 opacity-100" : "max-h-40 opacity-90"
        }`}
      >
        {children}
      </div>

      <button
        type="button"
        onClick={() => setExpanded((prev) => !prev)}
        className="mt-3 inline-flex rounded-full border border-goldDark/30 bg-[#fff4e6] px-4 py-1.5 text-sm font-semibold italic text-goldDark transition duration-200 hover:cursor-pointer hover:bg-[#ffe8cf] md:hidden"
      >
        {expanded ? "Späť" : "Čítať viac..."}
      </button>
    </div>
  )
}
