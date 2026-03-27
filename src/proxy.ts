import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // 1. Check if the user is trying to access the login page
  const isLoginPage = request.nextUrl.pathname === "/login";

  // 2. Check if they have the secure login cookie we set in our auth action
  const sessionToken = request.cookies.get("vocabmon_session");

  // 3. If they are NOT logged in, and they are NOT already on the login page...
  if (!sessionToken && !isLoginPage) {
    // ...Bounce them to the login page!
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 4. If they ARE logged in, but they try to go to the login page...
  if (sessionToken && isLoginPage) {
    // ...Bounce them back to the dashboard!
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 5. Otherwise, let them proceed normally
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  // This tells Next.js exactly which routes the middleware should protect.
  // We exclude api routes, static files (_next/static), images, and favicons.
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
