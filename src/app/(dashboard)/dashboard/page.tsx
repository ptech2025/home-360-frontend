import {
  OverviewCard,
  UpcomingEventsCardWrapper,
  MetricsCardWrapper,
  ServicesCard,
} from "@/components/dashboard/DashboardCards";
import { RecentTasksTable } from "@/components/dashboard/DashboardTables";

function DashboardPage() {
  return (
    <section className="flex flex-col gap-4">
      <div className="lg:flex-row flex flex-col gap-4">
        <OverviewCard />
        <UpcomingEventsCardWrapper />
      </div>{" "}
      <MetricsCardWrapper />
      <div className="lg:flex-row flex flex-col gap-4">
        <RecentTasksTable />
        <ServicesCard />
      </div>
    </section>
  );
}
export default DashboardPage;
