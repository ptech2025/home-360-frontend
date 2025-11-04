import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { cookies } from "next/headers";
import { FetchHomeTasksParams } from "@/types";
import PublicRecordsWrapper from "@/components/public-records/PublicRecordsWrapper";


async function PublicRecordsPage(props: PageProps<"/dashboard/[homeId]/public-records">) {
  const queryClient = new QueryClient();
  const { homeId } = await props.params;
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();



  await Promise.all([
   
  ]);
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PublicRecordsWrapper homeId={homeId} />
    </HydrationBoundary>
  );
}
export default PublicRecordsPage;
