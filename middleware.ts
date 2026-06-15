import { NextResponse, type NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  return NextResponse.redirect(new URL('/dashboard/super-admin', request.url));
}

export const config = {
  matcher: ['/dashboard'],
};
