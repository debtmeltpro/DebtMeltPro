import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, TrendingDown, Home, Flame, CreditCard, GraduationCap } from 'lucide-react';
import { Breadcrumb } from '@/components/seo/Breadcrumb';
import { CATEGORIES, TOOLS, SITE_URL, generateBreadcrumbSchema } from '@/lib/seo';
import { AdSlotLeaderboard, AdSlotInContent } from '@/components/molecules/AdSlot';

const ICON_MAP: Record<string, React.ElementType> = {
  TrendingDown, Home, Flame, CreditCard, GraduationCap,
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
      siteName: 'DebtFreedom',
    },
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = CATEGORIES.find(c => c.slug === params.slug);
  if (!category) notFound();

  const categoryTools = TOOLS.filter(t => category.toolSlugs.includes(t.slug));
  const otherCategories = CATEGORIES.filter(c => c.slug !== params.slug);

  return (
    <>
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
