"use client";

import {
  OverviewCard,
  UpcomingEventsCardWrapper,
  MetricsCardWrapper,
  ServicesCard,
} from "@/components/dashboard/DashboardCards";
import { RecentTasksTable } from "@/components/dashboard/DashboardTables";
import { userQueries } from "@/queries/user";
import { useQuery } from "@tanstack/react-query";
type Props = {
  homeId: string;
};

function SingleHomePageWrapper({ homeId }: Props) {
  const { data: homeData, isPending: isHomeLoading } = useQuery(
    userQueries.singleHome(homeId)
  );

  if (isHomeLoading) {
    return <div>Loading...</div>;
  }
  if (!homeData) {
    return <div>Home not found</div>;
  }

  return (
    <section className="flex flex-col gap-4 px-4 py-4 ">
      <div className="lg:flex-row flex flex-col gap-4">
        <OverviewCard home={homeData} />
        <UpcomingEventsCardWrapper />
      </div>
      <MetricsCardWrapper />
      <div className="lg:flex-row flex flex-col gap-4">
        <RecentTasksTable />
        <ServicesCard />
      </div>
    </section>
  );
}
export default SingleHomePageWrapper;
