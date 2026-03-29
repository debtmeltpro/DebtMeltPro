import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// ============================================================
// DebtMeltPro — Maintenance Mode
// ON  karna: MAINTENANCE_MODE = true  → git push
// OFF karna: MAINTENANCE_MODE = false → git push
// ============================================================

const MAINTENANCE_MODE = true;

const ALLOWED_PATHS = [
  '/maintenance',
  '/favicon.ico',
  '/robots.txt',
  '/sitemap.xml',
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Static files allow karo
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    ALLOWED_PATHS.includes(pathname)
  ) {
    return NextResponse.next();
  }

  // Maintenance mode ON hai to sab ko maintenance page bhejo
  if (MAINTENANCE_MODE) {
    const url = request.nextUrl.clone();
    url.pathname = '/maintenance';
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
