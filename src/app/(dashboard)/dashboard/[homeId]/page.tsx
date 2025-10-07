import SingleHomePageWrapper from "@/components/property/SingleHomePageWrapper";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { cookies } from "next/headers";
import {userQueries} from "@/queries/user"


async function SingleHomePage(props: PageProps<"/dashboard/[homeId]">) {
  const queryClient = new QueryClient();
  const {homeId} = await props.params
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();
  await Promise.all([
    queryClient.prefetchQuery(userQueries.withCookies(cookieHeader).singleHome(homeId))
  ])
  return (
   <HydrationBoundary state={dehydrate(queryClient)}>
    <SingleHomePageWrapper homeId={homeId} />
   </HydrationBoundary>
  );
}
export default SingleHomePage;
