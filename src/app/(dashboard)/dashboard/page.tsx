import {
  OverviewCard,
  UpcomingEventsCardWrapper,
  MetricsCardWrapper,
  ServicesCard,
} from "@/components/dashboard/DashboardCards";

function DashboardPage() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-[auto_auto_auto] gap-4">
      <OverviewCard />
      <UpcomingEventsCardWrapper />
      <MetricsCardWrapper />
      <ServicesCard />
    </section>
  );
}
export default DashboardPage;
