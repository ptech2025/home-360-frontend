"use client";
import { authClient } from "@/lib/auth-client";
function SignedOut({ children }: { children: React.ReactNode }) {
  const { data } = authClient.useSession();

  if (data) {
    return null;
  }

  return <>{children}</>;
}
function SignedIn({ children }: { children: React.ReactNode }) {
  const { data } = authClient.useSession();

  if (!data) {
    return null;
  }

  return <>{children}</>;
}
export { SignedOut, SignedIn };
