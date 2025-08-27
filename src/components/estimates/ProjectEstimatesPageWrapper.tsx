"use client";

import RedirectOrToggleSidebar from "../chat/RedirectOrToggleSidebar";
import { fetchSingleProject } from "@/services/project";
import { useQuery } from "@tanstack/react-query";

import SingleProjectHeader from "@/components/projects/SingleProjectHeader";
import { useRouter } from "nextjs-toploader/app";
import { toast } from "sonner";

import { SingleProjectPageSkeleton } from "../global/Skeletons";

function ProjectEstimatesPageWrapper({ projectId }: { projectId: string }) {
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
      <RedirectOrToggleSidebar
        url={`/dashboard/projects/${projectId}`}
        showRedirect={true}
      />
      <div className="p-2 md:p-4 w-full min-h-svh  flex-col flex gap-6">
        <SingleProjectHeader project={data.project} />
        <div className="flex flex-col gap-4 w-full"></div>
      </div>
    </section>
  );
}
export default ProjectEstimatesPageWrapper;
