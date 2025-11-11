import { fetchUserServer } from "@/lib/actions";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import SettingsPageWrapper from "@/components/settings/SettingsPageWrapper";
import { redirect } from "next/navigation";

async function SettingsPage() {
  const queryClient = new QueryClient();
  const user = await fetchUserServer();
  if (!user) {
    redirect("/sign-in");
  }
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SettingsPageWrapper user={user} />
    </HydrationBoundary>
  );
}
export default SettingsPage;
