// ============================================================
// DebtMeltPro — Related Tools Component
// Internal linking section shown at the bottom of every tool.
// Improves crawlability, session duration, and topic authority.
// ============================================================

import Link from 'next/link';
import { ArrowRight, TrendingDown, Home, Flame, CreditCard, GraduationCap } from 'lucide-react';
import { getRelatedTools } from '@/lib/seo';

const ICON_MAP: Record<string, React.ElementType> = {
  TrendingDown,
  Home,
  Flame,
  CreditCard,
  GraduationCap,
};

interface RelatedToolsProps {
  currentSlug: string;
  heading?: string;
}

export function RelatedTools({ currentSlug, heading = 'Try More Free Tools' }: RelatedToolsProps) {
  const related = getRelatedTools(currentSlug, 4);

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12" aria-labelledby="related-tools-heading">
      <h2
        id="related-tools-heading"
        className="font-display text-2xl font-bold text-slate-900 dark:text-white text-center mb-8"
      >
        {heading}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {related.map(tool => {
          const Icon = ICON_MAP[tool.icon] ?? TrendingDown;
          return (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              className="group flex items-start gap-4 p-5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:shadow-md transition-shadow"
            >
              <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-700 group-hover:bg-green-50 dark:group-hover:bg-green-950 transition-colors shrink-0">
                <Icon className={`w-5 h-5 text-slate-600 dark:text-slate-400 transition-colors ${tool.accentColor}`} aria-hidden="true" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-slate-900 dark:text-white text-sm group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                  {tool.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                  {tool.description}
                </p>
                <span className="inline-flex items-center gap-1 text-green-600 dark:text-green-400 text-xs font-medium mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  Open Calculator <ArrowRight className="w-3 h-3" aria-hidden="true" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
      <div className="text-center mt-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors"
        >
          View All Free Tools
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
