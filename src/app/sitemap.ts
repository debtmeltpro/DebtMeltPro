// ============================================================
// DebtMeltPro — Dynamic Sitemap
// Includes all tools, categories, blog posts, and legal pages.
// Auto-generates at build time for optimal SEO indexing.
//
// RULES:
//   - Every URL must map to a real page.tsx that returns 200
//   - No redirect URLs (e.g. /tools redirects → do NOT include)
//   - lastModified uses ISO date strings for stability
// ============================================================

import type { MetadataRoute } from 'next';
import { TOOLS, CATEGORIES } from '@/lib/seo';
import { PROMPT_CATEGORIES, getAllPromptPaths } from '@/lib/prompts';
import { BLOG_POSTS } from '@/lib/blog';

const SITE_URL = process.env['NEXT_PUBLIC_SITE_URL'] || 'https://debtmeltpro.com';

// Use a stable date instead of new Date() to avoid changing on every build.
// Update this when you make meaningful content changes.
const LAST_UPDATED = '2026-04-04';

/** Latest blog post date so /blog lastModified tracks new posts (helps crawlers + GSC). */
function getBlogHubLastModified(): string {
  if (BLOG_POSTS.length === 0) return LAST_UPDATED;
  return BLOG_POSTS.reduce((max, p) => (p.date >= max ? p.date : max), BLOG_POSTS[0]!.date);
}

export default function sitemap(): MetadataRoute.Sitemap {
  const blogHubLastModified = getBlogHubLastModified();

  // Core pages — only include URLs with actual page.tsx files
  const corePages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: LAST_UPDATED, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${SITE_URL}/about`, lastModified: LAST_UPDATED, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/contact`, lastModified: LAST_UPDATED, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${SITE_URL}/blog`, lastModified: blogHubLastModified, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/prompts`, lastModified: LAST_UPDATED, changeFrequency: 'weekly', priority: 0.9 },
  ];
  // NOTE: /tools is NOT included — it redirects to / (302) and would cause sitemap errors.

  // Tool pages (highest priority after homepage)
  const toolPages: MetadataRoute.Sitemap = TOOLS.map(tool => ({
    url: `${SITE_URL}/tools/${tool.slug}`,
    lastModified: LAST_UPDATED,
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  // Category pages
  const categoryPages: MetadataRoute.Sitemap = CATEGORIES.map(cat => ({
    url: `${SITE_URL}/category/${cat.slug}`,
    lastModified: LAST_UPDATED,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Blog posts — use their individual publish dates
  const blogPages: MetadataRoute.Sitemap = BLOG_POSTS.map(post => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post.date,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Legal pages (low priority)
  const legalPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/privacy-policy`, lastModified: LAST_UPDATED, changeFrequency: 'yearly' as const, priority: 0.3 },
    { url: `${SITE_URL}/terms`, lastModified: LAST_UPDATED, changeFrequency: 'yearly' as const, priority: 0.3 },
    { url: `${SITE_URL}/disclaimer`, lastModified: LAST_UPDATED, changeFrequency: 'yearly' as const, priority: 0.3 },
  ];

  // Prompt category pages
  const promptCategoryPages: MetadataRoute.Sitemap = PROMPT_CATEGORIES.map(cat => ({
    url: `${SITE_URL}/prompts/${cat.slug}`,
    lastModified: LAST_UPDATED,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Individual prompt pages
  const promptPages: MetadataRoute.Sitemap = getAllPromptPaths().map(p => ({
    url: `${SITE_URL}/prompts/${p.category}/${p.slug}`,
    lastModified: LAST_UPDATED,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...corePages, ...toolPages, ...categoryPages, ...promptCategoryPages, ...promptPages, ...blogPages, ...legalPages];
}
