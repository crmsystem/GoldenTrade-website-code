export const SITE_URL = "https://goldentrade.solutions";
export const SITE_NAME = "Goldentrade Solutions";
export const SITE_DESCRIPTION =
  "Goldentrade Solutions is a Zoho Authorized Partner offering end-to-end implementation, customization and integration of Zoho CRM, People, Books, Creator and the full Zoho One suite.";

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: SITE_NAME,
  alternateName: "GoldenTrade Solutions",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  image: `${SITE_URL}/logo.png`,
  description: SITE_DESCRIPTION,
  email: "developer@goldentrade.solutions",
  telephone: "+639171408241",
  address: {
    "@type": "PostalAddress",
    streetAddress: "B5L4, Sta. Monica St., Gatchalian Phase2C Subdivision, San Dionisio",
    addressLocality: "Parañaque City",
    addressRegion: "Metro Manila",
    postalCode: "1700",
    addressCountry: "PH",
  },
  areaServed: "Worldwide",
  knowsAbout: [
    "Zoho CRM",
    "Zoho People",
    "Zoho Books",
    "Zoho Creator",
    "Zoho SalesIQ",
    "Zoho Recruit",
    "Zoho One",
  ],
  sameAs: [
    "https://www.linkedin.com/company/goldentradesolutions",
    "https://www.facebook.com/zohocrmmanager",
  ] as string[],
};
