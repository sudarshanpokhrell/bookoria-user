import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

// Define the URL for redirections
const signInPage = "/sign-in";
const homePage = "/";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (
    (req.nextUrl.pathname === "/profile") &&
    !token
  ) {
    return NextResponse.redirect(new URL(signInPage, req.url));
  }

  if (
    token &&
    (req.nextUrl.pathname === signInPage ||
      req.nextUrl.pathname === "/sign-up" ||
      req.nextUrl.pathname === "/verify-code")
  ) {
    return NextResponse.redirect(new URL(homePage, req.url));
  }

  return NextResponse.next();
}

// Define the paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
