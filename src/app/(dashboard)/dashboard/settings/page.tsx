import SettingsPageWrapper from "@/components/settings/SettingsPageWrapper";
import { fetchUserServer } from "@/lib/actions";
import {
  HydrationBoundary,
  dehydrate,
  QueryClient,
} from "@tanstack/react-query";
import { redirect } from "next/navigation";

async function SettingPage() {
  const queryClient = new QueryClient();
  const user = await fetchUserServer();

  if (!user) {
    redirect("/sign-in");
  }

  if (!user.isOnboarded) {
    redirect("/onboarding");
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SettingsPageWrapper />
    </HydrationBoundary>
  );
}
export default SettingPage;
