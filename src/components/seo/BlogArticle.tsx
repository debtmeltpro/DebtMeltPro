// ============================================================
// DebtMeltPro — Blog Article Layout Template
// Reusable wrapper for all blog posts ensuring consistent
// SEO structure: breadcrumbs, schema, ads, related tools.
// ============================================================

import Link from 'next/link';
import { Breadcrumb } from '@/components/seo/Breadcrumb';
import { RelatedTools } from '@/components/seo/RelatedTools';
import { AdSlotLeaderboard, AdSlotInContent } from '@/components/molecules/AdSlot';
import { generateFaqSchema, SITE_URL } from '@/lib/seo';
import { Calendar, Clock } from 'lucide-react';

interface BlogArticleProps {
  slug: string;
  title: string;
  category: string;
  categorySlug: string;
  date: string;
  readTime: string;
  intro: string;
  relatedToolSlug: string;
  faqs: { q: string; a: string }[];
  children: React.ReactNode;
}

export function BlogArticle({
  slug, title, category, categorySlug, date, readTime,
  intro, relatedToolSlug, faqs, children,
}: BlogArticleProps) {
  const faqSchema = generateFaqSchema(faqs);
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    datePublished: `${date}T00:00:00Z`,
    dateModified: `${date}T00:00:00Z`,
    author: { '@type': 'Organization', name: 'DebtMeltPro', url: SITE_URL },
    publisher: { '@type': 'Organization', name: 'DebtMeltPro', url: SITE_URL },
    mainEntityOfPage: `${SITE_URL}/blog/${slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Breadcrumb items={[
        { label: 'Blog', href: '/blog' },
        { label: title.length > 40 ? title.slice(0, 40) + '...' : title, href: `/blog/${slug}` },
      ]} />

      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Link href={`/category/${categorySlug}`}
              className="text-xs font-semibold px-2.5 py-1 rounded-full bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 hover:bg-green-200 transition-colors">
              {category}
            </Link>
            <span className="flex items-center gap-1 text-xs text-slate-400">
              <Calendar className="w-3 h-3" />
              {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
            <span className="flex items-center gap-1 text-xs text-slate-400">
              <Clock className="w-3 h-3" /> {readTime}
            </span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white leading-tight mb-4">
            {title}
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">{intro}</p>
        </header>

        <AdSlotLeaderboard />

        <div className="prose prose-slate dark:prose-invert max-w-none">
          {children}
        </div>

        <AdSlotInContent className="mt-8" />

        {/* FAQ */}
        <section className="mt-12">
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {faqs.map(({ q, a }, i) => (
              <details key={i} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl group">
                <summary className="p-5 cursor-pointer font-medium text-slate-800 dark:text-slate-200 text-sm flex justify-between items-center gap-3 list-none hover:text-green-600 transition-colors">
                  {q}
                  <span className="text-slate-400 group-open:rotate-45 transition-transform shrink-0 text-lg leading-none">+</span>
                </summary>
                <div className="px-5 pb-5 text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-3">{a}</div>
              </details>
            ))}
          </div>
        </section>

        <p className="mt-8 text-xs text-slate-400 leading-relaxed">
          <strong>Disclaimer:</strong> This article is for educational purposes only and does not
          constitute financial advice. Consult a licensed financial advisor before making financial decisions.
        </p>
      </article>

      <RelatedTools currentSlug={relatedToolSlug} />
    </>
  );
}
