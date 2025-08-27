import SingleProjectWrapper from "@/components/projects/SingleProjectWrapper";
import { fetchSingleProjectServer, fetchUserServer } from "@/lib/actions";
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
    status: string | undefined;
  }>;
  params: Promise<{
    projectId: string;
  }>;
};

async function ProjectsPage({ params }: Props) {
  const queryClient = new QueryClient();
  const user = await fetchUserServer();
  const { projectId } = await params;

  await queryClient.prefetchQuery({
    queryKey: ["single_project", { projectId }],
    queryFn: () => fetchSingleProjectServer(projectId),
  });

  if (!user) {
    redirect("/sign-in");
  }

  if (!user.isOnboarded) {
    redirect("/onboarding");
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SingleProjectWrapper projectId={projectId} />
    </HydrationBoundary>
  );
}
export default ProjectsPage;
