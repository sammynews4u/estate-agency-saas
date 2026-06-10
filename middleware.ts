import { NextResponse, type NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Demo routing guard. Replace with Supabase session checks when live auth is wired.
  if (pathname === '/dashboard') {
    return NextResponse.redirect(new URL('/dashboard/super-admin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
