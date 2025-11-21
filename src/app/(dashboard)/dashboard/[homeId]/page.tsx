import SingleHomePageWrapper from "@/components/property/SingleHomePageWrapper";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { cookies } from "next/headers";
import { userQueries } from "@/queries/user";
import { dashboardQueries } from "@/queries/dashboard";
import { fetchUserServerWithCookies } from "@/lib/actions";

async function SingleHomePage(props: PageProps<"/dashboard/[homeId]">) {
  const queryClient = new QueryClient();
  const { homeId } = await props.params;
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();
  const [user] = await Promise.all([
    fetchUserServerWithCookies(cookieHeader),
    queryClient.prefetchQuery(
      userQueries.withCookies(cookieHeader).singleHome(homeId)
    ),
    queryClient.prefetchQuery(
      dashboardQueries.withCookies(cookieHeader).metrics(homeId)
    ),
  ]);
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SingleHomePageWrapper homeId={homeId} user={user} />
    </HydrationBoundary>
  );
}
export default SingleHomePage;
