import type { Locale } from '@/lib/utils';

/* ── shared shapes ── */
export interface Card { title: string; body: string }
export interface Step { title: string; body: string }

export interface TopicsPageContent {
  title: string;
  description: string;
  topics: Card[];
}
export interface AboutPageContent {
  title: string;
  body: string;
  mission: string;
  vision: string;
  values: string[];
}
export interface ContactPageContent {
  title: string;
  description: string;
  fields: { name: string; email: string; phone: string; subject: string; message: string };
  send: string;
}
export interface LegalPageContent {
  title: string;
  updated: string;
  sections: { heading: string; body: string }[];
}

export interface Dict {
  /* shared ui */
  ui: {
    officialSite: string;
    whatsapp: string;
    explore: string;
    home: string;
    skipToContent: string;
    breadcrumbHome: string;
    ribbon: string;
    professionalNote: string;
    langSwitch: string;
  };
  home: {
    heroTitle: string;
    heroLead: string;
    aboutTitle: string;
    aboutBody: string;
    axesTitle: string;
    axesLead: string;
    axes: Card[];
    risksTitle: string;
    risks: string[];
    messageTitle: string;
    messageBody: string;
    stepsTitle: string;
    stepsLead: string;
    steps: Step[];
    reportsTitle: string;
    reports: string[];
    ctaTitle: string;
    ctaBody: string;
  };
  about: AboutPageContent;
  protection: TopicsPageContent;
  alerts: TopicsPageContent;
  reports: TopicsPageContent;
  resources: TopicsPageContent;
  contact: ContactPageContent;
  privacy: LegalPageContent;
  terms: LegalPageContent;
  footer: {
    blurb: string;
    linksHeading: string;
    disclaimer: string;
    ctaLine: string;
    rights: string;
  };
}

/* ══════════════════════════ ARABIC ══════════════════════════ */
const ar: Dict = {
  ui: {
    officialSite: 'زيارة الموقع الرسمي',
    whatsapp: 'تواصل عبر واتساب',
    explore: 'استكشف المبادرة',
    home: 'الرئيسية',
    skipToContent: 'تخطَّ إلى المحتوى',
    breadcrumbHome: 'الرئيسية',
    ribbon: 'مبادرة توعوية مستقلة · لأغراض التوعية العامة والحماية من الاحتيال المالي',
    professionalNote: 'هل تحتاج إلى تقييم مهني؟',
    langSwitch: 'English',
  },
  home: {
    heroTitle: 'معًا لرفع الوعي وحماية المستثمرين من الاحتيال المالي',
    heroLead:
      'مبادرة مجموعة الخليج لحماية المستثمرين من الاحتيال المالي تهدف إلى نشر الوعي، وتوفير معلومات توعوية تساعد الأفراد على التعرف على أساليب الاحتيال المالي والاستثماري، وفهم المخاطر قبل اتخاذ أي قرار مالي.',
    aboutTitle: 'عن المبادرة',
    aboutBody:
      'تم إطلاق هذه المبادرة بهدف تعزيز الوعي المالي في العالم العربي، وتسليط الضوء على أساليب الاحتيال المنتشرة في مجالات التداول، الاستثمار، العملات الرقمية، والتحويلات المالية. تركّز المبادرة على التوعية، الوقاية، ونشر المعرفة بطريقة واضحة ومباشرة.',
    axesTitle: 'محاور المبادرة',
    axesLead: 'ستة مسارات توعوية تشكّل عمل المبادرة وتوجّه ما ننشره للجمهور.',
    axes: [
      { title: 'حماية المستثمرين', body: 'محتوى توعوي يساعد الأفراد على فهم المخاطر قبل الاستثمار.' },
      { title: 'التحذير من الاحتيال', body: 'تسليط الضوء على الأساليب الشائعة التي يستخدمها المحتالون.' },
      { title: 'التوعية الرقمية', body: 'إرشادات لحماية البيانات الشخصية والمحافظ الرقمية.' },
      { title: 'التقارير التوعوية', body: 'مواد تحليلية تساعد على فهم اتجاهات الاحتيال المالي.' },
      { title: 'موارد للجمهور', body: 'معلومات مبسطة تساعد الأفراد على اتخاذ قرارات أكثر وعيًا.' },
      { title: 'التعاون المجتمعي', body: 'تعزيز ثقافة الإبلاغ والوعي والمسؤولية المالية.' },
    ],
    risksTitle: 'أبرز مخاطر الاحتيال المالي',
    risks: [
      'منصات التداول الوهمية',
      'وعود الأرباح المضمونة',
      'طلبات الرسوم قبل السحب',
      'انتحال هوية الشركات',
      'الاحتيال عبر واتساب وتيليجرام',
      'المحافظ الرقمية المزيفة',
    ],
    messageTitle: 'رسالتنا',
    messageBody:
      'نؤمن أن الوقاية تبدأ بالمعرفة. كلما زاد وعي المستثمرين بأساليب الاحتيال، أصبح من الصعب على المحتالين استغلالهم. لذلك تعمل هذه المبادرة على نشر محتوى توعوي واضح، عملي، ومتاح للجمهور.',
    stepsTitle: 'ماذا تفعل إذا واجهت موقفًا مشبوهًا؟',
    stepsLead: 'خطوات عملية تساعدك على حماية نفسك عند الاشتباه في تعامل مالي.',
    steps: [
      { title: 'أوقف التحويلات', body: 'لا تقم بتحويل أموال إضافية.' },
      { title: 'وثّق كل شيء', body: 'احتفظ بجميع المحادثات والمستندات.' },
      { title: 'احمِ بياناتك', body: 'لا تشارك كلمات المرور أو بيانات المحافظ الرقمية.' },
      { title: 'تحقق من الهوية', body: 'تحقق من هوية الشركة من مصادر رسمية.' },
      { title: 'اطلب مراجعة مختصة', body: 'اطلب تقييمًا مهنيًا إذا كانت الحالة تتطلب مراجعة متخصصة.' },
    ],
    reportsTitle: 'تقارير وتحذيرات',
    reports: [
      'اتجاهات الاحتيال في التداول',
      'الاحتيال المرتبط بالعملات الرقمية',
      'أساليب الاحتيال عبر تطبيقات التواصل',
      'مخاطر منصات الاستثمار غير الموثوقة',
      'حماية البيانات المالية',
      'التوعية المالية في دول الخليج',
    ],
    ctaTitle: 'هل تحتاج إلى تقييم مهني؟',
    ctaBody:
      'إذا كنت تواجه حالة تتعلق بالاحتيال المالي أو الاستثماري وتحتاج إلى مراجعة متخصصة، يمكنك التواصل مع الموقع الرسمي لمجموعة الخليج لاسترجاع الأموال.',
  },
  about: {
    title: 'عن المبادرة',
    body:
      'مبادرة مجموعة الخليج لحماية المستثمرين من الاحتيال المالي هي مبادرة توعوية تهدف إلى تعزيز الوعي العام حول مخاطر الاحتيال المالي والاستثماري، وتقديم معلومات تساعد الأفراد على فهم الأساليب الشائعة التي يستخدمها المحتالون.',
    mission: 'نشر الوعي المالي والاستثماري وحماية الأفراد من الوقوع في الاحتيال.',
    vision: 'أن تكون المبادرة مرجعًا عربيًا موثوقًا في مجال التوعية بمخاطر الاحتيال المالي.',
    values: ['المعرفة', 'الشفافية', 'المسؤولية', 'الوقاية', 'حماية الجمهور'],
  },
  protection: {
    title: 'حماية المستثمرين',
    description:
      'محتوى توعوي يساعد المستثمرين على فهم المخاطر، التعرف على العلامات التحذيرية، واتخاذ قرارات أكثر وعيًا قبل التعامل مع أي منصة أو جهة مالية.',
    topics: [
      { title: 'كيف تتحقق قبل الاستثمار؟', body: 'خطوات أساسية للتأكد من جدية أي جهة قبل إيداع أموالك.' },
      { title: 'علامات المنصات غير الموثوقة', body: 'مؤشرات تكشف المنصات المشبوهة قبل الوقوع في فخها.' },
      { title: 'حماية بياناتك المالية', body: 'كيف تحافظ على سرية معلوماتك وحساباتك.' },
      { title: 'مخاطر الوعود المضمونة', body: 'لماذا تُعد ضمانات الأرباح علامة إنذار مبكرة.' },
      { title: 'كيف تتصرف عند الاشتباه؟', body: 'ما الذي يجب فعله فور ظهور أي إشارة مقلقة.' },
    ],
  },
  alerts: {
    title: 'بلاغات وتحذيرات',
    description:
      'تنبيهات توعوية حول أساليب الاحتيال الشائعة، دون اتهام أي جهة محددة، بهدف رفع مستوى الوعي العام.',
    topics: [
      { title: 'رسوم السحب الوهمية', body: 'طلب رسوم إضافية قبل السماح بسحب الأرباح.' },
      { title: 'انتحال هوية الشركات', body: 'استخدام أسماء وشعارات جهات معروفة لخداع الضحايا.' },
      { title: 'الاحتيال عبر تطبيقات التواصل', body: 'عروض واستثمارات مغرية تصل عبر الرسائل الخاصة.' },
      { title: 'الروابط الاحتيالية', body: 'روابط تهدف إلى سرقة بياناتك أو بيانات دخولك.' },
      { title: 'المحافظ الرقمية المزيفة', body: 'محافظ ومنصات مقلّدة لاستدراج الإيداعات.' },
    ],
  },
  reports: {
    title: 'تقارير توعوية',
    description:
      'تقارير ومحتوى تحليلي يساعد على فهم أنماط الاحتيال المالي والاستثماري والاتجاهات الحديثة في البيئة الرقمية.',
    topics: [
      { title: 'الاحتيال في التداول', body: 'أنماط الخداع المنتشرة في منصات التداول.' },
      { title: 'الاحتيال في العملات الرقمية', body: 'مخاطر مرتبطة بالأصول الرقمية والعملات المشفرة.' },
      { title: 'التوعية المالية في الخليج', body: 'واقع الوعي المالي واحتياجاته في المنطقة.' },
      { title: 'الأمن الرقمي', body: 'أساسيات حماية الأجهزة والحسابات والبيانات.' },
      { title: 'سلوكيات المحتالين', body: 'كيف يبني المحتال الثقة قبل تنفيذ الاحتيال.' },
    ],
  },
  resources: {
    title: 'موارد للجمهور',
    description:
      'مواد مبسطة ومباشرة تساعد الجمهور على فهم المخاطر المالية وحماية المعلومات الشخصية والمالية.',
    topics: [
      { title: 'قائمة تحقق قبل الاستثمار', body: 'نقاط تراجعها قبل اتخاذ أي قرار مالي.' },
      { title: 'دليل حفظ الأدلة', body: 'كيف توثّق تعاملاتك ومحادثاتك بشكل سليم.' },
      { title: 'دليل حماية المحافظ الرقمية', body: 'خطوات لتأمين محافظك وحساباتك الرقمية.' },
      { title: 'دليل التحقق من الشركات', body: 'كيف تتحقق من جدية وترخيص أي جهة.' },
      { title: 'دليل التعامل مع الطلبات المشبوهة', body: 'ماذا تفعل عند تلقّي طلب مالي غير مبرر.' },
    ],
  },
  contact: {
    title: 'تواصل معنا',
    description:
      'إذا كان لديك استفسار عام حول المبادرة أو ترغب في التواصل مع فريق مجموعة الخليج، يمكنك استخدام النموذج التالي أو زيارة الموقع الرسمي.',
    fields: { name: 'الاسم', email: 'البريد الإلكتروني', phone: 'رقم الهاتف', subject: 'الموضوع', message: 'الرسالة' },
    send: 'إرسال',
  },
  privacy: {
    title: 'سياسة الخصوصية',
    updated: 'آخر تحديث: 2026',
    sections: [
      { heading: 'جمع المعلومات', body: 'نجمع فقط المعلومات التي تقدّمها طواعيةً عبر نموذج التواصل، مثل الاسم والبريد الإلكتروني ورقم الهاتف والرسالة، بهدف الرد على استفسارك.' },
      { heading: 'استخدام المعلومات', body: 'تُستخدم المعلومات للرد على الاستفسارات العامة حول المبادرة فقط، ولا تُباع أو تُشارك لأغراض تجارية.' },
      { heading: 'حماية البيانات', body: 'نتّبع إجراءات معقولة للحفاظ على أمان المعلومات المقدمة، مع التأكيد على أن هذا الموقع توعوي بطبيعته.' },
      { heading: 'ملفات الارتباط', body: 'قد يستخدم الموقع ملفات ارتباط أساسية لتحسين تجربة التصفح دون تتبع إعلاني.' },
    ],
  },
  terms: {
    title: 'شروط الاستخدام',
    updated: 'آخر تحديث: 2026',
    sections: [
      { heading: 'طبيعة المحتوى', body: 'جميع المواد المنشورة لأغراض التوعية والمعرفة العامة فقط، ولا تُعد استشارة قانونية أو مالية أو استثمارية.' },
      { heading: 'إخلاء المسؤولية', body: 'لا تتحمل المبادرة مسؤولية أي قرار مالي يُتخذ بناءً على محتوى الموقع؛ القرار النهائي يقع على عاتق القارئ.' },
      { heading: 'حياد المحتوى', body: 'لا تستهدف التحذيرات أي جهة محددة بالاسم، وهي موجّهة لرفع الوعي العام حول الأساليب الشائعة.' },
      { heading: 'الروابط الخارجية', body: 'قد يشير الموقع إلى مصادر خارجية؛ ولا نتحمل مسؤولية محتوى تلك المصادر.' },
    ],
  },
  footer: {
    blurb: 'مبادرة توعوية مستقلة تعمل على نشر الوعي حول الاحتيال المالي والاستثماري وحماية الأفراد قبل اتخاذ أي قرار مالي.',
    linksHeading: 'روابط المبادرة',
    disclaimer:
      'المحتوى المنشور في هذا الموقع لأغراض التوعية والمعرفة العامة فقط، ولا يُعد استشارة قانونية أو مالية أو استثمارية.',
    ctaLine: 'للحالات التي تحتاج إلى تقييم مهني، يرجى زيارة الموقع الرسمي لمجموعة الخليج لاسترجاع الأموال.',
    rights: 'جميع الحقوق محفوظة.',
  },
};

/* ══════════════════════════ ENGLISH ══════════════════════════ */
const en: Dict = {
  ui: {
    officialSite: 'Visit the official site',
    whatsapp: 'Contact via WhatsApp',
    explore: 'Explore the initiative',
    home: 'Home',
    skipToContent: 'Skip to content',
    breadcrumbHome: 'Home',
    ribbon: 'An independent awareness initiative · for public-interest education and protection from financial fraud',
    professionalNote: 'Do you need a professional assessment?',
    langSwitch: 'العربية',
  },
  home: {
    heroTitle: 'Together, raising awareness and protecting investors from financial fraud',
    heroLead:
      'The Gulf Recovery Group Investor Protection Initiative works to spread awareness and to provide educational information that helps individuals recognise financial and investment fraud tactics, and understand the risks before making any financial decision.',
    aboutTitle: 'About the Initiative',
    aboutBody:
      'This initiative was launched to strengthen financial literacy across the Arab world, and to shed light on the fraud tactics common in trading, investment, digital currencies, and money transfers. It focuses on awareness, prevention, and sharing knowledge in a clear and direct way.',
    axesTitle: 'What the Initiative Covers',
    axesLead: 'Six awareness tracks shape the work of the initiative and guide everything we publish for the public.',
    axes: [
      { title: 'Investor Protection', body: 'Educational content that helps individuals understand risk before investing.' },
      { title: 'Fraud Warnings', body: 'Highlighting the common methods that fraudsters use.' },
      { title: 'Digital Awareness', body: 'Guidance on protecting personal data and digital wallets.' },
      { title: 'Awareness Reports', body: 'Analytical material that helps make sense of financial-fraud trends.' },
      { title: 'Public Resources', body: 'Simplified information that helps individuals make more informed decisions.' },
      { title: 'Community Cooperation', body: 'Building a culture of reporting, awareness, and financial responsibility.' },
    ],
    risksTitle: 'The Most Common Financial-Fraud Risks',
    risks: [
      'Fake trading platforms',
      'Promises of guaranteed profits',
      'Fees demanded before withdrawal',
      'Company impersonation',
      'Fraud via WhatsApp and Telegram',
      'Fake digital wallets',
    ],
    messageTitle: 'Our Message',
    messageBody:
      'We believe prevention begins with knowledge. The more investors understand fraud tactics, the harder it becomes for fraudsters to exploit them. That is why this initiative publishes awareness content that is clear, practical, and open to the public.',
    stepsTitle: 'What to do if you face a suspicious situation',
    stepsLead: 'Practical steps that help you protect yourself when you suspect a financial dealing.',
    steps: [
      { title: 'Stop transferring', body: 'Do not transfer any further money.' },
      { title: 'Document everything', body: 'Keep all conversations and documents.' },
      { title: 'Protect your data', body: 'Never share passwords or digital-wallet details.' },
      { title: 'Verify identity', body: 'Verify the company identity through official sources.' },
      { title: 'Seek a specialist review', body: 'Request a professional assessment if the case needs specialist review.' },
    ],
    reportsTitle: 'Reports and Warnings',
    reports: [
      'Trends in trading fraud',
      'Cryptocurrency-related fraud',
      'Fraud tactics on messaging apps',
      'The risks of untrusted investment platforms',
      'Protecting financial data',
      'Financial awareness across the Gulf states',
    ],
    ctaTitle: 'Do you need a professional assessment?',
    ctaBody:
      'If you are dealing with a financial or investment fraud situation and need a specialist review, you can reach the official Gulf Recovery Group site.',
  },
  about: {
    title: 'About the Initiative',
    body:
      'The Gulf Recovery Group Investor Protection Initiative is an awareness initiative that works to strengthen public understanding of the risks of financial and investment fraud, and to provide information that helps individuals recognise the common methods used by fraudsters.',
    mission: 'To spread financial and investment awareness and protect individuals from falling victim to fraud.',
    vision: 'To become a trusted Arabic reference in awareness of the risks of financial fraud.',
    values: ['Knowledge', 'Transparency', 'Responsibility', 'Prevention', 'Protecting the public'],
  },
  protection: {
    title: 'Investor Protection',
    description:
      'Educational content that helps investors understand risk, recognise the warning signs, and make more informed decisions before dealing with any platform or financial entity.',
    topics: [
      { title: 'How to verify before you invest', body: 'Essential steps to confirm any party is genuine before you deposit money.' },
      { title: 'Signs of an untrustworthy platform', body: 'Indicators that expose a suspicious platform before you are caught out.' },
      { title: 'Protecting your financial data', body: 'How to keep your information and accounts confidential.' },
      { title: 'The risk of guaranteed returns', body: 'Why a promise of guaranteed profit is an early warning sign.' },
      { title: 'What to do when something seems wrong', body: 'The right response the moment a worrying sign appears.' },
    ],
  },
  alerts: {
    title: 'Alerts and Warnings',
    description:
      'Awareness alerts about common fraud tactics, without accusing any specific party, intended to raise general public awareness.',
    topics: [
      { title: 'Fake withdrawal fees', body: 'Extra fees demanded before profits can be withdrawn.' },
      { title: 'Company impersonation', body: 'Using the names and logos of known entities to deceive victims.' },
      { title: 'Fraud through messaging apps', body: 'Tempting offers and investments arriving through private messages.' },
      { title: 'Phishing links', body: 'Links designed to steal your data or login details.' },
      { title: 'Fake digital wallets', body: 'Counterfeit wallets and platforms built to attract deposits.' },
    ],
  },
  reports: {
    title: 'Awareness Reports',
    description:
      'Reports and analytical content that help make sense of financial and investment fraud patterns and recent trends in the digital environment.',
    topics: [
      { title: 'Fraud in trading', body: 'The deception patterns common on trading platforms.' },
      { title: 'Fraud in digital currencies', body: 'Risks tied to digital assets and cryptocurrencies.' },
      { title: 'Financial awareness in the Gulf', body: 'The state of financial literacy and its needs in the region.' },
      { title: 'Digital security', body: 'The basics of protecting devices, accounts, and data.' },
      { title: 'The behaviour of fraudsters', body: 'How a fraudster builds trust before committing the fraud.' },
    ],
  },
  resources: {
    title: 'Public Resources',
    description:
      'Simple, direct material that helps the public understand financial risks and protect their personal and financial information.',
    topics: [
      { title: 'Pre-investment checklist', body: 'Points to review before you make any financial decision.' },
      { title: 'Guide to preserving evidence', body: 'How to document your dealings and conversations properly.' },
      { title: 'Guide to protecting digital wallets', body: 'Steps to secure your digital wallets and accounts.' },
      { title: 'Guide to verifying companies', body: 'How to check that a party is genuine and licensed.' },
      { title: 'Guide to handling suspicious requests', body: 'What to do when you receive an unjustified financial request.' },
    ],
  },
  contact: {
    title: 'Contact',
    description:
      'If you have a general enquiry about the initiative, or would like to reach the Gulf Recovery Group team, you can use the form below or visit the official site.',
    fields: { name: 'Name', email: 'Email', phone: 'Phone number', subject: 'Subject', message: 'Message' },
    send: 'Send',
  },
  privacy: {
    title: 'Privacy Policy',
    updated: 'Last updated: 2026',
    sections: [
      { heading: 'Information we collect', body: 'We collect only the information you provide voluntarily through the contact form, such as your name, email, phone number, and message, in order to respond to your enquiry.' },
      { heading: 'How we use information', body: 'Information is used solely to respond to general enquiries about the initiative. It is not sold or shared for commercial purposes.' },
      { heading: 'Data protection', body: 'We follow reasonable measures to keep the information provided secure, while noting that this site is awareness-based in nature.' },
      { heading: 'Cookies', body: 'The site may use essential cookies to improve the browsing experience, without advertising tracking.' },
    ],
  },
  terms: {
    title: 'Terms of Use',
    updated: 'Last updated: 2026',
    sections: [
      { heading: 'Nature of the content', body: 'All material published here is for awareness and general knowledge purposes only, and does not constitute legal, financial, or investment advice.' },
      { heading: 'Disclaimer', body: 'The initiative accepts no responsibility for any financial decision made on the basis of the site content; the final decision rests with the reader.' },
      { heading: 'Content neutrality', body: 'Warnings do not name or target any specific party. They are intended to raise general awareness of common tactics.' },
      { heading: 'External links', body: 'The site may refer to external sources; we are not responsible for the content of those sources.' },
    ],
  },
  footer: {
    blurb: 'An independent awareness initiative that works to spread awareness of financial and investment fraud and to protect individuals before they make any financial decision.',
    linksHeading: 'Initiative links',
    disclaimer:
      'The content published on this site is for awareness and general knowledge purposes only, and does not constitute legal, financial, or investment advice.',
    ctaLine: 'For cases that require a professional assessment, please visit the official Gulf Recovery Group site.',
    rights: 'All rights reserved.',
  },
};

export const content: Record<Locale, Dict> = { ar, en };
