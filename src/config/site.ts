/**
 * Datos públicos del sitio (URL, contacto, SEO por defecto, textos compartidos con schema).
 * JSON-LD: `src/data/schema/`.
 */
export const site = {
  origin: "https://gm-abogados.com.mx",
  name: "GM Abogados Laboralistas",
  shortName: "GM Abogados",
  alternateName: "González Mora Abogados Laboralistas",
  /** Solo dígitos, para `tel:` y wa.me */
  phoneDigits: "5566011051",
  phoneDisplay: "55 6601 1051",
  /** Schema.org / presentación formal */
  phoneSchema: "+52-55-6601-1051",
  email: "iang27191@gmail.com",
  instagram: "https://www.instagram.com/ji_gm3?igsh=Y2pmMDNvcDlhY3Nl",
  facebook: "https://www.facebook.com/share/17Sbbt1TUL/",
  whatsappPresetText:
    "Buen día Lic. González, me interesa obtener asesoría legal laboral.",
  defaultTitle:
    "GM Abogados Laboralistas CDMX | Despido Injustificado y Liquidación",
  defaultDescription:
    "Abogados laboralistas en Ciudad de México. Especialista en despido injustificado, acoso laboral, horas extras y riesgos de trabajo. Consulta gratuita. +150 casos ganados. Solo cobramos si ganas.",
  ogImagePath: "/og.webp",
  logoPath: "/gm-logo.jpg",
  ogImageAlt:
    "GM Abogados Laboralistas CDMX - Especialistas en Derecho Laboral, Despido Injustificado y Liquidaciones",
  twitterSite: "@GMAbogadosMX",
  author: "Lic. Jonathan Ian González Mora - GM Abogados Laboralistas",
  copyright: "GM Abogados Laboralistas",
  themeColor: "#0A0F1E",
  htmlLang: "es",
  languageMeta: "es-MX",
  localeOg: "es_MX",
  geo: {
    region: "MX-CMX",
    placename: "Ciudad de México",
    position: "19.4326;-99.1332",
    icbm: "19.4326, -99.1332",
    latitude: "19.4326",
    longitude: "-99.1332",
  },
  schemaDescription:
    "Despacho de abogados laboralistas en CDMX especializado en despido injustificado, acoso laboral, horas extras no pagadas y riesgos de trabajo. Consulta gratuita. +150 casos ganados. Solo cobramos si ganas.",
  schemaSameAs: [
    "https://www.facebook.com/GMAbogadosLaboralistas",
    "https://www.linkedin.com/company/gm-abogados-laboralistas",
    "https://www.instagram.com/gmabogadoslaboralistas",
  ],
} as const;

export function absoluteUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${site.origin}${normalized}`;
}

export function whatsappUrl(): string {
  return `https://wa.me/52${site.phoneDigits}?text=${encodeURIComponent(site.whatsappPresetText)}`;
}
