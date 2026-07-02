import type { Locale } from '@/lib/utils';
import { content } from '@/data/content';
import type { Route } from '@/data/routes';
import TopicsPage from '@/components/templates/TopicsPage';
import AboutPage from '@/components/templates/AboutPage';
import ContactPage from '@/components/templates/ContactPage';
import LegalPage from '@/components/templates/LegalPage';

/** Resolve title/description for metadata from a route id + locale. */
export function metaFor(id: string, locale: Locale): { title: string; description: string } {
  const t = content[locale];
  switch (id) {
    case 'about':      return { title: t.about.title, description: t.about.body };
    case 'protection': return { title: t.protection.title, description: t.protection.description };
    case 'alerts':     return { title: t.alerts.title, description: t.alerts.description };
    case 'reports':    return { title: t.reports.title, description: t.reports.description };
    case 'resources':  return { title: t.resources.title, description: t.resources.description };
    case 'contact':    return { title: t.contact.title, description: t.contact.description };
    case 'privacy':    return { title: t.privacy.title, description: t.footer.disclaimer };
    case 'terms':      return { title: t.terms.title, description: t.footer.disclaimer };
    default:           return { title: '', description: '' };
  }
}

export default function RouteRenderer({ route, locale }: { route: Route; locale: Locale }) {
  const t = content[locale];
  switch (route.id) {
    case 'about':      return <AboutPage locale={locale} />;
    case 'protection': return <TopicsPage locale={locale} data={t.protection} />;
    case 'alerts':     return <TopicsPage locale={locale} data={t.alerts} />;
    case 'reports':    return <TopicsPage locale={locale} data={t.reports} />;
    case 'resources':  return <TopicsPage locale={locale} data={t.resources} />;
    case 'contact':    return <ContactPage locale={locale} />;
    case 'privacy':    return <LegalPage locale={locale} data={t.privacy} />;
    case 'terms':      return <LegalPage locale={locale} data={t.terms} />;
    default:           return null;
  }
}
