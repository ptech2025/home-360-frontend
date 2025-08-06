"use client";
import { authClient } from "@/lib/auth-client";
async function SignedOut({ children }: { children: React.ReactNode }) {
  const { data } = authClient.useSession();

  if (data) {
    return null;
  }

  return <>{children}</>;
}
async function SignedIn({ children }: { children: React.ReactNode }) {
  const { data } = authClient.useSession();

  if (!data) {
    return null;
  }

  return <>{children}</>;
}
export { SignedOut, SignedIn };
