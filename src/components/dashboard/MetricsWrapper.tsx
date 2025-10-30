"use client";

import { formatCurrency } from "@/utils/funcs";
import { Button } from "../ui/button";
import { JSX } from "react";
import { formatDate } from "date-fns";
import { MoreVertical, TrendingDown, TrendingUp } from "lucide-react";
import { HouseIcon, ApplianceIcon, DocumentIcon } from "../global/Icons";

import { useQuery } from "@tanstack/react-query";
import { dashboardQueries } from "@/queries/dashboard";
import { MetricsWrapperLoadingSkeleton } from "../global/Skeletons";

type MetricsCardProps = {
  title: string;
  value: string | number;
  prevVal: string | number;
  percentage: number;
  icon: JSX.Element;
  type: "currency" | "number";
};
type MetricsWrapperProps = {
  homeId: string;
};

export function MetricsCard({
  title,
  value,
  percentage,
  prevVal,
  type,
  icon,
}: MetricsCardProps) {
  if (type === "currency") {
    return (
      <div className="w-full h-full relative rounded-md overflow-clip flex flex-col justify-between items-start px-4 gap-4 py-6 shadow-light-gray/50 shadow-xs ">
        <div className="flex relative z-10 items-start w-full justify-between gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium font-circular-medium text-black">
              {title}
            </span>
            <span className="text-gray text-sm">
              {formatDate(new Date(), "MMMM yyyy")}
            </span>
          </div>
          <Button
            size={"icon"}
            className="text-black hover:bg-main-green hover:text-white bg-transparent shadow-none"
          >
            <MoreVertical />
          </Button>
        </div>
        <div className="flex relative z-10 flex-col gap-1.5 ">
          <div className="border border-sidebar-border flex items-center gap-2 text-black py-1 px-2 rounded-md">
            {Number(value) > Number(prevVal) ? (
              <TrendingUp className="size-4" />
            ) : (
              <TrendingDown className="size-4" />
            )}
            <span className="text-xs font-circular-medium text-black">
              {Number(value) > Number(prevVal) ? "+" : "-"} {percentage}%
            </span>
          </div>
          <h5 className="text-xl lg:text-2xl font-bold font-circular-bold text-black">
            {typeof value === "number" ? formatCurrency(value) : value}
          </h5>
        </div>
        {icon}
      </div>
    );
  }
  return (
    <div className="w-full h-full justify-between relative rounded-md overflow-clip flex flex-col items-start px-4 gap-4 py-6 shadow-light-gray/50 shadow-xs ">
      <div className="flex relative z-10 items-start w-full justify-between gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium font-circular-medium text-black">
            {title}
          </span>
        </div>
        <Button
          size={"icon"}
          className="text-black hover:bg-main-green hover:text-white bg-transparent shadow-none"
        >
          <MoreVertical />
        </Button>
      </div>
      <div className="flex relative z-10 flex-col gap-1 ">
        <span className="text-sm text-gray">Total</span>
        <h5 className="text-xl lg:text-2xl font-bold font-circular-bold text-black">
          {value}
        </h5>
      </div>
      {icon}
    </div>
  );
}

function MetricsWrapper({ homeId }: MetricsWrapperProps) {
  const { data, isLoading } = useQuery(dashboardQueries.metrics(homeId));

  if (isLoading) return <MetricsWrapperLoadingSkeleton />;

  if (!data)
    return (
      <div className="grid  grid-cols-1 lg:grid-cols-3 w-full gap-4 items-center lg:flex-row flex-col lg:col-span-2 lg:row-start-2">
        <MetricsCard
          icon={<HouseIcon className="absolute  bottom-0 right-0" />}
          percentage={0}
          title="Expenses"
          type="currency"
          value={0}
          prevVal={0}
        />
        <MetricsCard
          icon={<ApplianceIcon className="absolute  bottom-0 right-0" />}
          percentage={0}
          title="Appliances"
          type="number"
          value={0}
          prevVal={0}
        />
        <MetricsCard
          icon={<DocumentIcon className="absolute  bottom-0 right-0" />}
          percentage={0}
          title="Documents"
          type="number"
          value={0}
          prevVal={0}
        />
      </div>
    );

  return (
    <div className="grid   grid-cols-1 lg:grid-cols-3 w-full gap-4 items-center lg:flex-row flex-col lg:col-span-2 lg:row-start-2">
      <MetricsCard
        icon={<HouseIcon className="absolute  bottom-0 right-0" />}
        percentage={data.expenseMetrics.percentageChange}
        title="Expenses"
        type="currency"
        value={data.expenseMetrics.currentMonthTotal}
        prevVal={data.expenseMetrics.previousMonthTotal}
      />
      <MetricsCard
        icon={<ApplianceIcon className="absolute  bottom-0 right-0" />}
        percentage={0}
        title="Appliances"
        type="number"
        value={`${data?.appliancesCount} Appliance${
          data?.appliancesCount > 1 ? "s" : ""
        }`}
        prevVal={0}
      />
      <MetricsCard
        icon={<DocumentIcon className="absolute  bottom-0 right-0" />}
        percentage={0}
        title="Documents"
        type="number"
        value={`${data.documentsCount} File${
          data?.documentsCount > 1 ? "s" : ""
        }`}
        prevVal={0}
      />
    </div>
  );
}

export default MetricsWrapper;
