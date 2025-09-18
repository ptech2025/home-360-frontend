import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import { fetchUserServer } from "@/lib/actions";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const user = await fetchUserServer();

  // if (!user) {
  //   return null;
  //   // redirect("/sign-in");
  // }
  // if (!user.isOnboarded || !user.hasProjects) {
  //   redirect("/onboarding");
  // }

  return (
    <>
      <DashboardNavbar user={null} />
      <main className="min-h-svh max-w-[1800px] mx-auto px-4 md:px-6 lg:px-8 py-4  w-full">{children}</main>;
    </>
  );
}
