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

  // if (!user) {
  //   redirect("/sign-in");
  // }

  console.log(user);
  if (user?.isOnboarded) {
    redirect("/dashboard");
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <OnboardingWrapper profile={user ? user?.profile : null} />
    </HydrationBoundary>
  );
}
export default OnboardingPage;
