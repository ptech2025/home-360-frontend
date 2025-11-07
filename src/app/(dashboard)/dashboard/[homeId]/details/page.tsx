import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { cookies } from "next/headers";
import HomeDetailsWrapper from "@/components/details/HomeDetailsWrapper";
import { userQueries } from "@/queries/user";

async function DetailsPage(props: PageProps<"/dashboard/[homeId]/details">) {
  const queryClient = new QueryClient();
  const { homeId } = await props.params;
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  await Promise.all([
    queryClient.prefetchQuery(
      userQueries.withCookies(cookieHeader).singleHome(homeId)
    ),
  ]);
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HomeDetailsWrapper homeId={homeId} />
    </HydrationBoundary>
  );
}
export default DetailsPage;
