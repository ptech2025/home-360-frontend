"use client";

import { formatCurrency } from "@/utils/funcs";
import { JSX } from "react";
import { formatDate } from "date-fns";
import { TrendingDown, TrendingUp } from "lucide-react";
import { HouseIcon, ApplianceIcon, DocumentIcon } from "../global/Icons";

import { useQuery } from "@tanstack/react-query";
import { dashboardQueries } from "@/queries/dashboard";
import { MetricsWrapperLoadingSkeleton } from "../global/Skeletons";
import Link from "next/link";
import { Route } from "next";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const metricsTooltipContent = {
  appliance: "Quickly access and manage all your appliances in your home",
  expense:
    "See a breakdown of your home-related spending and track monthly changes",
  document: "Securely store and access your home’s important documents.",
};

type MetricsCardProps = {
  title: string;
  value: string | number;
  prevVal: string | number;
  percentage: number;
  icon: JSX.Element;
  type: "currency" | "number";
  url: string;
  tooltipContent?: string;
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
  url,
  tooltipContent,
}: MetricsCardProps) {
  const cardContent = (() => {
    if (type === "currency") {
      return (
        <Link
          href={url as Route}
          className="w-full hover:shadow-md h-full relative rounded-md overflow-clip flex flex-col justify-between items-start px-4 gap-4 py-6 shadow-light-gray/50 shadow-xs "
        >
          <div className="flex relative z-10 items-start w-full justify-between gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium font-circular-medium text-black">
                {title}
              </span>
              <span className="text-gray text-sm">
                {formatDate(new Date(), "MMMM yyyy")}
              </span>
            </div>
          </div>
          <div className="flex relative z-10 flex-col gap-1.5 ">
            <div className="border w-max border-sidebar-border flex items-center gap-2 text-black py-1 px-2 rounded-md">
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
        </Link>
      );
    }
    return (
      <Link
        href={url as Route}
        className="w-full hover:shadow-md h-full justify-between relative rounded-md overflow-clip flex flex-col items-start px-4 gap-4 py-6 shadow-light-gray/50 shadow-xs "
      >
        <div className="flex relative z-10 items-start w-full justify-between gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium font-circular-medium text-black">
              {title}
            </span>
          </div>
        </div>
        <div className="flex relative z-10 flex-col gap-1 ">
          <span className="text-sm text-gray">Total</span>
          <h5 className="text-xl lg:text-2xl font-bold font-circular-bold text-black">
            {value}
          </h5>
        </div>
        {icon}
      </Link>
    );
  })();

  if (tooltipContent) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{cardContent}</TooltipTrigger>
        <TooltipContent className="p-4">
          <span className="text-base font-circular-medium">
            {tooltipContent}
          </span>
        </TooltipContent>
      </Tooltip>
    );
  }

  return cardContent;
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
          url={`/dashboard/${homeId}/expenses`}
          tooltipContent={metricsTooltipContent.expense}
        />
        <MetricsCard
          icon={<ApplianceIcon className="absolute  bottom-0 right-0" />}
          percentage={0}
          title="Appliances"
          type="number"
          value={0}
          prevVal={0}
          url={`/dashboard/${homeId}/appliances`}
          tooltipContent={metricsTooltipContent.appliance}
        />
        <MetricsCard
          icon={<DocumentIcon className="absolute  bottom-0 right-0" />}
          percentage={0}
          title="Documents"
          type="number"
          value={0}
          prevVal={0}
          url={`/dashboard/${homeId}/documents`}
          tooltipContent={metricsTooltipContent.document}
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
        url={`/dashboard/${homeId}/expenses`}
        tooltipContent={metricsTooltipContent.expense}
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
        url={`/dashboard/${homeId}/appliances`}
        tooltipContent={metricsTooltipContent.appliance}
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
        url={`/dashboard/${homeId}/documents`}
        tooltipContent={metricsTooltipContent.document}
      />
    </div>
  );
}

export default MetricsWrapper;
