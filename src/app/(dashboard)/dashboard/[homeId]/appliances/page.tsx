import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { cookies } from "next/headers";
import { userQueries } from "@/queries/user";
import AppliancePageWrapper from "@/components/appliance/AppliancePageWrapper";

async function AppliancesPage(
  props: PageProps<"/dashboard/[homeId]/appliances">
) {
  const { homeId } = await props.params;
  const queryClient = new QueryClient();
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();
  await Promise.all([
    queryClient.prefetchQuery(
      userQueries.withCookies(cookieHeader).singleHome(homeId)
    ),
  ]);
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AppliancePageWrapper homeId={homeId} />
    </HydrationBoundary>
  );
}
export default AppliancesPage;
