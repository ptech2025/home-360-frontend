import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { cookies } from "next/headers";
import { FetchHomeTasksParams } from "@/types";
import TaskPageWrapper from "@/components/task/TaskPageWrapper";
import {
  MaintenanceFrequency,
  ReminderStatus,
} from "@/types/prisma-schema-types";
import { taskQueries } from "@/queries/task";
import { fetchUserServerWithCookies } from "@/lib/actions";

async function TaskPage(props: PageProps<"/dashboard/[homeId]/tasks">) {
  const queryClient = new QueryClient();
  const { homeId } = await props.params;
  const { search, status, page, size, frequency } = await props.searchParams;
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const params: FetchHomeTasksParams = {
    search: search?.toString(),
    status: status ? (status as ReminderStatus) : undefined,
    frequency: frequency ? (frequency as MaintenanceFrequency) : undefined,
    page: page ? parseInt(page.toString()) : 1,
    size: size ? parseInt(size.toString()) : 10,
  };

  const [user] = await Promise.all([
    fetchUserServerWithCookies(cookieHeader),
    queryClient.prefetchQuery(
      taskQueries.withCookies(cookieHeader).allTasks(homeId, params)
    ),
  ]);
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TaskPageWrapper homeId={homeId} filterParams={params} user={user} />
    </HydrationBoundary>
  );
}
export default TaskPage;
