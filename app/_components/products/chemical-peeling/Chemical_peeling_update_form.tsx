"use client"

type ChemicalPeelingData = {
  slug?: string
  name?: string
  summary?: string
  is_active?: boolean
  metadata?: {
    quoteAuthor?: string
  }
  content?: {
    bodyIntro?: string
    bodyTeam?: string
    bodyServices?: string
    bodyPhilosophy?: string
  }
}

type ChemicalPeelingUpdateFormProps = {
  chemicalPeelingData: ChemicalPeelingData | null
  isAdmin?: boolean
}

export default function Chemical_peeling_update_form({
  chemicalPeelingData,
  isAdmin,
}: ChemicalPeelingUpdateFormProps) {

console.log("Received chemicalPeelingData:", chemicalPeelingData)
console.log("isAdmin:", isAdmin)
console.log("isActive:", chemicalPeelingData?.is_active)

  return (
    <div>Chemical_peeling_update_form</div>
  )
}
