import AllDocumentsPageWrapper from "@/components/document/AllDocumentsPageWrapper";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { cookies } from "next/headers";
import { documentQueries } from "@/queries/document";
import { FetchDocumentParams } from "@/types";

async function AllDocumentsPage(
  props: PageProps<"/dashboard/[homeId]/documents">
) {
  const queryClient = new QueryClient();
  const { homeId } = await props.params;
  const { search, tag, page, size } = await props.searchParams;
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const filterParams: FetchDocumentParams = {
    search: search?.toString(),
    tag: tag ? tag.toString() : undefined,
    page: page ? parseInt(page.toString()) : 1,
    size: size ? parseInt(size.toString()) : 10,
  };

  await Promise.all([
    queryClient.prefetchQuery(
      documentQueries.withCookies(cookieHeader).all(homeId, filterParams)
    ),
  ]);
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AllDocumentsPageWrapper homeId={homeId} filterParams={filterParams} />
    </HydrationBoundary>
  );
}
export default AllDocumentsPage;
