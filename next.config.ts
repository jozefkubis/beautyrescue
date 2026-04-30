
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


// Zoznam povolených zdrojov pre script-src v Content-Security-Policy.
// Umožňuje spúšťať skripty len z vlastného webu, prípadne Vercel Toolbar, preview tools a Vercel Analytics.
// 'unsafe-inline' a 'unsafe-eval' sú povolené kvôli Next.js a niektorým knižniciam, ale v ideálnom prípade by sa mali minimalizovať.
const scriptSrc = [
  "'self'",
  "'unsafe-inline'",
  "'unsafe-eval'",
  "https://vercel.live", // Vercel Toolbar / Feedback / Comments
  "https://va.vercel-scripts.com", // Vercel Analytics script
];


// Zoznam povolených zdrojov pre connect-src v Content-Security-Policy.
// Umožňuje komunikáciu len s vlastným backendom, Supabase, Vercel Analytics a Vercel Toolbar.
// Pusher je tu kvôli realtime funkciám Vercel Toolbaru.
const connectSrc = [
  "'self'",
  "https://*.supabase.co",
  "wss://*.supabase.co",
  "https://vitals.vercel-insights.com", // Vercel Analytics / Speed Insights
  "https://vercel.live", // Vercel Toolbar / Feedback / Comments
  "wss://ws-us3.pusher.com", // Vercel Toolbar realtime
];


// Zoznam povolených zdrojov pre frame-src v Content-Security-Policy.
// Umožňuje vkladať iframe len z vlastného webu a z Vercel Toolbaru (napr. pre feedback).
const frameSrc = [
  "'self'",
  "https://vercel.live", // Vercel Toolbar / Feedback iframe
  "https://www.youtube.com", // YouTube embedded videos
];


// Zoznam povolených zdrojov pre img-src v Content-Security-Policy.
// Umožňuje načítavať obrázky z vlastného webu, Supabase storage, a tiež podporuje data: a blob: pre uploady a generované obrázky.
const imgSrc = [
  "'self'",
  "data:",
  "blob:",
  `https://${supabaseHostname}`,
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
      `script-src ${scriptSrc.join(" ")}`,
      "style-src 'self' 'unsafe-inline'",
      `img-src ${imgSrc.join(" ")}`,
      "font-src 'self' data:",
      `connect-src ${connectSrc.join(" ")}`,
      `frame-src ${frameSrc.join(" ")}`,
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
