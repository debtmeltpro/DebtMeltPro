import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, TrendingDown, Home, Flame, CreditCard, GraduationCap } from 'lucide-react';
import { Breadcrumb } from '@/components/seo/Breadcrumb';

import { CATEGORIES, TOOLS, SITE_URL, generateWebPageSchema } from '@/lib/seo';
import { BLOG_POSTS } from '@/lib/blog';
import { AdSlotLeaderboard, AdSlotInContent } from '@/components/molecules/AdSlot';

const ICON_MAP: Record<string, React.ElementType> = {
  TrendingDown, Home, Flame, CreditCard, GraduationCap,
};
const CATEGORY_BLOG_MAP: Record<string, string[]> = {
  'debt-management': ['snowball-vs-avalanche-debt-payoff', 'minimum-payment-trap-credit-cards'],
  'home-buying': ['rent-vs-buy-true-cost'],
  'investing': ['fire-number-explained'],
  'student-loans': ['should-you-refinance-student-loans'],
};

const CATEGORY_PROMPT_MAP: Record<string, { label: string; href: string }[]> = {
  'debt-management': [
    { label: 'Debt Snowball Action Plan', href: '/prompts/debt-payoff/debt-snowball-action-plan' },
    { label: 'Debt Negotiation Scripts', href: '/prompts/debt-payoff/debt-negotiation-scripts' },
  ],
  'home-buying': [
    { label: 'Rent vs Buy Decision Analyzer', href: '/prompts/real-estate/rent-vs-buy-decision-framework' },
  ],
  'investing': [
    { label: 'FIRE Roadmap Prompt', href: '/prompts/investing/fire-number-roadmap' },
    { label: 'Portfolio Risk Analyzer', href: '/prompts/investing/portfolio-risk-analyzer' },
  ],
  'student-loans': [
    { label: 'Debt Payoff Plan Prompt', href: '/prompts/debt-payoff/debt-snowball-action-plan' },
  ],
};

interface CategoryPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return CATEGORIES.map(cat => ({ slug: cat.slug }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = CATEGORIES.find(c => c.slug === params.slug);
  if (!category) return {};

  return {
    title: category.metaTitle,
    description: category.metaDescription,
    keywords: category.keywords,
    alternates: { canonical: `${SITE_URL}/category/${category.slug}` },
    openGraph: {
      title: category.metaTitle,
      description: category.metaDescription,
      url: `${SITE_URL}/category/${category.slug}`,
      siteName: 'DebtMeltPro',
    },
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = CATEGORIES.find(c => c.slug === params.slug);
  if (!category) notFound();

  const categoryTools = TOOLS.filter(t => category.toolSlugs.includes(t.slug));
  const otherCategories = CATEGORIES.filter(c => c.slug !== params.slug);
  const relatedBlogSlugs = CATEGORY_BLOG_MAP[category.slug] ?? [];
  const relatedBlogs = BLOG_POSTS.filter(p => relatedBlogSlugs.includes(p.slug));
  const relatedPrompts = CATEGORY_PROMPT_MAP[category.slug] ?? [];

  const collectionSchema = generateWebPageSchema({
    title: category.title,
    description: category.metaDescription,
    url: `${SITE_URL}/category/${category.slug}`,
  });
  return (
    <>
       <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />

  
      <Breadcrumb items={[
        { label: 'Categories', href: '/' },
        { label: category.title, href: `/category/${category.slug}` },
      ]} />

      {/* Hero */}
      <section className="bg-gradient-to-b from-green-50 to-white dark:from-slate-900 dark:to-slate-950 border-b border-slate-100 dark:border-slate-800 py-10 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3">
            {category.title}
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            {category.description}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <AdSlotLeaderboard className="mt-6" />
      </div>
      {/* Intro Content — SEO */}
      {category.introContent && (
        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            {category.introContent}
          </p>
        </section>
      )}
      {/* Tools Grid */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-6">
          Free {category.title}
        </h2>
        <div className="space-y-4">
          {categoryTools.map(tool => {
            const Icon = ICON_MAP[tool.icon] ?? TrendingDown;
            return (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="group flex items-start gap-5 p-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:shadow-md transition-shadow"
              >
                <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-700 group-hover:bg-green-50 dark:group-hover:bg-green-950 transition-colors shrink-0">
                  <Icon className={`w-6 h-6 text-slate-600 dark:text-slate-400 transition-colors ${tool.accentColor}`} aria-hidden="true" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                      {tool.title}
                    </h3>
                    {tool.badge && (
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${tool.badgeColor}`}>
                        {tool.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
                    {tool.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-green-600 dark:text-green-400 text-sm font-medium">
                    Open Calculator <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <AdSlotInContent />
      </div>
      {/* Related Blog Posts — Internal Linking */}
      {relatedBlogs.length > 0 && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white mb-4">
            Related Articles
          </h2>
          <div className="space-y-3">
            {relatedBlogs.map(post => (
              <Link key={post.slug} href={`/blog/${post.slug}`}
                className="group flex items-center justify-between p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:shadow-sm transition-shadow">
                <div>
                  <h3 className="font-medium text-sm text-slate-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">{post.readTime}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-green-500 shrink-0 ml-3" />
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Related Prompts — Internal Linking */}
      {relatedPrompts.length > 0 && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white mb-4">
            AI Prompts for {category.title.replace(' Tools', '')}
          </h2>
          <div className="flex flex-wrap gap-3">
            {relatedPrompts.map(prompt => (
              <Link key={prompt.href} href={prompt.href}
                className="text-sm font-medium px-4 py-2 rounded-full bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors">
                {prompt.label} →
              </Link>
            ))}
          </div>
        </section>
      )}
      {/* Other Categories */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-6">
          Explore Other Categories
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {otherCategories.map(cat => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="group p-5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:shadow-sm transition-shadow"
            >
              <h3 className="font-semibold text-slate-900 dark:text-white text-sm group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors mb-1">
                {cat.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                {cat.description}
              </p>
              <span className="text-xs text-slate-400 mt-2 block">
                {cat.toolSlugs.length} tool{cat.toolSlugs.length !== 1 ? 's' : ''}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
