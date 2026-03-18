import fs from "node:fs"
import path from "node:path"

const PRODUCT_IMAGE_BASENAME: Record<string, string> = {
  "hyaluronova-volna-nesietovana": "Kyselina hyaluronová",
  "adjuvans-3-5": "Kyselina hyaluronová",
  "ha-mw-2": "TKN HA MW 2%",
  "ha-xs-2": "TKN HA XS 2%",
  "ha-glowcomplex": "TKN HA Glowcomplex",
  "ha-oligovit": "TKN HA Oligovit",
  hcpr: "HCPR",
  rcpr: "RCPR",
  ncpr: "NCPR",
  ecpr: "ECPR",
  wcpr: "WCPR",
  "antiaging-cocktail": "Antiaging cocktail",
  "mesolift-cocktail": "Mesolift Cocktail",
  "anti-pollution-cocktail": "Anti-pollution Cocktail",
  "purifying-cocktail": "Purifying Cocktail",
  "radiance-cocktail": "Radiance Cocktail",
  "dimenyl-dmae": "DIMENYL (DMAE – dimetylaminoetanol)",
  "dm-silk": "DM-SILK",
  "idebenyl-tight": "IDEBENYL TIGHT",
  lumicen: "LUMICEN",
  "lumicen-gel": "LUMICEN GEL",
  silicor: "SILICOR",
  tauricol: "TAURICOL",
  "glutamax-c": "GLUTAMAX C",
  cofinet: "COFINET",
  saliforo: "SALIFORO",
  asiacen: "ASIACEN",
  thrinamide: "THRINAMIDE",
  "b-hidroxin": "B-HIDROXIN",
  "polivitamin-bcae": "POLIVITAMIN BCAE",
}

const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp"]
const TKN_IMAGE_DIR = path.join(process.cwd(), "public", "images", "tkn")

export function getTknProductImage(productSlug: string) {
  const basename = PRODUCT_IMAGE_BASENAME[productSlug]

  if (!basename) {
    return null
  }

  for (const ext of IMAGE_EXTENSIONS) {
    const relativeSrc = `/images/tkn/${encodeURIComponent(basename)}${ext}`
    const absolutePath = path.join(TKN_IMAGE_DIR, `${basename}${ext}`)

    if (fs.existsSync(absolutePath)) {
      return relativeSrc
    }
  }

  return null
}

export const tknProductImageApiMap = Object.fromEntries(
  Object.entries(PRODUCT_IMAGE_BASENAME).map(([slug, basename]) => [
    slug,
    `/images/tkn/${encodeURIComponent(basename)}.{jpg|jpeg|png|webp}`,
  ]),
)
