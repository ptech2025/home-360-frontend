import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { cookies } from "next/headers";
import HomeDetailsWrapper from "@/components/details/HomeDetailsWrapper";
import { userQueries } from "@/queries/user";
import { fetchUserServerWithCookies } from "@/lib/actions";

async function DetailsPage(props: PageProps<"/dashboard/[homeId]/details">) {
  const queryClient = new QueryClient();
  const { homeId } = await props.params;
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const [user] = await Promise.all([
    fetchUserServerWithCookies(cookieHeader),
    queryClient.prefetchQuery(
      userQueries.withCookies(cookieHeader).singleHome(homeId)
    ),
  ]);
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HomeDetailsWrapper homeId={homeId} user={user} />
    </HydrationBoundary>
  );
}
export default DetailsPage;
