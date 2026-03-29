// ============================================================
// DebtMeltPro — Maintenance Mode Middleware
// MAINTENANCE ON  karna ho to: MAINTENANCE_MODE = true
// MAINTENANCE OFF karna ho to: MAINTENANCE_MODE = false
// Phir git push karo — automatically deploy hoga
// ============================================================

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// ⚡ SIRF YE LINE CHANGE KARO ⚡
const MAINTENANCE_MODE = true; // true = ON, false = OFF

// Ye pages maintenance mein bhi accessible rahenge
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

  // Bypass paths skip karo
  const shouldBypass = BYPASS_PATHS.some((path) =>
    pathname.startsWith(path)
  );

  if (shouldBypass) {
    return NextResponse.next();
  }

  // Maintenance mode ON hai aur user maintenance page pe nahi hai
  if (MAINTENANCE_MODE && pathname !== '/maintenance') {
    return NextResponse.rewrite(
      new URL('/maintenance', request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};