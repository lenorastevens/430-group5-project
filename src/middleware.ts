import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';




export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  //Redirect unauthenticated users to login
  if (pathname.startsWith('/protected-route') && !req.cookies.get('token')) {
    const url = req.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(`${req.nextUrl.origin}${url.pathname}`);
  }

  return NextResponse.next();
}
