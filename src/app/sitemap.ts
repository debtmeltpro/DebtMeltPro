// ============================================================
// DebtFreedom — Dynamic Sitemap
// Includes all tools, categories, blog posts, and legal pages.
// Auto-generates at build time for optimal SEO indexing.
// ============================================================

import type { MetadataRoute } from 'next';
import { TOOLS, CATEGORIES } from '@/lib/seo';
import { BLOG_POSTS } from './blog/page';

const SITE_URL = process.env['NEXT_PUBLIC_SITE_URL'] ?? 'https://debtfreedom.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Core pages
  const corePages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
  ];

  // Tool pages (highest priority after homepage)
  const toolPages: MetadataRoute.Sitemap = TOOLS.map(tool => ({
    url: `${SITE_URL}/tools/${tool.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  // Category pages
  const categoryPages: MetadataRoute.Sitemap = CATEGORIES.map(cat => ({
    url: `${SITE_URL}/category/${cat.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Blog posts
  const blogPages: MetadataRoute.Sitemap = BLOG_POSTS.map(post => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Legal pages (low priority)
  const legalPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/privacy-policy`, lastModified: new Date('2024-01-15'), changeFrequency: 'yearly' as const, priority: 0.3 },
    { url: `${SITE_URL}/terms`, lastModified: new Date('2024-01-15'), changeFrequency: 'yearly' as const, priority: 0.3 },
    { url: `${SITE_URL}/disclaimer`, lastModified: new Date('2024-01-15'), changeFrequency: 'yearly' as const, priority: 0.3 },
  ];

  return [...corePages, ...toolPages, ...categoryPages, ...blogPages, ...legalPages];
}
