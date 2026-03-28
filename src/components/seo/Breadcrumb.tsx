// ============================================================
// DebtFreedom — Breadcrumb Navigation
// SEO: Generates BreadcrumbList schema markup.
// UI: Clean accessible breadcrumb trail on every page.
// ============================================================

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { generateBreadcrumbSchema, SITE_URL } from '@/lib/seo';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  const schemaItems = [
    { name: 'Home', url: SITE_URL },
    ...items.map(item => ({ name: item.label, url: `${SITE_URL}${item.href}` })),
  ];

  const schema = generateBreadcrumbSchema(schemaItems);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <nav
        aria-label="Breadcrumb"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3"
      >
        <ol className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 flex-wrap">
          <li>
            <Link
              href="/"
              className="inline-flex items-center gap-1 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
            >
              <Home className="w-3.5 h-3.5" aria-hidden="true" />
              <span className="sr-only sm:not-sr-only">Home</span>
            </Link>
          </li>
          {items.map((item, i) => {
            const isLast = i === items.length - 1;
            return (
              <li key={item.href} className="flex items-center gap-1.5">
                <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" aria-hidden="true" />
                {isLast ? (
                  <span className="font-medium text-slate-700 dark:text-slate-200 truncate max-w-[200px] sm:max-w-none" aria-current="page">
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors truncate max-w-[150px] sm:max-w-none"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
