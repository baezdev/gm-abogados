import { absoluteUrl, site } from "@/config/site";

/** JSON-LD `LegalService` para la organización (home y páginas que usen este layout). */
export function legalServiceJsonLd(): Record<string, unknown> {
  const logoUrl = absoluteUrl(site.logoPath);
  return {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "@id": `${site.origin}/#organization`,
    name: site.name,
    alternateName: site.alternateName,
    url: site.origin,
    logo: {
      "@type": "ImageObject",
      url: logoUrl,
      width: 600,
      height: 600,
    },
    image: logoUrl,
    description: site.schemaDescription,
    telephone: site.phoneSchema,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ciudad de México",
      addressRegion: "CDMX",
      addressCountry: "MX",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.latitude,
      longitude: site.geo.longitude,
    },
    areaServed: [
      { "@type": "City", name: "Ciudad de México" },
      { "@type": "State", name: "Estado de México" },
    ],
    priceRange: "$$",
    paymentAccepted: "Cash, Credit Card, Transfer",
    currenciesAccepted: "MXN",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ],
        opens: "09:00",
        closes: "19:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "10:00",
        closes: "14:00",
      },
    ],
    sameAs: [...site.schemaSameAs],
    founder: {
      "@type": "Person",
      name: "Jonathan Ian González Mora",
      jobTitle: "Abogado Laboralista",
      alumniOf: "Universidad Nacional Autónoma de México",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "150",
      bestRating: "5",
      worstRating: "1",
    },
  };
}
