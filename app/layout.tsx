import {
  Open_Sans,
  Playfair_Display_SC,
  Poppins,
  Roboto,
  Roboto_Condensed,
} from "next/font/google"
import Footer from "./_components/home/footer/Footer"
import Header from "./_components/home/header/Header"
import Navigation from "./_components/navigation/Navigation"
import "./globals.css"

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
})

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  weight: ["400", "500", "600", "700"],
})

const robotoCondensed = Roboto_Condensed({
  subsets: ["latin"],
  variable: "--font-roboto-condensed",
  weight: ["400", "500", "600", "700"],
})

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["400", "500", "600", "700"],
})

const playfairDisplaySC = Playfair_Display_SC({
  subsets: ["latin"],
  variable: "--font-playfair-display-sc",
  weight: ["400", "700", "900"],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${openSans.variable} ${robotoCondensed.variable} ${roboto.variable} ${playfairDisplaySC.variable}`}
      >
        <Navigation />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
