import { NextRequest, NextResponse } from "next/server";
import { betterFetch } from "@better-fetch/fetch";
import { SessionType } from "@/lib/auth-client";
import { API_URL } from "@/utils/constants";

const onboardingRoutes = ["/onboarding"];

const fetchSession = async (req: NextRequest) => {
  const cookie = req.headers.get("cookie");
  const tokenKey =
    process.env.NODE_ENV === "production"
      ? "__Secure-better-auth.session_token"
      : "better-auth.session_token";
  const token = req.cookies.get(tokenKey)?.value;

  const { data: session } = await betterFetch<SessionType>(
    "/api/auth/get-session",
    {
      baseURL: API_URL,
      headers: {
        cookie: cookie || "",
        Authorization: `Bearer ${encodeURIComponent(token || "")}`,
      },
    }
  );

  if (process.env.NODE_ENV === "production") {
    console.log("staging session", session);
    console.log("staging token", encodeURIComponent(token || ""));
  } else {
    console.log("dev session", session);
    console.log("dev token", encodeURIComponent(token || ""));
  }

  return session;
};

export const protectDashboard = async (req: NextRequest) => {
  const session = await fetchSession(req);
  if (!session) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  } else if (
    !session.user.isOnboarded &&
    !onboardingRoutes.includes(req.nextUrl.pathname)
  ) {
    return NextResponse.redirect(new URL("/onboarding", req.url));
  }
  return NextResponse.next();
};

export const protectAdmin = async (req: NextRequest) => {
  const session = await fetchSession(req);
  if (!session || session.user.role !== "admin") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
};

export const redirectAuthUser = async (req: NextRequest) => {
  const session = await fetchSession(req);

  if (session) {
    const redirectPath = session.user.isOnboarded
      ? "/dashboard"
      : "/onboarding";
    return NextResponse.redirect(new URL(redirectPath, req.url));
  }
  return NextResponse.next();
};
