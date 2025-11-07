import { useQuery } from "@tanstack/react-query";
import { expenseQueries } from "@/queries/expense";
import { formatCurrency } from "@/utils/funcs";
import { ExpensesBreakdownLoadingSkeleton } from "@/components/global/Skeletons";
import AddExpenseDialog from "./AddExpenseDialog";

type Props = {
  homeId: string;
};
function ExpensesBreakdown({ homeId }: Props) {
  const { data: expensesData, isLoading: isExpensesLoading } = useQuery(
    expenseQueries.allExpenses(homeId)
  );

  if (isExpensesLoading) {
    return <ExpensesBreakdownLoadingSkeleton />;
  }

  return (
    <div className="rounded-xl bg-white p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <h4 className="text-xl font-circular-bold text-black">
          Recent Expenses
        </h4>
        <AddExpenseDialog />
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,_minmax(300px,1fr))] gap-4">
        {expensesData && expensesData.data.length > 0 ? (
          expensesData.data.map((expense) => (
            <div
              key={expense.category}
              className="flex bg-lighter-gray/50 py-2 px-4 rounded-md gap-4 items-center justify-between"
            >
              <span className="text-sm text-black capitalize font-circular-medium">
                {expense.category.replace("_", " ").trim()}
              </span>
              <span className="text-main-green line-clamp-1 capitalize text-sm font-circular-medium">
                {formatCurrency(expense.totalAmount)}
              </span>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center h-full w-full bg-lighter-gray/50 py-2 px-4 rounded-md gap-4 ">
            <span className="text-sm text-black capitalize font-circular-medium">
              No expenses found
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
export default ExpensesBreakdown;
