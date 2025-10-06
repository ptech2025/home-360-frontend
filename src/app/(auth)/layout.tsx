import LayoutScreen from "@/components/auth/LayoutScreen";

function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-dvh  p-4 max-w-[1400px] mx-auto w-full lg:flex-row flex flex-col justify-center lg:justify-between items-center  gap-6">
      <section className="w-full lg:w-1/2 max-w-[600px]">{children}</section>
      <LayoutScreen />
    </main>
  );
}
export default AuthLayout;
