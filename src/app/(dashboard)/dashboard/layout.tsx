import AllChatSessionsSheet from "@/components/chat/AllChatSessionsSheet";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
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
    <SidebarProvider>
      {/* <DashboardSidebar user={user} />
      <AllChatSessionsSheet sessions={sessions} />
      <main className="px-2  w-full bg-white">{children}</main> */}
    </SidebarProvider>
  );
}
