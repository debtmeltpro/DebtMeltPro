import { NextResponse } from 'next/server';
//import type { NextRequest } from 'next/request';

// ⚡ SET TO true TO LOCK THE SITE
const MAINTENANCE_MODE = true; 

const BYPASS_PATHS = [
  '/_next',
  '/favicon.ico',
  '/robots.txt',
  '/sitemap.xml',
  '/maintenance',
  '/api/health',
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const shouldBypass = BYPASS_PATHS.some((path) => pathname.startsWith(path));
  if (shouldBypass) return NextResponse.next();

  if (MAINTENANCE_MODE) {
    // This "rewrites" every request to the maintenance page content
    if (pathname !== '/maintenance') {
      return NextResponse.rewrite(new URL('/maintenance', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};