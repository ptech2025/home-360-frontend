import FAQs from "@/components/global/FAQs";
import PricingTabs from "@/components/pricing/PricingTabs";
import { fetchUserServer } from "@/lib/actions";
import { subscriptionQueries } from "@/queries/subscription";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
async function PricingPage() {
  const queryClient = new QueryClient();

  const user = await fetchUserServer();

  const currentPlan = user && user.subscription ? user.subscription.plan : null;

  await queryClient.prefetchQuery(subscriptionQueries.fetchPlans());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PricingTabs
        currentPlan={currentPlan}
        type={currentPlan ? "change" : "onboarding"}
      />
      <FAQs />
    </HydrationBoundary>
  );
}
export default PricingPage;
