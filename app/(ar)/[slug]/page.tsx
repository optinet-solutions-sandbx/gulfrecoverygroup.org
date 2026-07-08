import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ROUTES, routeBySlug } from '@/data/routes';
import { articles, articleBySlug } from '@/data/articles';
import { buildMeta } from '@/lib/seo';
import RouteRenderer, { metaFor } from '@/components/RouteRenderer';
import ArticlePage from '@/components/templates/ArticlePage';

interface Props { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return [...ROUTES.map(r => ({ slug: r.ar })), ...Object.keys(articles).map(slug => ({ slug }))];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = articleBySlug(slug);
  if (article) {
    const path = `/${article.slug}`;
    return {
      title: article.title,
      description: article.description,
      alternates: { canonical: path },
      robots: { index: false, follow: false },
    };
  }
  const route = routeBySlug(slug, 'ar');
  if (!route) return {};
  const { title, description } = metaFor(route.id, 'ar');
  return buildMeta({ locale: 'ar', id: route.id, title, description });
}

export default async function ArSlugPage({ params }: Props) {
  const { slug } = await params;
  const article = articleBySlug(slug);
  if (article) return <ArticlePage article={article} locale="ar" />;
  const route = routeBySlug(slug, 'ar');
  if (!route) notFound();
  return <RouteRenderer route={route} locale="ar" />;
}
