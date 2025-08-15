import OnboardingWrapper from "@/components/onboarding/OnboardingWrapper";
import { fetchUserServer } from "@/lib/actions";
import {
  HydrationBoundary,
  dehydrate,
  QueryClient,
} from "@tanstack/react-query";

async function OnboardingPage() {
  const queryClient = new QueryClient();
  const user = await fetchUserServer();

  console.log(user);

  const profile = user?.profile || null;

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <OnboardingWrapper profile={profile} />
    </HydrationBoundary>
  );
}
export default OnboardingPage;
