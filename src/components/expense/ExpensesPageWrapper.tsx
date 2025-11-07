"use client";

import ExpensesMetricsWrapper from "./ExpensesMetricsWrapper";
import ExpensesChart from "./ExpensesChart";
import ExpensesBreakdown from "./ExpensesBreakdown";

type Props = {
  homeId: string;
};
function ExpensesPageWrapper({ homeId }: Props) {
  return (
    <section className="px-4 flex flex-col gap-4 py-4 bg-lighter-gray/50 min-h-screen">
      <div className="flex flex-col gap-2 w-full">
        <h1 className="text-black text-xl font-circular-medium">
          Home Finances
        </h1>
        <p className="text-gray text-sm">
          Track your mortgage, spending, and home value in one place
        </p>
      </div>
      <ExpensesMetricsWrapper homeId={homeId} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ExpensesChart homeId={homeId} />
        <ExpensesBreakdown homeId={homeId} />
      </div>
    </section>
  );
}
export default ExpensesPageWrapper;
