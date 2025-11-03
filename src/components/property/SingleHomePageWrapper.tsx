"use client";

import MetricsWrapper from "@/components/dashboard/MetricsWrapper";
import RecentTasksWrapper from "@/components/dashboard/RecentTasksWrapper";
import { userQueries } from "@/queries/user";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { DashboardOverview } from "../dashboard/DashboardOverview";
import UpcomingEventsWrapper from "../dashboard/UpcomingEventsWrapper";
import ServicesWrapper from "../dashboard/ServicesWrapper";
import {
  DashboardPageLoadingSkeleton,
  MetricsWrapperLoadingSkeleton,
  ServicesWrapperLoadingSkeleton,
  TableLoadingSkeleton,
} from "../global/Skeletons";
import { Suspense } from "react";
type Props = {
  homeId: string;
};

function SingleHomePageWrapper({ homeId }: Props) {
  const { replace } = useRouter();
  const { data: homeData, isPending: isHomeLoading } = useQuery(
    userQueries.singleHome(homeId)
  );

  if (isHomeLoading) {
    return <DashboardPageLoadingSkeleton />;
  }
  if (!homeData) {
    replace("/onboarding");
    return null;
  }

  return (
    <section className="flex flex-col gap-4 px-4 py-4 ">
      <div className="lg:flex-row flex flex-col gap-4">
        <DashboardOverview home={homeData} />
        <UpcomingEventsWrapper
          homeId={homeId}
          calendarClassName=" max-w-[15rem] hidden lg:block [--cell-size:--spacing(8.5)]"
        />
      </div>
      <Suspense fallback={<MetricsWrapperLoadingSkeleton />}>
        <MetricsWrapper homeId={homeId} />
      </Suspense>
      <div className="lg:flex-row flex flex-col gap-4">
        <Suspense fallback={<TableLoadingSkeleton />}>
          <RecentTasksWrapper homeId={homeId} />
        </Suspense>
        <Suspense fallback={<ServicesWrapperLoadingSkeleton />}>
          <ServicesWrapper homeId={homeId} />
        </Suspense>
      </div>
    </section>
  );
}
export default SingleHomePageWrapper;
