"use client";

import { useQuery } from "@tanstack/react-query";
import ProjectsHeader from "./ProjectsHeader";
import ProjectsTable from "./ProjectsTable";
import { fetchAllProjects } from "@/services/project";

interface Props {
  page: number;
  title: string | undefined;
}

function ProjectsPageWrapper({ page, title }: Props) {
  const { data, isLoading } = useQuery({
    queryKey: ["projects", { page, title }],
    queryFn: () => fetchAllProjects({ page, title }),
  });

  return (
    <section className="w-full  py-4">
      <div className="rounded-lg p-4 w-full min-h-svh shadow-sm border border-sidebar-border  flex-col flex gap-4">
        <ProjectsHeader hasProjects={data ? data.projects.length > 0 : false} />
        <div className="flex flex-col gap-4 w-full">
          <ProjectsTable projects={data ? data.projects : []} />
        </div>
      </div>
    </section>
  );
}
export default ProjectsPageWrapper;
