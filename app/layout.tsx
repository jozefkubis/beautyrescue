import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import {
  Open_Sans,
  Playfair_Display_SC,
  Poppins,
  Roboto,
  Roboto_Condensed,
} from "next/font/google";
import { Toaster } from "react-hot-toast";
import Footer from "./_components/footer/Footer";
import Header from "./_components/home/header/Header";
import MobileHeader from "./_components/home/header/MobileHeader";
import Navigation from "./_components/navigation/Navigation";
import LocalBusinessJsonLd from "./_components/seo/LocalBusinessJsonLd";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_TITLE,
  OG_IMAGE_URL,
  SITE_URL,
} from "./_lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: "%s | Beauty Rescue Žilina",
  },
  description: DEFAULT_DESCRIPTION,
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
    shortcut: "/logo.png",
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1638,
        height: 960,
        alt: "Beauty Rescue Žilina",
      },
    ],
    url: SITE_URL,
    siteName: "Beauty Rescue Žilina",
    locale: "sk_SK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [OG_IMAGE_URL],
  },
};

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
});

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  weight: ["400", "500", "600", "700"],
});

const robotoCondensed = Roboto_Condensed({
  subsets: ["latin"],
  variable: "--font-roboto-condensed",
  weight: ["400", "500", "600", "700"],
});

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["400", "500", "600", "700"],
});

const playfairDisplaySC = Playfair_Display_SC({
  subsets: ["latin"],
  variable: "--font-playfair-display-sc",
  weight: ["400", "700", "900"],
});

// const isMobile = typeof window !== "undefined" && window.innerWidth < 1024

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sk">
      <body
        className={`${poppins.variable} ${openSans.variable} ${robotoCondensed.variable} ${roboto.variable} ${playfairDisplaySC.variable}`}
      >
        <LocalBusinessJsonLd />
        <MobileHeader />
        <div className="hidden lg:block">
          <Navigation />
          <Header />
        </div>
        <main id="main-content">{children}</main>

        <Footer />

        <Analytics />

        <Toaster
          position="top-right"
          containerStyle={{
            zIndex: 999999,
          }}
          toastOptions={{
            duration: 4000,
            style: {
              background: "#8b092c",
              color: "#fff",
            },
          }}
        />
      </body>
    </html>
  );
}
