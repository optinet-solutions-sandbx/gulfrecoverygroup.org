import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ROUTES, routeBySlug } from '@/data/routes';
import { articlesEn, articleBySlugEn } from '@/data/articles.en';
import { buildMeta } from '@/lib/seo';
import RouteRenderer, { metaFor } from '@/components/RouteRenderer';
import ArticlePage from '@/components/templates/ArticlePage';

interface Props { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return [...ROUTES.map(r => ({ slug: r.en })), ...Object.keys(articlesEn).map(slug => ({ slug }))];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = articleBySlugEn(slug);
  if (article) {
    return {
      title: article.title,
      description: article.description,
      alternates: { canonical: `/en/${article.slug}` },
      robots: { index: false, follow: false },
    };
  }
  const route = routeBySlug(slug, 'en');
  if (!route) return {};
  const { title, description } = metaFor(route.id, 'en');
  return buildMeta({ locale: 'en', id: route.id, title, description });
}

export default async function EnSlugPage({ params }: Props) {
  const { slug } = await params;
  const article = articleBySlugEn(slug);
  if (article) return <ArticlePage article={article} locale="en" />;
  const route = routeBySlug(slug, 'en');
  if (!route) notFound();
  return <RouteRenderer route={route} locale="en" />;
}
