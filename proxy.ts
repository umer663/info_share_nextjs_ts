import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.AUTH_SECRET || "fallback-dev-secret-do-not-use-in-production"
);
const COOKIE_NAME = "session";

const publicPaths = [
  "/",
  "/about",
  "/content",
  "/contact",
  "/login",
  "/signup",
  "/api/auth/login",
  "/api/auth/signup",
  "/api/auth/forgot-password",
  "/api/auth/reset-password",
  "/api/auth/verify-email",
];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (publicPaths.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/_next") || pathname.startsWith("/favicon")) {
    return NextResponse.next();
  }

  const token = request.cookies.get(COOKIE_NAME)?.value;

  if (!token) {
    if (pathname.startsWith("/dashboard") || pathname.startsWith("/account")) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    const session = payload as unknown as {
      id: string;
      email: string;
      role: string;
      type: string;
    };

    if (pathname.startsWith("/dashboard")) {
      if (session.type !== "admin") {
        return NextResponse.redirect(new URL("/account", request.url));
      }
    }

    if (pathname.startsWith("/account")) {
      if (session.type !== "customer") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    }

    if (pathname.startsWith("/login") || pathname.startsWith("/signup")) {
      if (session.type === "admin") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
      if (session.type === "customer") {
        return NextResponse.redirect(new URL("/account", request.url));
      }
    }

    return NextResponse.next();
  } catch {
    if (pathname.startsWith("/dashboard") || pathname.startsWith("/account")) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
