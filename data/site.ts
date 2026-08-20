/**
 * PER-SATELLITE identity for the .ORG public-awareness initiative.
 *
 * This site is NOT the commercial recovery service. It is an independent
 * investor-protection / awareness initiative under the Gulf Recovery Group
 * brand. It references the official .com site softly (one header CTA + one
 * footer CTA), never with sitewide identical link blocks.
 */
export const site = {
  domain: 'https://gulfrecoverygroup.org',

  // The official commercial site this initiative points people to for a
  // professional case review. Single, soft, contextual reference.
  officialSite: 'https://gulfrecoverygroup.com',

  // Official WhatsApp (digits only, for wa.me).
  whatsapp: '971504053507',
  whatsappHref: {
    ar: 'https://wa.me/971504053507?text=%D9%85%D8%B1%D8%AD%D8%A8%D9%8B%D8%A7%D8%8C%20%D8%A3%D8%B1%D9%8A%D8%AF%20%D8%A7%D9%84%D8%AA%D8%AD%D9%82%D9%82%20%D9%85%D9%86%20%D8%AD%D8%A7%D9%84%D8%AA%D9%8A%20%D9%88%D9%85%D8%B9%D8%B1%D9%81%D8%A9%20%D8%A7%D9%84%D8%AE%D9%8A%D8%A7%D8%B1%D8%A7%D8%AA%20%D8%A7%D9%84%D9%85%D8%AA%D8%A7%D8%AD%D8%A9%20%D9%84%D8%AF%D9%8A.',
    en: 'https://wa.me/971504053507?text=Hello%2C%20I%20would%20like%20to%20review%20my%20case',
  },

  // Official case-evaluation page on the commercial .com site.
  caseEvaluationHref: {
    ar: 'https://gulfrecoverygroup.com/%d8%aa%d9%82%d9%8a%d9%8a%d9%85-%d8%a7%d9%84%d8%ad%d8%a7%d9%84%d8%a9/',
    en: 'https://gulfrecoverygroup.com/case-evaluation/',
  },

  // General enquiry inbox for the initiative (not a sales line).
  email: 'info@gulfrecoverygroup.com',

  // Formspree endpoint for the contact form (https://formspree.io).
  // Create a form there pointed at `email` above and paste its endpoint here,
  // e.g. 'https://formspree.io/f/xxxxxxxx'. Leave empty to fall back to mailto.
  formEndpoint: '',

  name: {
    ar: 'المركز العربي للاستشارات المالية',
    en: 'Arab Center for Financial Consulting',
  },
  short: {
    ar: 'المركز العربي للاستشارات المالية',
    en: 'Arab Center for Financial Consulting',
  },
  tagline: {
    ar: 'مبادرة توعوية مستقلة لحماية المستثمرين من الاحتيال المالي',
    en: 'An independent public-awareness initiative protecting investors from financial fraud',
  },
} as const;
