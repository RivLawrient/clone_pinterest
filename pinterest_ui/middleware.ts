import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("auth-token");

  if (request.nextUrl.pathname != "/") {
    if (!token) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
}
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
