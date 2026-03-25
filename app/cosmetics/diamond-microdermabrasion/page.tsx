import Diamond_microdermabrasion from "@/app/_components/products/diamond-microdermabrasion/Diamond_microdermabrasion"
import getDiamondMicrodermabrasion from "@/app/_lib/data_services/data_diamond_microdermabrasion"

export default async function Page() {
  const diamondMicrodermabrasionData = await getDiamondMicrodermabrasion(
    "diamond-microdermabrasion",
  )

  return (
    <Diamond_microdermabrasion
      diamondMicrodermabrasionData={diamondMicrodermabrasionData}
    />
  )
}
