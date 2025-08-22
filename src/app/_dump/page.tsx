import NewChatWrapper from "@/components/chat/NewChatWrapper";
import { fetchUserServer } from "@/lib/actions";
import { redirect } from "next/navigation";
import RedirectOrToggleSidebar from "@/components/chat/RedirectOrToggleSidebar";

export default async function ChatEntryPage() {
  const user = await fetchUserServer();
  if (!user) {
    redirect("/sign-in");
  }
  if (!user.isOnboarded || !user.hasProjects) {
    redirect("/onboarding");
  }
  return (
    <section className="w-full h-full py-4  flex-col flex gap-4">
      <RedirectOrToggleSidebar url="/dashboard/projects" showRedirect={true} />
      <NewChatWrapper userId={user.id} />
    </section>
  );
}
