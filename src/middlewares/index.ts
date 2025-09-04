import { NextRequest, NextResponse } from "next/server";
import { betterFetch } from "@better-fetch/fetch";
import { SessionType } from "@/lib/auth-client";
import { API_URL } from "@/utils/constants";

const onboardingRoutes = ["/onboarding"];

// export const fetchSession = async (req: NextRequest) => {
//   const cookie = req.headers.get("cookie");

//   const { data: session } = await betterFetch<SessionType>(
//     "/api/auth/get-session",
//     {
//       baseURL: API_URL,
//       headers: {
//         cookie: cookie || "",
//       },
//     }
//   );

//   return session;
// };

export const fetchSession = async (
  req: NextRequest
): Promise<SessionType | null> => {
  const cookie = req.headers.get("cookie");

  try {
    const { data: session } = await betterFetch<SessionType>(
      "/api/auth/get-session",
      {
        baseURL: API_URL,
        headers: { cookie: cookie || "" },
      }
    );
    return session;
  } catch (err) {
    console.error("Session fetch failed:", err);
    return null; // gracefully degrade
  }
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
  if (session && session.user.role !== "admin") {
    return NextResponse.redirect(new URL("/dashboard/projects", req.url));
  }

  return NextResponse.next();
};

export const redirectAuthUser = async (req: NextRequest) => {
  const session = await fetchSession(req);

  if (session) {
    const isOnboarded = session.user.isOnboarded;
    const currentPath = req.nextUrl.pathname;
    const redirectPath = isOnboarded ? "/dashboard/projects" : "/onboarding";

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
