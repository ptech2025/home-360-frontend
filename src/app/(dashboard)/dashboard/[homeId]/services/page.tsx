import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { cookies } from "next/headers";
import { FetchServiceProviderParams } from "@/types";
import ServicesPageWrapper from "@/components/service-provider/ServicesPageWrapper";
import { ProviderType } from "@/types/prisma-schema-types";
import { providerQueries } from "@/queries/provider";
import { userQueries } from "@/queries/user";
import { fetchUserServerWithCookies } from "@/lib/actions";

async function ServicesPage(props: PageProps<"/dashboard/[homeId]/services">) {
  const queryClient = new QueryClient();
  const { homeId } = await props.params;
  const {
    search,
    type,
    page,
    size,
    homeId: searchHomeId,
    rating,
  } = await props.searchParams;
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();
  const params: FetchServiceProviderParams = {
    search: search?.toString(),
    homeId: searchHomeId?.toString(),
    type: type ? (type as ProviderType) : undefined,
    rating: rating ? parseInt(rating.toString()) : undefined,
    page: page ? parseInt(page.toString()) : 1,
    size: size ? parseInt(size.toString()) : 10,
  };

  const [user] = await Promise.all([
    fetchUserServerWithCookies(cookieHeader),
    queryClient.prefetchQuery(
      providerQueries.withCookies(cookieHeader).allSaved(params)
    ),
    queryClient.prefetchQuery(
      providerQueries.withCookies(cookieHeader).allHired(params)
    ),
    queryClient.prefetchQuery(
      userQueries.withCookies(cookieHeader).allHomes({
        page: 1,
        size: 10,
      })
    ),
  ]);
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ServicesPageWrapper homeId={homeId} filterParams={params} user={user} />
    </HydrationBoundary>
  );
}
export default ServicesPage;
