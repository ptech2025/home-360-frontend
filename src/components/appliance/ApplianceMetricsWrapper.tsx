"use client";

import { useQuery } from "@tanstack/react-query";
import { applianceQueries } from "@/queries/appliance";
import { Home, Shield, Wrench, LucideIcon, Upload } from "lucide-react";
import { ExpensesMetricsWrapperLoadingSkeleton } from "../global/Skeletons";
import { Progress } from "@/components/ui/progress";

type Props = {
  homeId: string;
};

type IconType = "home" | "shield" | "wrench" | "usage";

type ApplianceMetricsCardProps = {
  title: string;
  value: number;
  iconType: IconType;
  children: React.ReactNode;
};

const iconMap: Record<
  IconType,
  { icon: LucideIcon; color: string; bgColor: string }
> = {
  home: {
    icon: Home,
    color: "text-[#0158FF]",
    bgColor: "bg-[#0158FF]/10",
  },
  shield: {
    icon: Shield,
    color: "text-main-green",
    bgColor: "bg-main-green/10",
  },
  wrench: {
    icon: Wrench,
    color: "text-main-yellow",
    bgColor: "bg-main-yellow/10",
  },
  usage: {
    icon: Upload,
    color: "text-main-yellow",
    bgColor: "bg-main-yellow/10",
  },
};

type ApplianceUsageCardProps = {
  title: string;
  value: number;
  iconType: IconType;
  children: React.ReactNode;
};

function ApplianceMetricsCard({
  title,
  value,
  iconType,
  children,
}: ApplianceMetricsCardProps) {
  const { icon: Icon, color, bgColor } = iconMap[iconType];

  return (
    <div className="w-full min-h-[165px] relative h-full bg-white rounded-xl p-6 flex flex-col gap-4 border border-lighter-gray">
      <h5 className="text-xl font-circular-bold font-bold text-black">
        {title}
      </h5>

      <div className="flex flex-col gap-1.5">
        <span className="text-2xl font-circular-bold text-black font-bold">
          {value}
        </span>
        {children}
      </div>
      <div
        className={`size-12 ${color} ${bgColor} absolute top-4 right-4 flex items-center justify-center rounded-full`}
      >
        <Icon className="size-6" />
      </div>
    </div>
  );
}

function ApplianceMetricsWrapper({ homeId }: Props) {
  const { data: metricsData, isLoading: isMetricsLoading } = useQuery(
    applianceQueries.applianceMetrics(homeId)
  );

  if (isMetricsLoading) return <ExpensesMetricsWrapperLoadingSkeleton />;

  const totalAppliances = metricsData?.totalAppliances || 0;
  const underWarranty = metricsData?.underWarranty || 0;
  const pendingMaintenance = metricsData?.pendingMaintenance || 0;
  const applianceUsage = metricsData?.applianceUsage || {
    allocated: 0,
    used: 0,
    remaining: 0,
  };
  const uploadsLeft = applianceUsage.remaining;
  const warrantyPercentage =
    totalAppliances > 0
      ? Math.round((underWarranty / totalAppliances) * 100)
      : 0;
  const maintenancePercentage =
    totalAppliances > 0
      ? Math.round((pendingMaintenance / totalAppliances) * 100)
      : 0;

  const uploadUsedPercentage =
    applianceUsage.allocated > 0
      ? Math.round((applianceUsage.used / applianceUsage.allocated) * 100)
      : 0;

  return (
    <div className="grid grid-cols-1 w-full md:grid-cols-4 gap-4">
      <ApplianceMetricsCard
        title="Total Appliances"
        value={totalAppliances}
        iconType="home"
      >
        <span className="text-sm text-gray font-circular-light">
          All appliances in your home
        </span>
      </ApplianceMetricsCard>
      <ApplianceMetricsCard
        title="Under Warranty"
        value={underWarranty}
        iconType="shield"
      >
        <div className="bg-main-green rounded-md text-white px-2 py-1 w-fit">
          <span className="text-sm font-circular-medium">
            {warrantyPercentage}% covered
          </span>
        </div>
      </ApplianceMetricsCard>
      <ApplianceMetricsCard
        title="Pending Maintenance"
        value={pendingMaintenance}
        iconType="wrench"
      >
        <div className="bg-main-yellow rounded-md text-white px-2 py-1 w-fit">
          <span className="text-sm font-circular-medium">
            {maintenancePercentage}% needs maintenance
          </span>
        </div>
      </ApplianceMetricsCard>
      <ApplianceMetricsCard
        title="Uploads Left"
        value={uploadsLeft}
        iconType="usage"
      >
        <Progress value={uploadUsedPercentage} className="w-full " />
      </ApplianceMetricsCard>
    </div>
  );
}

export default ApplianceMetricsWrapper;
