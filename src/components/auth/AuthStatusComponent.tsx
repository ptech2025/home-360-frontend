async function SignedOut({ children }: { children: React.ReactNode }) {
  const data = "";

  if (data) {
    return null;
  }

  return <>{children}</>;
}
async function SignedIn({ children }: { children: React.ReactNode }) {
  const data = "";

  if (!data) {
    return null;
  }

  return <>{children}</>;
}
export { SignedOut, SignedIn };
