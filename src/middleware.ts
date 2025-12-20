import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  fetchSession,
  protectDashboard,
  redirectAuthUser,
} from "./proxy";

const privateRoutes = ["/dashboard"];
const authRoutes = [
  "/forgot-password",
  "/reset-password",
  "/sign-in",
  "/sign-up",
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const session = await fetchSession(request);

  const isPrivateRoute = privateRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );
  const isAuthRoute = authRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (isPrivateRoute) {
    const res = await protectDashboard(request, session);
    if (res) return res;
  }

  if (isAuthRoute) {
    console.log("running auth route middleware");
    const res = await redirectAuthUser(request, session);

    if (res) return res;
  }

  return NextResponse.next();
}

export const config = {
  runtime: "nodejs",
  matcher: ["/((?!.*\\..*|_next|\\.png).*)", "/"],
};
