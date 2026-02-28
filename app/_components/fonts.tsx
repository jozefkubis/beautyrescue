// fonts.ts

import {
  Open_Sans,
  Playfair_Display_SC,
  Poppins,
  Roboto,
  Roboto_Condensed,
} from "next/font/google"

/*
  HLAVNÝ BRAND FONT
  Použijeme Playfair Display SC pre BEAUTY RESCUE
  (vyzerá luxusne, elegantne – podobné originálu)
*/
export const brandFont = Playfair_Display_SC({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  display: "swap",
})

/*
  Navigácia – úzky moderný font
*/
export const robotoCondensed = Roboto_Condensed({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
})

/*
  Bežný text (sekcie, odstavce)
*/
export const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
})

/*
  Alternatívny moderný font (napr. tlačidlá)
*/
export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
})

/*
  Klasický Roboto – ak by si chcel kombinovať
*/
export const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
})
