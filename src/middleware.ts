import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const authRoutes = ["/login", "/register", "/payment-guide"];

const roleBasedPrivateRoutes = {
  ADMIN: [/^\/admin/],
};

type Role = keyof typeof roleBasedPrivateRoutes;

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const token = (await cookies()).get("token")?.value;

  let userInfo: { role: string } | null = null;
  try {
    if (token) {
      userInfo = jwtDecode<{ role: string }>(token);
    }
  } catch (err) {
    console.error("Invalid token:", err);
    userInfo = null;
  }

  // Public routes
  if (!userInfo) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    }
    return NextResponse.redirect(
      new URL(`/?redirectPath=${encodeURIComponent(pathname)}`, request.url)
    );
  }

  // Role-based access
  const userRole = userInfo.role as Role;
  if (userRole && roleBasedPrivateRoutes[userRole]) {
    const allowedRoutes = roleBasedPrivateRoutes[userRole];
    const hasAccess = allowedRoutes.some((route) => pathname.match(route));
    if (hasAccess) return NextResponse.next();
  }

  // Default redirect if unauthorized
  return NextResponse.redirect(new URL("/", request.url));
};

export const config = {
  matcher: ["/admin/:path*"],
};
