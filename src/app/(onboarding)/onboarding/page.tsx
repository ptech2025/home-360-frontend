import OnboardingWrapper from "@/components/onboarding/OnboardingWrapper";
import { fetchUserServerWithCookies } from "@/lib/actions";
import {
  HydrationBoundary,
  dehydrate,
  QueryClient,
} from "@tanstack/react-query";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { subscriptionQueries } from "@/queries/subscription";

async function OnboardingPage() {
  const queryClient = new QueryClient();
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const [user] = await Promise.all([
    fetchUserServerWithCookies(cookieHeader),
    queryClient.prefetchQuery(subscriptionQueries.fetchPlans()),
  ]);

  if (!user) {
    redirect("/sign-in");
  }
  const firstActiveHome = user.homes.filter((home) => home.active)[0];
  if (user.isOnboarded && firstActiveHome) {
    redirect(`/dashboard/${firstActiveHome.id}`);
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <OnboardingWrapper homes={user.homes} subscription={user.subscription} />
    </HydrationBoundary>
  );
}
export default OnboardingPage;
