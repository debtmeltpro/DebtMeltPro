// ============================================================
// DebtMeltPro — Maintenance Mode Middleware
//
// HOW TO USE
//   Enable:  Set NEXT_PUBLIC_MAINTENANCE_MODE=true in Vercel env vars
//   Disable: Set NEXT_PUBLIC_MAINTENANCE_MODE=false (or delete it)
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

  // Check if maintenance mode is enabled
  const isMaintenanceMode = process.env['NEXT_PUBLIC_MAINTENANCE_MODE'] === 'true';

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

  // Redirect everything else to maintenance page
  const maintenanceUrl = new URL('/maintenance', request.url);
  return NextResponse.rewrite(maintenanceUrl);
}

export const config = {
  matcher: [
    // Match all paths except static files
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
