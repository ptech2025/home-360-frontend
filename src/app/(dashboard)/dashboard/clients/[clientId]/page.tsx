import SingleClientPageWrapper from "@/components/clients/SingleClientPageWrapper";
import ClientsPageWrapper from "@/components/clients/ClientsPageWrapper";
import {
  fetchAllClientsServer,
  fetchClientByIdServer,
  fetchUserServer,
} from "@/lib/actions";
import {
  HydrationBoundary,
  dehydrate,
  QueryClient,
} from "@tanstack/react-query";
import { redirect } from "next/navigation";

type Props = {
  searchParams: Promise<{
    page: string | undefined;
    title: string | undefined;
    status: string | undefined;
  }>;
  params: Promise<{
    clientId: string;
  }>;
};

async function ClientProjectsPage({ searchParams, params }: Props) {
  const queryClient = new QueryClient();
  const user = await fetchUserServer();
  const { clientId } = await params;
  const rawParams = await searchParams;
  const status = rawParams.status || undefined;
  const page = rawParams.page ? Number(rawParams.page) : 1;

  await queryClient.prefetchQuery({
    queryKey: ["single_client", clientId, { status, page }],
    queryFn: () => fetchClientByIdServer(clientId, { status, page }),
  });

  if (!user) {
    redirect("/sign-in");
  }

  if (!user.isOnboarded) {
    redirect("/onboarding");
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SingleClientPageWrapper
        clientId={clientId}
        page={page}
        status={status}
      />
    </HydrationBoundary>
  );
}
export default ClientProjectsPage;
