import fs from "node:fs"
import path from "node:path"

const PRODUCT_IMAGE_BASENAME: Record<string, string> = {
  "hyaluronova-volna-nesietovana": "hyaluronova-volna-nesietovana",
  "adjuvans-3-5": "adjuvans-3-5",
  "ha-mw-2": "ha-mw-2",
  "ha-xs-2": "ha-xs-2",
  "ha-glowcomplex": "ha-glowcomplex",
  "ha-oligovit": "ha-oligovit",
  hcpr: "hcpr",
  rcpr: "rcpr",
  ncpr: "ncpr",
  ecpr: "ecpr",
  wcpr: "wcpr",
  "antiaging-cocktail": "antiaging-cocktail",
  "mesolift-cocktail": "mesolift-cocktail",
  "anti-pollution-cocktail": "anti-pollution-cocktail",
  "purifying-cocktail": "purifying-cocktail",
  "radiance-cocktail": "radiance-cocktail",
  "dimenyl-dmae": "dimenyl-dmae",
  "dm-silk": "dm-silk",
  "idebenyl-tight": "idebenyl-tight",
  lumicen: "lumicen",
  "lumicen-gel": "lumicen-gel",
  silicor: "silicor",
  tauricol: "tauricol",
  "glutamax-c": "glutamax-c",
  cofinet: "cofinet",
  saliforo: "saliforo",
  asiacen: "asiacen",
  thrinamide: "thrinamide",
  "b-hidroxin": "b-hidroxin",
  "polivitamin-bcae": "polivitamin-bcae",
}

const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp"]
const TKN_IMAGE_DIR = path.join(process.cwd(), "public", "images", "tkn")

export function getTknProductImage(productSlug: string) {
  const basename = PRODUCT_IMAGE_BASENAME[productSlug]

  if (!basename) {
    return null
  }

  for (const ext of IMAGE_EXTENSIONS) {
    const relativeSrc = `/images/tkn/${basename}${ext}`
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
    `/images/tkn/${basename}.{jpg|jpeg|png|webp}`,
  ]),
)
