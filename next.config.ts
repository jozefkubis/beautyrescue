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
      "Missing NEXT_PUBLIC_SUPABASE_URL in environment variables.",
    );
  }

  let parsed: URL;

  try {
    parsed = new URL(url);
  } catch {
    throw new Error(
      "Invalid NEXT_PUBLIC_SUPABASE_URL. Expected a valid absolute URL.",
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
      "NEXT_PUBLIC_SUPABASE_URL must point to a *.supabase.co host.",
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
const imgSrc = ["'self'", "data:", "blob:", `https://${supabaseHostname}`];

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

// Stare a skratene URL nechavame funkcne cez trvale presmerovanie,
// aby Google aj stare odkazy neskoncili na 404 po zmene struktury rout.
const legacyRedirects = [
  { source: "/about", destination: "/onas" },
  { source: "/pricing", destination: "/cennik" },
  { source: "/promotion", destination: "/novinky" },
  { source: "/acupuncture", destination: "/lekarska_akupunktura" },
  { source: "/chemical-peeling", destination: "/kozmetika/chemicky_peeling" },
  {
    source: "/diamond-microdermabrasion",
    destination: "/kozmetika/diamantova_mikrodermabrazia",
  },
  { source: "/mezoterapia", destination: "/kozmetika/mezoterapia" },
  {
    source: "/mezoterapia/invasive",
    destination: "/kozmetika/mezoterapia/invazivna",
  },
  {
    source: "/mezoterapia/non-invasive",
    destination: "/kozmetika/mezoterapia/neinvazivna",
  },
  { source: "/microneedling", destination: "/kozmetika/microneedling" },
  { source: "/tkn", destination: "/kozmetika/microneedling/tkn" },
  {
    source: "/tkn/:category",
    destination: "/kozmetika/microneedling/tkn/:category",
  },
  {
    source: "/tkn/:category/:product",
    destination: "/kozmetika/microneedling/tkn/:category/:product",
  },
  { source: "/oxygeneo", destination: "/kozmetika/oxygeneo" },
  {
    source: "/biokompatibilne-nite",
    destination: "/lekarska_kozmetika/biokompatibilne_nite",
  },
  { source: "/botulotoxin", destination: "/lekarska_kozmetika/botulotoxin" },
  {
    source: "/botulotoxin/potenie",
    destination: "/lekarska_kozmetika/botulotoxin/potenie",
  },
  {
    source: "/botulotoxin/vrasky",
    destination: "/lekarska_kozmetika/botulotoxin/vrasky",
  },
  { source: "/jalupro", destination: "/lekarska_kozmetika/jalupro" },
  {
    source: "/jalupro/classic",
    destination: "/lekarska_kozmetika/jalupro/classic",
  },
  { source: "/jalupro/hmw", destination: "/lekarska_kozmetika/jalupro/hmw" },
  {
    source: "/jalupro/super_hydro",
    destination: "/lekarska_kozmetika/jalupro/super_hydro",
  },
  {
    source: "/jalupro/young_eye",
    destination: "/lekarska_kozmetika/jalupro/young_eye",
  },
  {
    source: "/kyselina-hyaluronova",
    destination: "/lekarska_kozmetika/kyselina_hyaluronova",
  },
  {
    source: "/kyselina-hyaluronova/face",
    destination: "/lekarska_kozmetika/kyselina_hyaluronova/tvar",
  },
  {
    source: "/kyselina-hyaluronova/lips",
    destination: "/lekarska_kozmetika/kyselina_hyaluronova/pery",
  },
  { source: "/profhilo", destination: "/lekarska_kozmetika/profhilo" },
  { source: "/cosmetics/:path*", destination: "/kozmetika/:path*" },
  {
    source: "/medical-cosmetics/:path*",
    destination: "/lekarska_kozmetika/:path*",
  },
].map((redirect) => ({
  ...redirect,
  permanent: true,
}));

// Hlavná konfigurácia Next.js projektu
const nextConfig: NextConfig = {
  // Skryje "powered by Next.js" hlavičku kvôli bezpečnosti a čistote
  poweredByHeader: false,

  // Konfigurácia pre optimalizované načítavanie obrázkov z externého Supabase storage
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
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

  // Trvale redirecty drzia SEO hodnotu starych URL a posielaju crawler aj usera na aktualnu canonical cestu.
  async redirects() {
    return legacyRedirects;
  },
};

// Exportujeme konfiguráciu pre použitie Next.js
export default nextConfig;
