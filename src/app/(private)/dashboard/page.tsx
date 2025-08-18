import DashboardWrapper from "@/components/dashboard/DashboardWrapper";
import OnboardingWrapper from "@/components/onboarding/OnboardingWrapper";
import { fetchUserServer } from "@/lib/actions";
import {
  HydrationBoundary,
  dehydrate,
  QueryClient,
} from "@tanstack/react-query";
import { redirect } from "next/navigation";

async function DashboardPage() {
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
      <DashboardWrapper />
    </HydrationBoundary>
  );
}
export default DashboardPage;
