import OnboardingWrapper from "@/components/onboarding/OnboardingWrapper";
import { fetchUserServer } from "@/lib/actions";
import {
  HydrationBoundary,
  dehydrate,
  QueryClient,
} from "@tanstack/react-query";
import { redirect } from "next/navigation";

async function OnboardingPage() {
  const queryClient = new QueryClient();
  const user = await fetchUserServer();

  if (!user) {
    redirect("/sign-in");
  }
  if (user.isOnboarded && user.homes.length > 0) {
    const firstHome = user.homes[0];
    redirect(`/dashboard/${firstHome.id}`);
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <OnboardingWrapper homes={user.homes} />
    </HydrationBoundary>
  );
}
export default OnboardingPage;
