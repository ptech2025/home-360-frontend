import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { cookies } from "next/headers";
import AppliancePageWrapper from "@/components/appliance/AppliancePageWrapper";
import { applianceQueries } from "@/queries/appliance";
import { FetchAppliancesParams } from "@/types";
import { ApplianceCategory } from "@/types/prisma-schema-types";
import { fetchUserServerWithCookies } from "@/lib/actions";
async function AppliancesPage(
  props: PageProps<"/dashboard/[homeId]/appliances">
) {
  const { homeId } = await props.params;
  const { page, size, search, category } = await props.searchParams;
  const queryClient = new QueryClient();
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();
  const filterParams: FetchAppliancesParams = {
    page: page ? parseInt(page.toString()) : 1,
    size: size ? parseInt(size.toString()) : 10,
    search: search?.toString(),
    category: category ? (category as ApplianceCategory) : undefined,
  };
  const [user] = await Promise.all([
    fetchUserServerWithCookies(cookieHeader),
    queryClient.prefetchQuery(
      applianceQueries
        .withCookies(cookieHeader)
        .allAppliances(homeId, filterParams)
    ),
    queryClient.prefetchQuery(
      applianceQueries.withCookies(cookieHeader).suggestedAppliances(homeId)
    ),
  ]);
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AppliancePageWrapper homeId={homeId} filterParams={filterParams} user={user} />
    </HydrationBoundary>
  );
}
export default AppliancesPage;
