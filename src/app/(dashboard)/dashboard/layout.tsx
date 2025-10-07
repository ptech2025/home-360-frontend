import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import { fetchUserServer } from "@/lib/actions";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await fetchUserServer();

  if (!user) {
    redirect("/sign-in");
  }

  if (!user.isOnboarded || user.homes.length === 0) {
    redirect("/onboarding");
  }

  return (
    <>
      <DashboardNavbar user={user} />
      <main className="min-h-svh  w-full">{children}</main>
    </>
  );
}
