import {
  HydrationBoundary,
  dehydrate,
  QueryClient,
} from "@tanstack/react-query";
import { fetchEstimateByIdServer, fetchUserServer } from "@/lib/actions";
import SingleEstimateWrapper from "@/components/estimates/SingleEstimateWrapper";
import { redirect } from "next/navigation";

async function SingleEstimatePage({
  params,
}: {
  params: Promise<{ estimateId: string }>;
}) {
  const queryClient = new QueryClient();
  const { estimateId } = await params;
  const user = await fetchUserServer();

  await queryClient.prefetchQuery({
    queryKey: ["estimate", estimateId],
    queryFn: () => fetchEstimateByIdServer(estimateId),
  });

  if (!user) {
    redirect("/sign-in");
  }

  if (!user.isOnboarded) {
    redirect("/onboarding");
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
        <SingleEstimateWrapper
          estimateId={estimateId}
          profile={user.profile!}
          userEmail={user.email}
        />
   
    </HydrationBoundary>
  );
}
export default SingleEstimatePage;
