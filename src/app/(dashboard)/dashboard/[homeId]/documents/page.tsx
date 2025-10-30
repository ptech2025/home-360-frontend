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
  const { search, tags, page, viewMode, size } = await props.searchParams;
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const filterParams: FetchDocumentParams = {
    search: search?.toString(),
    tags: Array.isArray(tags) ? tags : tags ? [tags] : [],
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
      <AllDocumentsPageWrapper
        homeId={homeId}
        filterParams={filterParams}
        viewMode={viewMode as "grid" | "list"}
      />
    </HydrationBoundary>
  );
}
export default AllDocumentsPage;
