"use client";

import { fetchSingleProject } from "@/services/project";
import { useQuery } from "@tanstack/react-query";
import RedirectOrToggleSidebar from "../chat/RedirectOrToggleSidebar";
import SingleProjectHeader from "./SingleProjectHeader";
import { useRouter } from "nextjs-toploader/app";
import { toast } from "sonner";
import {
  ProjectEstimatesCard,
  ProjectInvoicesCard,
  ProjectProposalCard,
  TotalProjectValueCard,
} from "./ProjectsCards";
import { SingleProjectPageSkeleton } from "../global/Skeletons";

interface Props {
  projectId: string;
}

function SingleProjectWrapper({ projectId }: Props) {
  const { replace } = useRouter();
  const { data, isLoading } = useQuery({
    queryKey: ["single_project", { projectId }],
    queryFn: () => fetchSingleProject(projectId),
  });
  if (isLoading) {
    return <SingleProjectPageSkeleton />;
  }

  if (!data) {
    toast.error("Project Not Found");
    replace("/dashboard/projects");
    return null;
  }

  return (
    <section className="w-full flex-col flex gap-4  py-4">
      <RedirectOrToggleSidebar url="/dashboard/projects" showRedirect={true} />
      <div className="p-2 md:p-4 w-full min-h-svh  flex-col flex gap-6">
        <SingleProjectHeader project={data.project} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full [&>div]:min-h-[16rem]">
          <TotalProjectValueCard projectTotalValue={data.projectTotalValue} />
          <ProjectEstimatesCard
            estimates={data.project.estimates}
            projectId={projectId}
          />
          <ProjectInvoicesCard />
          <ProjectProposalCard />
        </div>
      </div>
    </section>
  );
}
export default SingleProjectWrapper;
