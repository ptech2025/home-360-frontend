import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { cookies } from "next/headers";
import SingleAppliancePageWrapper from "@/components/appliance/SingleAppliancePageWrapper";
import { applianceQueries } from "@/queries/appliance";

async function SingleAppliancePage(
  props: PageProps<"/dashboard/[homeId]/appliances/[applianceId]">
) {
  const { homeId, applianceId } = await props.params;
  const queryClient = new QueryClient();
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  await Promise.all([
    queryClient.prefetchQuery(
      applianceQueries
        .withCookies(cookieHeader)
        .singleAppliance(homeId, applianceId)
    ),
  ]);
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SingleAppliancePageWrapper homeId={homeId} applianceId={applianceId} />
    </HydrationBoundary>
  );
}
export default SingleAppliancePage;
