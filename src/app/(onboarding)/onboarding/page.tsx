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

  // if (user.isOnboarded && user.hasProjects) {
  //   redirect("/dashboard/projects");
  // }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <OnboardingWrapper
        // profile={user.profile}
        // name={user.name}
        // userId={user.id}
      />
    </HydrationBoundary>
  );
}
export default OnboardingPage;
