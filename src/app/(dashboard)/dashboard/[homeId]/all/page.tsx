import { cookies } from "next/headers";
import { fetchUserServerWithCookies } from "@/lib/actions";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { redirect } from "next/navigation";
import { userQueries } from "@/queries/user";
import AllHomesPageWrapper from "@/components/details/AllHomesPageWrapper";
import { FetchHomesParams } from "@/types";
async function AllHomePages({
  params,
  searchParams,
}: PageProps<"/dashboard/[homeId]/all">) {
  const queryClient = new QueryClient();
  const cookieStore = await cookies();
  const { homeId } = await params;
  const cookieHeader = cookieStore.toString();
  const { search, page, size } = await searchParams;
  const fetchParams: FetchHomesParams = {
    search: search?.toString(),
    page: page ? parseInt(page.toString()) : 1,
    size: size ? parseInt(size.toString()) : 10,
  };
  const [user] = await Promise.all([
    fetchUserServerWithCookies(cookieHeader),

    queryClient.prefetchQuery(
      userQueries.withCookies(cookieHeader).allHomes(fetchParams)
    ),
  ]);

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AllHomesPageWrapper user={user} homeId={homeId} fetchParams={fetchParams} />
    </HydrationBoundary>
  );
}
export default AllHomePages;
