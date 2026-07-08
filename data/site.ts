/**
 * PER-SATELLITE identity for the .ORG public-awareness initiative.
 *
 * This site is NOT the commercial recovery service. It is an independent
 * investor-protection / awareness initiative under the Gulf Recovery Group
 * brand. It references the official .com site softly (one header CTA + one
 * footer CTA), never with sitewide identical link blocks.
 */
export const site = {
  domain: 'https://grg-investor-protection.org', // TODO: confirm final .org domain

  // The official commercial site this initiative points people to for a
  // professional case review. Single, soft, contextual reference.
  officialSite: 'https://gulfrecoverygroup.com',

  // Official WhatsApp (digits only, for wa.me). TODO: real number before launch.
  whatsapp: '447429691987',
  whatsappHref: 'https://api.whatsapp.com/send/?phone=447429691987&text&type=phone_number&app_absent=0',

  // General enquiry inbox for the initiative (not a sales line).
  email: 'info@gulfrecoverygroup.com',

  name: {
    ar: 'المركز العربي لاسترجاع الأموال',
    en: 'Arab Center for Fund Recovery',
  },
  short: {
    ar: 'المركز العربي لاسترجاع الأموال',
    en: 'Arab Center for Fund Recovery',
  },
  tagline: {
    ar: 'مبادرة توعوية مستقلة لحماية المستثمرين من الاحتيال المالي',
    en: 'An independent public-awareness initiative protecting investors from financial fraud',
  },
} as const;
