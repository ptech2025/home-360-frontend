import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  protectAdmin,
  protectDashboard,
  redirectAuthUser,
} from "./middlewares";

const privateRoutes = ["/dashboard", "/onboarding"];
const authRoutes = [
  "/forgot-password",
  "/reset-password",
  "/sign-in",
  "/sign-up",
];

const adminRoutes = ["/admin"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isPrivateRoute = privateRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );
  const isAuthRoute = authRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );
  const isAdminRoute = adminRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (isPrivateRoute) {
    console.log("running private route middleware");
    const res = await protectDashboard(request);
    console.log("private route middlewares", res);
    if (res) return res;
  }

  if (isAdminRoute) {
    console.log("running admin route middleware");
    const res = await protectAdmin(request);
    if (res) return res;
  }

  if (isAuthRoute) {
    console.log("running auth route middleware");
    const res = await redirectAuthUser(request);
    console.log("auth route middlewares", res);

    if (res) return res;
  }

  // optional "production lock" — but only if you still want it
  if (process.env.APP_ENV === "production" && pathname !== "/") {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.*\\..*|_next|\\.png).*)", "/"],
};
