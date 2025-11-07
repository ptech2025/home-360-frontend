"use client";

import { useQuery } from "@tanstack/react-query";
import { expenseQueries } from "@/queries/expense";
import { formatCurrency } from "@/utils/funcs";
import { Home, Shield, Wrench } from "lucide-react";
import { format } from "date-fns";
import { ExpensesMetricsWrapperLoadingSkeleton } from "../global/Skeletons";

type Props = {
  homeId: string;
};
type ExpensesMetricsCardProps = {
  title: string;
  value: number;
  subText: string;
  children: React.ReactNode;
};

function ExpensesMetricsCard({
  title,
  value,
  subText,
  children,
}: ExpensesMetricsCardProps) {
  return (
    <div className="w-full min-h-[165px] relative h-full bg-white rounded-xl p-6 flex flex-col gap-4 border border-lighter-gray">
      <h5 className="text-xl font-circular-bold font-bold text-black">
        {title}
      </h5>

      <div className="flex flex-col gap-1.5">
        <span className="text-2xl font-circular-bold text-black font-bold">
          {formatCurrency(value)}
        </span>
        <span className="text-sm text-gray font-circular-light">{subText}</span>
      </div>
      {children}
    </div>
  );
}
function ExpensesMetricsWrapper({ homeId }: Props) {
  const { data: metricsData, isLoading: isMetricsLoading } = useQuery(
    expenseQueries.expenseMetrics(homeId)
  );
  if (isMetricsLoading) return <ExpensesMetricsWrapperLoadingSkeleton />;

  return (
    <div className="grid grid-cols-1 w-full md:grid-cols-3 gap-4">
      <ExpensesMetricsCard
        title="Home Value Estimate"
        value={metricsData?.homeValue || 0}
        subText={`Last Synced: ${format(new Date(), "MMM dd, yyyy")}`}
      >
        <div className="size-12 text-[#0158FF] bg-[#0158FF]/10 absolute top-4 right-4 flex items-center justify-center rounded-full">
          <Home className="size-6" />
        </div>
      </ExpensesMetricsCard>{" "}
      <ExpensesMetricsCard
        title="Mortgage"
        value={metricsData?.totalMortgage || 0}
        subText={`Last Synced: ${format(new Date(), "MMM dd, yyyy")}`}
      >
        <div className="size-12 text-main-green bg-main-green/10 absolute top-4 right-4 flex items-center justify-center rounded-full">
          <Shield className="size-6" />
        </div>
      </ExpensesMetricsCard>{" "}
      <ExpensesMetricsCard
        title="Monthly Expenses"
        value={metricsData?.totalMonthlyExpenses || 0}
        subText={`Total monthly expenses for the current month`}
      >
        <div className="size-12 text-main-yellow bg-main-yellow/10 absolute top-4 right-4 flex items-center justify-center rounded-full">
          <Wrench className="size-6" />
        </div>
      </ExpensesMetricsCard>
    </div>
  );
}

export default ExpensesMetricsWrapper;
