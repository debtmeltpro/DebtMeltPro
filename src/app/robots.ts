// ============================================================
// DebtMeltPro — robots.txt
// Instructs search crawlers on indexing policy.
// Allows all public pages, blocks API and build artifacts.
// Allows AI search bots (ChatGPT, Claude, Perplexity) for
// maximum visibility in AI-powered search results.
// ============================================================

import type { MetadataRoute } from 'next';

const SITE_URL = process.env['NEXT_PUBLIC_SITE_URL'] ?? 'https://debtmeltpro.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
       { userAgent: 'Googlebot', allow: '/' }, 
       { userAgent: 'AdsBot-Google', allow: '/' }, 
       { userAgent: 'Bingbot', allow: '/' },
       { userAgent: 'GPTBot', allow: '/' },
       { userAgent: 'OAI-SearchBot', allow: '/' },
       { userAgent: 'PerplexityBot', disallow: '/' }, 
       { userAgent: 'Perplexity-User', disallow: '/' }, 
       { userAgent: 'Claude-User', disallow: '/' }, 
       { userAgent: 'Claude-SearchBot', disallow: '/' },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}