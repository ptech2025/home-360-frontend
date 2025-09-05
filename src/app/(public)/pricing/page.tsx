import FAQs from "@/components/global/FAQs";
import PricingPageWrapper from "@/components/pricing/PricingPageWrapper";
import { fetchSubscriptionsServer, fetchUserServer } from "@/lib/actions";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
async function PricingPage() {
  const queryClient = new QueryClient();

  const user = await fetchUserServer();

  await queryClient.prefetchQuery({
    queryKey: ["subscriptions"],
    queryFn: () => fetchSubscriptionsServer(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PricingPageWrapper user={user} />
      <FAQs isHome={false} />
    </HydrationBoundary>
  );
}
export default PricingPage;
