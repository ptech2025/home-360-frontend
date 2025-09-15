import AllChatSessionsSheet from "@/components/chat/AllChatSessionsSheet";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { fetchUserSessionsServer, fetchUserServer } from "@/lib/actions";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const user = await fetchUserServer();
  // const sessions = await fetchUserSessionsServer();

  // if (!user) {
  //   redirect("/sign-in");
  // }
  // if (!user.isOnboarded || !user.hasProjects) {
  //   redirect("/onboarding");
  // }

  return (
    <>
      <DashboardNavbar />
      <main className="min-h-dvh  p-6  w-full">{children}</main>;
    </>
  );
}
