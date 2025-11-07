import AllDocumentsPageWrapper from "@/components/document/AllDocumentsPageWrapper";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { cookies } from "next/headers";
import { documentQueries } from "@/queries/document";
import { FetchDocumentParams } from "@/types";
import { DocumentCategory } from "@/types/prisma-schema-types";

async function DocumentCategoryPage(
  props: PageProps<"/dashboard/[homeId]/documents/[category]">
) {
  const queryClient = new QueryClient();
  const { homeId, category } = await props.params;
  const { search, tags, page } = await props.searchParams;
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const filterParams: FetchDocumentParams = {
    search: search?.toString(),
    tags: Array.isArray(tags) ? tags : tags ? [tags] : [],
    page: page ? parseInt(page.toString()) : 1,
    category: category as DocumentCategory,
    size: 10,
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
export default DocumentCategoryPage;
