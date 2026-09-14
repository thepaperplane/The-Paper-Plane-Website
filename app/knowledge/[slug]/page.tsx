import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Badge, ButtonLink, Card, Container, Rule, Section } from '@/components/ui';
import { ARTICLES, getArticle } from '@/content/knowledge';
import { SITE } from '@/lib/site';
import { formatDate } from '@/lib/utils';

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return ARTICLES.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: 'Article not found' };

  return {
    title: article.title,
    description: article.summary,
    alternates: { canonical: `/knowledge/${article.slug}` },
    openGraph: {
      type: 'article',
      title: article.title,
      description: article.summary,
      url: `/knowledge/${article.slug}`,
      publishedTime: article.date,
      authors: [article.author],
      tags: article.tags,
      siteName: SITE.name,
      locale: SITE.locale,
      images: [
        {
          url: '/og/default.png',
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.summary,
      images: ['/og/default.png'],
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const related = ARTICLES.filter((a) => a.slug !== article.slug).slice(0, 2);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.summary,
    datePublished: article.date,
    dateModified: article.date,
    author: { '@type': 'Organization', name: SITE.name, url: SITE.url },
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
      logo: { '@type': 'ImageObject', url: `${SITE.url}/favicon.svg` },
    },
    mainEntityOfPage: `${SITE.url}/knowledge/${article.slug}`,
    keywords: article.tags.join(', '),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article>
        {/* Header */}
        <Section className="pt-[calc(4.5rem+var(--space-section-sm))] pb-10">
          <div className="pointer-events-none absolute inset-0 -z-10" />
          <Container size="content">
            <Link
              href="/knowledge"
              className="text-ink-3 hover:text-ink inline-flex items-center gap-1.5 text-[0.875rem] font-medium transition-colors"
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={2.2} />
              Knowledge Corner
            </Link>

            <div className="mt-6 flex flex-wrap items-center gap-2">
              <Badge tone="accent">{article.category}</Badge>
              <span className="text-ink-3 text-[0.8125rem]">{article.readingTime}</span>
              <span className="text-ink-3 text-[0.8125rem]">·</span>
              <time dateTime={article.date} className="text-ink-3 text-[0.8125rem]">
                {formatDate(article.date)}
              </time>
            </div>

            <h1 className="text-ink mt-5 text-[length:var(--text-display-2)] leading-[1.1] font-semibold tracking-[-0.03em]">
              {article.title}
            </h1>

            <p className="text-ink-3 mt-5 text-lg leading-relaxed">{article.summary}</p>

            <div className="mt-7 flex items-center gap-3">
              <span className="bg-accent-wash text-accent ring-accent/15 flex h-10 w-10 items-center justify-center rounded-full text-[0.8125rem] font-semibold ring-1 ring-inset">
                {article.author
                  .split(' ')
                  .map((w) => w[0])
                  .slice(0, 2)
                  .join('')}
              </span>
              <div>
                <p className="text-ink text-[0.9375rem] font-medium">{article.author}</p>
                <p className="text-ink-3 text-[0.8125rem]">{article.authorRole}</p>
              </div>
            </div>

            {article.reference ? (
              <p className="bg-sunken text-ink-3 mt-7 rounded-[var(--radius-md)] px-4 py-3 font-[family-name:var(--font-mono)] text-[0.8125rem]">
                {article.reference}
              </p>
            ) : null}
          </Container>
        </Section>

        <Container size="content">
          <Rule />
        </Container>

        {/* Body */}
        <Section className="py-14">
          <Container size="content">
            <div className="space-y-10">
              {article.body.map((block, i) => (
                <section key={i}>
                  {block.heading ? (
                    <h2 className="text-ink mb-4 text-[length:var(--text-title-3)] font-semibold tracking-[-0.02em]">
                      {block.heading}
                    </h2>
                  ) : null}
                  <div className="space-y-5">
                    {block.paragraphs.map((paragraph, j) => (
                      <p key={j} className="text-ink-2 text-[1.0625rem] leading-[1.75]">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            {/* Tags */}
            <ul className="mt-12 flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <li key={tag}>
                  <Badge tone="neutral">{tag}</Badge>
                </li>
              ))}
            </ul>

            {/* Inline CTA */}
            <Card className="bg-sunken mt-12 p-7 sm:p-8">
              <h2 className="text-ink text-[1.1875rem] font-semibold tracking-[-0.015em]">
                Does this apply to your position?
              </h2>
              <p className="text-ink-3 mt-2.5 text-[0.9375rem] leading-relaxed">
                General guidance only takes you so far. If you are holding a notice or a deadline,
                send it over and we will read it against your actual facts.
              </p>
              <ButtonLink href="/contact" className="mt-5">
                Talk to the practice
                <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
              </ButtonLink>
            </Card>
          </Container>
        </Section>

        {/* Related */}
        <Section tone="sunken" className="py-16">
          <Container size="content">
            <h2 className="text-ink text-[length:var(--text-title-3)] font-semibold tracking-[-0.02em]">
              Keep reading
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {related.map((item) => (
                <Card key={item.slug} interactive className="group bg-surface">
                  <Link href={`/knowledge/${item.slug}`} className="block p-6">
                    <Badge tone="accent">{item.category}</Badge>
                    <h3 className="text-ink group-hover:text-accent mt-3 text-[1.0625rem] leading-snug font-semibold transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-ink-3 mt-2 text-[0.8125rem]">{item.readingTime}</p>
                  </Link>
                </Card>
              ))}
            </div>
          </Container>
        </Section>
      </article>
    </>
  );
}
