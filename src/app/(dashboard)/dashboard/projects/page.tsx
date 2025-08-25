import ProjectsPageWrapper from "@/components/projects/ProjectsPageWrapper";
import {
  fetchAllClientsServer,
  fetchAllProjectsServer,
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
    title: string | undefined;
    page: string | undefined;
    client: string | undefined;
  }>;
};

async function ProjectsPage({ searchParams }: Props) {
  const queryClient = new QueryClient();
  const user = await fetchUserServer();
  const rawParams = await searchParams;
  const title = rawParams.title || undefined;
  const page = rawParams.page ? (title ? Number(rawParams.page) : 1) : 1;
  const client = rawParams.client || undefined;

  await queryClient.prefetchQuery({
    queryKey: ["projects", { title, page }],
    queryFn: () => fetchAllProjectsServer({ title, page }),
  });

  await queryClient.prefetchQuery({
    queryKey: ["clients", { client, page: 1, size: 5 }],
    queryFn: () => fetchAllClientsServer({ client, page: 1, size: 5 }),
  });

  if (!user) {
    redirect("/sign-in");
  }

  if (!user.isOnboarded) {
    redirect("/onboarding");
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProjectsPageWrapper title={title} page={page} />
    </HydrationBoundary>
  );
}
export default ProjectsPage;
