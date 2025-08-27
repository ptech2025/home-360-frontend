import ProjectEstimatesPageWrapper from "@/components/projects/ProjectEstimatesPageWrapper";

import { fetchProjectEstimatesServer, fetchUserServer } from "@/lib/actions";
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

async function ProjectEstimatesPage({ params }: Props) {
  const queryClient = new QueryClient();
  const user = await fetchUserServer();
  const { projectId } = await params;

  await queryClient.prefetchQuery({
    queryKey: ["project_estimates", { projectId }],
    queryFn: () => fetchProjectEstimatesServer(projectId),
  });

  if (!user) {
    redirect("/sign-in");
  }

  if (!user.isOnboarded) {
    redirect("/onboarding");
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProjectEstimatesPageWrapper projectId={projectId} />
    </HydrationBoundary>
  );
}
export default ProjectEstimatesPage;
