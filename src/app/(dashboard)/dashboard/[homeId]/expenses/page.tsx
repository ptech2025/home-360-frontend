import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { cookies } from "next/headers";
import ExpensesPageWrapper from "@/components/expense/ExpensesPageWrapper";
import { expenseQueries } from "@/queries/expense";

async function ExpensesPage(
  props: PageProps<"/dashboard/[homeId]/expenses">
) {
  const { homeId } = await props.params;
  const queryClient = new QueryClient();
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();
  await Promise.all([
    queryClient.prefetchQuery(
      expenseQueries.withCookies(cookieHeader).expenseMetrics(homeId)
    ),
    queryClient.prefetchQuery(
      expenseQueries.withCookies(cookieHeader).allExpenses(homeId)
    ),
  ]);
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ExpensesPageWrapper homeId={homeId} />
    </HydrationBoundary>
  );
}
export default ExpensesPage;
