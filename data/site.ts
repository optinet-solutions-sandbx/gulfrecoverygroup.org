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
  whatsapp: '971500000000',
  whatsappHref: 'https://wa.me/971500000000',

  // General enquiry inbox for the initiative (not a sales line).
  email: 'info@grg-investor-protection.org', // TODO: confirm

  name: {
    ar: 'مبادرة مجموعة الخليج لحماية المستثمرين من الاحتيال المالي',
    en: 'Gulf Recovery Group Investor Protection Initiative',
  },
  short: {
    ar: 'مبادرة حماية المستثمرين',
    en: 'Investor Protection Initiative',
  },
  tagline: {
    ar: 'مبادرة توعوية مستقلة لحماية المستثمرين من الاحتيال المالي',
    en: 'An independent public-awareness initiative protecting investors from financial fraud',
  },
} as const;
