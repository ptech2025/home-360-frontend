import { NextRequest, NextResponse } from "next/server";
import { betterFetch } from "@better-fetch/fetch";
import { SessionType } from "@/lib/auth-client";
import { API_URL } from "@/utils/constants";

const onboardingRoutes = ["/onboarding"];

export const fetchSession = async (
  req: NextRequest
): Promise<SessionType | null> => {
  const cookie = req.headers.get("cookie");
  const TIMEOUT_MS = 800;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const { data: session } = await betterFetch<SessionType>(
      "/api/auth/get-session",
      {
        baseURL: API_URL,
        headers: { cookie: cookie || "" },
        signal: controller.signal,
      }
    );
    return session;
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      console.error(`Session fetch aborted after ${TIMEOUT_MS}ms`);
    } else {
      console.error("Session fetch failed:", err);
    }
    return null;
  } finally {
    clearTimeout(timeout);
  }
};

export const protectDashboard = async (
  req: NextRequest,
  session: SessionType | null
) => {
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

export const redirectAuthUser = async (
  req: NextRequest,
  session: SessionType | null
) => {
  if (session) {
    const isOnboarded = session.user.isOnboarded;
    const currentPath = req.nextUrl.pathname;
    const redirectPath = isOnboarded ? "/dashboard/settings" : "/onboarding";

    if (isOnboarded) {
      const isInOnboardedRoute =
        currentPath.startsWith("/dashboard") || currentPath === "/onboarding";

      if (!isInOnboardedRoute && currentPath !== redirectPath) {
        const url = req.nextUrl.clone();
        url.pathname = redirectPath;
        return NextResponse.redirect(url);
      }
    } else {
      if (currentPath !== redirectPath) {
        const url = req.nextUrl.clone();
        url.pathname = redirectPath;
        return NextResponse.redirect(url);
      }
    }
  }

  return NextResponse.next();
};
