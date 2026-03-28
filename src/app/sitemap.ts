// ============================================================
// DebtFreedom — Dynamic Sitemap
// Generates sitemap.xml at build time for 100/100 SEO score.
// All tool pages are included with priority and changeFreq.
// ============================================================

import type { MetadataRoute } from 'next';

const SITE_URL = process.env['NEXT_PUBLIC_SITE_URL'] ?? 'https://debtfreedom.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    // Homepage — highest priority
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    // Tool pages — all equal high priority (core content)
    {
      url: `${SITE_URL}/tools/debt-payoff`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/tools/mortgage-calculator`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/tools/compound-interest`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/tools/credit-card-payoff`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/tools/student-loan`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    // Legal pages — lower priority, rarely change
    {
      url: `${SITE_URL}/privacy-policy`,
      lastModified: new Date('2024-01-01'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: new Date('2024-01-01'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];
}
