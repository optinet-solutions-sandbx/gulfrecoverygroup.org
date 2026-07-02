import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ROUTES, routeBySlug } from '@/data/routes';
import { buildMeta } from '@/lib/seo';
import RouteRenderer, { metaFor } from '@/components/RouteRenderer';

interface Props { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return ROUTES.map(r => ({ slug: r.en }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const route = routeBySlug(slug, 'en');
  if (!route) return {};
  const { title, description } = metaFor(route.id, 'en');
  return buildMeta({ locale: 'en', id: route.id, title, description });
}

export default async function EnSlugPage({ params }: Props) {
  const { slug } = await params;
  const route = routeBySlug(slug, 'en');
  if (!route) notFound();
  return <RouteRenderer route={route} locale="en" />;
}
