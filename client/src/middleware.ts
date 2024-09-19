import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  if (!token && request.nextUrl.pathname.startsWith("/Dashboard")) {
    return NextResponse.redirect(new URL("/Signup", request.url));
  }

  if (
    token &&
    (request.nextUrl.pathname.startsWith("/Signup") ||
      request.nextUrl.pathname.startsWith("/Login"))
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/Dashboard", "/Dashboard/:path*", "/Signup", "/Login"],
};
