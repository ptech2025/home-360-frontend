"use client";

import RedirectOrToggleSidebar from "../chat/RedirectOrToggleSidebar";
import { useQuery } from "@tanstack/react-query";

import { useRouter } from "nextjs-toploader/app";
import { toast } from "sonner";
import { fetchClientById } from "@/services/client";
import SingleClientHeader from "./SingleClientHeader";
import ProjectsTable from "../projects/ProjectsTable";
import PaginationContainer from "../global/PaginationContainer";

type Props = {
  clientId: string;
  status?: string;
  page: number;
};

function SingleClientPageWrapper({ clientId, status, page }: Props) {
  const { replace } = useRouter();
  const { data, isLoading } = useQuery({
    queryKey: ["single_client", clientId, { status, page }],
    queryFn: () => fetchClientById(clientId, { status, page }),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    toast.error("Client Not Found");
    replace("/dashboard/clients");
    return null;
  }

  return (
    <section className="w-full flex-col flex gap-4  py-4">
      <RedirectOrToggleSidebar url="/dashboard/clients" showRedirect={true} />
      <div className="p-2 md:p-4 w-full min-h-svh  flex-col flex gap-6">
        <SingleClientHeader client={data.client} />
        <div className="flex flex-col gap-4 w-full">
          <ProjectsTable projects={data.projects} />

          <PaginationContainer
            currentPage={data.pagination.currentPage}
            totalPages={data.pagination.totalPages}
            searchKey="title"
            contentTitle="projects"
          />
        </div>
      </div>
    </section>
  );
}
export default SingleClientPageWrapper;
