"use client";

import { useQuery } from "@tanstack/react-query";
import PaginationContainer from "../global/PaginationContainer";
import { fetchAllClients } from "@/services/client";
import ClientsHeader from "./ClientsHeader";
import ClientsTable from "./ClientsTable";
import { HeaderSkeleton, TableSkeleton } from "../global/Skeletons";
import RedirectOrToggleSidebar from "../chat/RedirectOrToggleSidebar";

interface Props {
  page: number;
  client: string | undefined;
}

function ClientsPageWrapper({ page, client }: Props) {
  const { data, isLoading } = useQuery({
    queryKey: ["clients", { page, client }],
    queryFn: () => fetchAllClients({ page, client, size: 10 }),
  });

  if (isLoading) {
    return (
      <section className="w-full  py-4">
        <div className="rounded-lg p-4 w-full min-h-svh shadow-sm border border-sidebar-border  flex-col flex gap-4">
          <HeaderSkeleton heading="Clients" />
          <TableSkeleton />
        </div>
      </section>
    );
  }

  return (
    <section className="w-full flex flex-col gap-4  py-4">
      <RedirectOrToggleSidebar url={``} showRedirect={false} />
      <div className="rounded-lg p-4 w-full min-h-svh border border-sidebar-border  flex-col flex gap-4">
        <ClientsHeader hasClients={data ? data.clients.length > 0 : false} />
        <div className="flex flex-col gap-4 w-full">
          <ClientsTable clients={data ? data.clients : []} />
          <PaginationContainer
            currentPage={data ? data.pagination.currentPage : 1}
            totalPages={data ? data.pagination.totalPages : 1}
            searchKey="client"
            contentTitle="clients"
          />
        </div>
      </div>
    </section>
  );
}
export default ClientsPageWrapper;
