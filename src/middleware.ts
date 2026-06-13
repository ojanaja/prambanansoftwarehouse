import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/navigation';
import createMiddleware from 'next-intl/middleware';

const intlMiddleware = createMiddleware(routing);

export default function middleware(req: NextRequest): NextResponse {
  return intlMiddleware(req);
}

export const config = {
  matcher: ['/((?!api|studio|_next|_vercel|.*\\..*).*)']
};
