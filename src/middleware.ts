// ============================================================
// DebtMeltPro — Maintenance Mode Middleware
//
// HOW TO USE
//   Enable:  Set MAINTENANCE_MODE=true in Vercel env vars
//   Disable: Set MAINTENANCE_MODE=false (or delete it)
//
// All traffic gets redirected to /maintenance except:
//   - The maintenance page itself
//   - API routes
//   - Static files (_next, favicon, images)
//   - Health check endpoint
// ============================================================

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Paths that should NEVER be blocked by maintenance mode
const EXCLUDED_PATHS = [
  '/maintenance',
  '/api',
  '/_next',
  '/favicon.ico',
  '/robots.txt',
  '/sitemap.xml',
  '/og-image.png',
  '/logo.png',
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if maintenance mode is enabled.
  // Keep legacy fallback for older env files using NEXT_PUBLIC_MAINTENANCE_MODE.
  const isMaintenanceMode =
    process.env['MAINTENANCE_MODE'] === 'true' ||
    process.env['NEXT_PUBLIC_MAINTENANCE_MODE'] === 'true';

  if (!isMaintenanceMode) {
    // If maintenance mode is OFF but user visits /maintenance, redirect to home
    if (pathname === '/maintenance') {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }

  // Maintenance mode is ON — check if this path should be excluded
  const isExcluded = EXCLUDED_PATHS.some((path) => pathname.startsWith(path));

  if (isExcluded) {
    return NextResponse.next();
  }

  // Allow static file extensions
  if (pathname.match(/\.(ico|png|jpg|jpeg|svg|gif|webp|css|js|woff|woff2|ttf)$/)) {
    return NextResponse.next();
  }

  // Return temporary outage semantics for SEO-safe maintenance handling.
  return new NextResponse('Service temporarily unavailable', {
    status: 503,
    headers: {
      'cache-control': 'no-store',
      'content-type': 'text/plain; charset=utf-8',
      'retry-after': '600',
      'X-Robots-Tag': 'noindex, nofollow',
    },
  });
}

export const config = {
  matcher: [
    /*
     * Skip Edge middleware entirely for paths that never need redirect / maintenance logic.
     * Cuts Vercel Edge invocations (and latency) on static, API, and public assets.
     *
     * Keep in sync with EXCLUDED_PATHS + extension allowlist in middleware().
     */
    '/((?!api/|_next/static|_next/image|favicon\\.ico|robots\\.txt|sitemap\\.xml|og-image\\.png|logo\\.png|.*\\.(?:ico|png|jpg|jpeg|svg|gif|webp|avif|css|js|mjs|map|json|txt|xml|woff|woff2|ttf|otf|webmanifest)$).*)',
  ],
};
