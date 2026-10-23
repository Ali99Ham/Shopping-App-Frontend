import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("Authentication")?.value;
  const { pathname } = request.nextUrl;

  const isAuthPage = pathname.includes("/auth");

  if (isAuthPage && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!isAuthPage && !token) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
