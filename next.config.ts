
// Importujeme typ NextConfig, aby sme mali typovú kontrolu pre konfiguráciu Next.js
// (pomáha nám to s autocomplete a chybami v konfigurácii)
import type { NextConfig } from "next";


// Načítame verejnú environmentálnu premennú s URL na Supabase projekt.
// NEXT_PUBLIC_* je vždy verejná, preto sem nepatria žiadne tajomstvá.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;


// Funkcia, ktorá vynúti, že Supabase URL je zadaná, validná a bezpečná.
// Ak nie je, appka sa nespustí a hneď vyhodí zmysluplnú chybu.
// Toto je dôležité, aby sme omylom nenasadili zlú alebo nebezpečnú konfiguráciu.
function getRequiredHostname(url?: string) {
  if (!url) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL in environment variables."
    );
  }

  let parsed: URL;

  try {
    parsed = new URL(url);
  } catch {
    throw new Error(
      "Invalid NEXT_PUBLIC_SUPABASE_URL. Expected a valid absolute URL."
    );
  }

  // Povolený je iba HTTPS protokol kvôli bezpečnosti.
  if (parsed.protocol !== "https:") {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL must use https.");
  }

  // Povolené sú len domény *.supabase.co (štandardný Supabase hosting).
  // Ak by si používal vlastnú doménu, túto podmienku treba upraviť.
  if (!parsed.hostname.endsWith(".supabase.co")) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_URL must point to a *.supabase.co host."
    );
  }

  return parsed.hostname;
}


// Získame hostname z validovanej Supabase URL, ktorý potom použijeme v ďalšej konfigurácii.
const supabaseHostname = getRequiredHostname(supabaseUrl);


// Zoznam povolených zdrojov pre connect-src v Content-Security-Policy.
// Umožňuje komunikáciu len s vlastným backendom, Supabase a (voliteľne) Vercel Analytics.
const connectSrc = [
  "'self'",
  "https://*.supabase.co",
  "wss://*.supabase.co",
  "https://vitals.vercel-insights.com", // iba ak používaš Vercel Analytics/Speed Insights
];


// Bezpečnostné HTTP hlavičky, ktoré chránia web pred bežnými útokmi a únikmi údajov.
// Nastavujú sa pre všetky odpovede servera.
const securityHeaders = [
  {
    key: "X-Content-Type-Options",
    value: "nosniff", // Zabraňuje prehliadaču hádať typ súboru (ochrana pred XSS)
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin", // Odošle referer len pri navigácii na rovnaký pôvod
  },
  {
    key: "X-Frame-Options",
    value: "DENY", // Zabraňuje vkladaniu stránky do <iframe> (ochrana pred clickjacking)
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()", // Zakáže prístup k citlivým API
  },
  {
    key: "Content-Security-Policy",
    value: [
      // Povolené zdroje pre rôzne typy obsahu (ochrana pred XSS, data leak, atď.)
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline'",
      `img-src 'self' data: blob: https://${supabaseHostname}`,
      "font-src 'self' data:",
      `connect-src ${connectSrc.join(" ")}`,
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "object-src 'none'",
      "upgrade-insecure-requests",
    ].join("; "),
  },
];


// Hlavná konfigurácia Next.js projektu
const nextConfig: NextConfig = {
  // Skryje "powered by Next.js" hlavičku kvôli bezpečnosti a čistote
  poweredByHeader: false,

  // Konfigurácia pre optimalizované načítavanie obrázkov z externého Supabase storage
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: supabaseHostname,
        pathname: "/storage/v1/object/public/**", // Verejné obrázky
      },
      {
        protocol: "https",
        hostname: supabaseHostname,
        pathname: "/storage/v1/object/sign/**", // Obrázky s podpisom (autorizované)
      },
    ],
  },

  // Nastaví bezpečnostné hlavičky pre všetky cesty a odpovede
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};


// Exportujeme konfiguráciu pre použitie Next.js
export default nextConfig;