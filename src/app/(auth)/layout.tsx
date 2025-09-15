import LayoutScreen from "@/components/auth/LayoutScreen";

function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-dvh  p-4 max-w-[1200px] mx-auto w-full md:grid-cols-2 items-center grid gap-6">
      {children}
      <LayoutScreen />
    </main>
  );
}
export default AuthLayout;
