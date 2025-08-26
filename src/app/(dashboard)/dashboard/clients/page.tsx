import ClientsPageWrapper from "@/components/clients/ClientsPageWrapper";
import { fetchAllClientsServer, fetchUserServer } from "@/lib/actions";
import {
  HydrationBoundary,
  dehydrate,
  QueryClient,
} from "@tanstack/react-query";
import { redirect } from "next/navigation";

type Props = {
  searchParams: Promise<{
    page: string | undefined;
    client: string | undefined;
  }>;
};

async function AllClientsPage({ searchParams }: Props) {
  const queryClient = new QueryClient();
  const user = await fetchUserServer();
  const rawParams = await searchParams;
  const client = rawParams.client || undefined;
  const page = rawParams.page ? (client ? Number(rawParams.page) : 1) : 1;

  await queryClient.prefetchQuery({
    queryKey: ["clients", { client, page, size: 10 }],
    queryFn: () => fetchAllClientsServer({ client, page, size: 10 }),
  });

  if (!user) {
    redirect("/sign-in");
  }

  if (!user.isOnboarded) {
    redirect("/onboarding");
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ClientsPageWrapper page={page} client={client} />
    </HydrationBoundary>
  );
}
export default AllClientsPage;
