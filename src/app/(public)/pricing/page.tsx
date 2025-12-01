import PricingPageWrapper from "@/components/pricing/PricingPageWrapper";
import {  fetchUserServerWithCookies } from "@/lib/actions";
import { subscriptionQueries } from "@/queries/subscription";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import type { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Choose the perfect Home360 plan for your needs. Manage your homes, documents, appliances, and maintenance with flexible pricing options.",
  alternates: {
    canonical: "/pricing",
  },
  openGraph: {
    title: "Pricing | Home360",
    description:
      "Choose the perfect Home360 plan for your needs. Manage your homes, documents, appliances, and maintenance with flexible pricing options.",
    url: "https://myhomethreesixty.com/pricing",
  },
};

async function PricingPage() {
  const queryClient = new QueryClient();

  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();
  const user = await fetchUserServerWithCookies(cookieHeader);

  await queryClient.prefetchQuery(subscriptionQueries.fetchPlans());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
    <PricingPageWrapper user={user} />
    </HydrationBoundary>
  );
}
export default PricingPage;
