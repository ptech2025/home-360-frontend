"use client";

import { useQuery } from "@tanstack/react-query";
import ProjectsHeader from "./ProjectsHeader";
import ProjectsTable from "./ProjectsTable";
import { fetchAllProjects } from "@/services/project";
import PaginationContainer from "../global/PaginationContainer";
import { HeaderSkeleton, TableSkeleton } from "../global/Skeletons";
import RedirectOrToggleSidebar from "../chat/RedirectOrToggleSidebar";

interface Props {
  page: number;
  title: string | undefined;
  status: string | undefined;
}

function ProjectsPageWrapper({ page, title, status }: Props) {
  const { data, isLoading } = useQuery({
    queryKey: ["projects", { page, title }],
    queryFn: () => fetchAllProjects({ page, title, status }),
  });
  if (isLoading) {
    return (
      <section className="w-full  py-4">
        <div className="rounded-lg p-4 w-full min-h-svh shadow-sm border border-sidebar-border  flex-col flex gap-4">
          <HeaderSkeleton heading="Projects" />
          <TableSkeleton />
        </div>
      </section>
    );
  }

  return (
    <section className="w-full flex-col flex gap-4  py-4">
      <RedirectOrToggleSidebar url={``} showRedirect={false} />
      <div className="rounded-lg p-2 md:p-4 w-full min-h-svh shadow-sm border border-sidebar-border  flex-col flex gap-4">
        <ProjectsHeader hasProjects={data ? data.projects.length > 0 : false} />
        <div className="flex flex-col gap-4 w-full">
          <ProjectsTable projects={data ? data.projects : []} />

          <PaginationContainer
            currentPage={data ? data.pagination.currentPage : 1}
            totalPages={data ? data.pagination.totalPages : 1}
            searchKey="title"
            contentTitle="projects"
          />
        </div>
      </div>
    </section>
  );
}
export default ProjectsPageWrapper;
