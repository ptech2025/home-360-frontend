import LayoutScreen from "@/components/auth/LayoutScreen";

function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-dvh  p-4 max-w-[1400px] mx-auto w-full grid-cols-2 items-center grid gap-6">
      <LayoutScreen />
      {children}
    </main>
  );
}
export default AuthLayout;
