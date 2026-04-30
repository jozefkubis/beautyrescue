import { SITE_URL } from "@/app/_lib/seo";

export default function LocalBusinessJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    name: "Beauty Rescue",
    url: SITE_URL,
    telephone: "+421907816537",
    email: "info@beautyrescue.sk",
    priceRange: "€€",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Korzo 8708/8",
      postalCode: "010 15",
      addressLocality: "Žilina",
      addressCountry: "SK",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 49.2114096,
      longitude: 18.7105605,
    },
    sameAs: [
      "https://www.facebook.com/beautyrescueprofikozmetika",
      "https://www.instagram.com/beautyrescue_profi/",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
