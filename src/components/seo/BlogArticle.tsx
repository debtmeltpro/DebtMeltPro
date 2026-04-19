

import Link from 'next/link';
import { Breadcrumb } from '@/components/seo/Breadcrumb';
import { RelatedTools } from '@/components/seo/RelatedTools';
import { AdSlotLeaderboard, AdSlotInContent } from '@/components/molecules/AdSlot';
import { generateFaqSchema, SITE_URL } from '@/lib/seo';
import { BLOG_POSTS } from '@/lib/blog';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

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
// Article schema. NOTE: aggregateRating removed — same reason as the
// fake ratings already removed from layout.tsx and /prompts. Re-add
// only with real, verified user reviews on an eligible schema type.
const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: title,
  datePublished: `${date}T00:00:00Z`,
  dateModified: `${date}T00:00:00Z`,
  author: { '@type': 'Organization', name: 'DebtMeltPro', url: SITE_URL },
  publisher: {
    '@type': 'Organization',
    name: 'DebtMeltPro',
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/logo.png`,
    },
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': `${SITE_URL}/blog/${slug}`,
  },
  inLanguage: 'en-US',
};

  const relatedBlogPosts = BLOG_POSTS.filter(p => p.slug !== slug).slice(0, 3);
  

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

        {/* Related Blog Posts — Internal Linking */}
        {relatedBlogPosts.length > 0 && (
          <section className="mt-10">
            <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white mb-4">
              Continue Reading
            </h2>
            <div className="space-y-3">
              {relatedBlogPosts.map(post => (
                <Link key={post.slug} href={`/blog/${post.slug}`}
                  className="group flex items-center justify-between p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:shadow-sm transition-shadow">
                  <div>
                    <span className="text-xs font-semibold text-green-700 dark:text-green-300 bg-green-100 dark:bg-green-900/50 px-2 py-0.5 rounded-full">
                      {post.category}
                    </span>
                    <h3 className="font-medium text-sm text-slate-900 dark:text-white mt-1.5 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                      {post.title}
                    </h3>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-green-500 shrink-0 ml-3" />
                </Link>
              ))}
            </div>
          </section>
        )}        

        <p className="mt-8 text-xs text-slate-400 leading-relaxed">
          <strong>Disclaimer:</strong> This article is for educational purposes only and does not
          constitute financial advice. Consult a licensed financial advisor before making financial decisions.
        </p>
      </article>

      <RelatedTools currentSlug={relatedToolSlug} />
    </>
  );
}
