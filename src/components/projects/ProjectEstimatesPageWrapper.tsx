"use client";

import RedirectOrToggleSidebar from "../chat/RedirectOrToggleSidebar";
import { fetchProjectEstimates, } from "@/services/project";
import { useQuery } from "@tanstack/react-query";

import SingleProjectHeader from "@/components/projects/SingleProjectHeader";
import { useRouter } from "nextjs-toploader/app";
import { toast } from "sonner";

import { SingleProjectPageSkeleton } from "../global/Skeletons";
import PaginationContainer from "../global/PaginationContainer";
import ProjectEstimatesTable from "./ProjectEstimatesTable";

function ProjectEstimatesPageWrapper({ projectId }: { projectId: string }) {
  const { replace } = useRouter();
  const { data, isLoading } = useQuery({
    queryKey: ["project_estimates", { projectId }],
    queryFn: () => fetchProjectEstimates(projectId),
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
      <RedirectOrToggleSidebar
        url={`/dashboard/projects/${projectId}`}
        showRedirect={true}
      />
      <div className="p-2 md:p-4 w-full min-h-svh  flex-col flex gap-6">
        <SingleProjectHeader project={data.project} />
        <div className="flex flex-col gap-4 w-full">
          <ProjectEstimatesTable estimates={data.estimates} />
          <PaginationContainer
            currentPage={data.pagination.currentPage}
            totalPages={data.pagination.totalPages}
            searchKey="title"
            contentTitle="estimates"
          />
        </div>
      </div>
    </section>
  );
}
export default ProjectEstimatesPageWrapper;
