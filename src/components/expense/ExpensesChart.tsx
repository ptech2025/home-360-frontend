"use client";

import { useQuery } from "@tanstack/react-query";
import { expenseQueries } from "@/queries/expense";
import { ExpenseCategory } from "@/types/prisma-schema-types";
import { Pie, PieChart, Legend, Cell } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { formatCurrency } from "@/utils/funcs";
import { useMemo } from "react";

type Props = {
  homeId: string;
};

// Color mapping for expense categories
const categoryColors: Record<ExpenseCategory, string> = {
  [ExpenseCategory.mortgage]: "hsl(142, 76%, 36%)", // main-green
  [ExpenseCategory.maintenance]: "hsl(221, 83%, 53%)", // blue
  [ExpenseCategory.improvements]: "hsl(38, 92%, 50%)", // yellow/orange
  [ExpenseCategory.utilities]: "hsl(0, 72%, 51%)", // red
  [ExpenseCategory.landscaping]: "hsl(142, 71%, 45%)", // green variant
  [ExpenseCategory.safety]: "hsl(262, 83%, 58%)", // purple
  [ExpenseCategory.administrative]: "hsl(210, 11%, 15%)", // dark gray
  [ExpenseCategory.sustainability]: "hsl(142, 52%, 50%)", // lighter green
  [ExpenseCategory.other]: "hsl(0, 0%, 45%)", // gray
};

function ExpensesChart({ homeId }: Props) {
  const { data: expensesData, isLoading: isExpensesLoading } = useQuery(
    expenseQueries.allExpenses(homeId)
  );

  // Transform expense data for chart
  const chartData = useMemo(() => {
    if (!expensesData?.data || expensesData.data.length === 0) {
      return [];
    }

    return expensesData.data.map((expense) => ({
      category: expense.category,
      amount: expense.totalAmount,
      fill:
        categoryColors[expense.category] ||
        categoryColors[ExpenseCategory.other],
    }));
  }, [expensesData]);

  // Create chart config dynamically
  const chartConfig = useMemo(() => {
    const config: ChartConfig = {
      amount: {
        label: "Amount",
      },
    };

    // Add config for each category present in the data
    chartData.forEach((item) => {
      const categoryLabel = item.category.replace("_", " ");
      config[item.category] = {
        label: categoryLabel.charAt(0).toUpperCase() + categoryLabel.slice(1),
        color: item.fill,
      };
    });

    return config;
  }, [chartData]) satisfies ChartConfig;

  // Calculate total amount
  const totalAmount = useMemo(() => {
    return chartData.reduce((sum, item) => sum + item.amount, 0);
  }, [chartData]);

  if (isExpensesLoading) {
    return (
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-48 bg-gray-200 rounded animate-pulse mt-2" />
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <div className="mx-auto aspect-square max-h-[250px] flex items-center justify-center">
            <div className="h-32 w-32 border-4 border-gray-200 border-t-main-green rounded-full animate-spin" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!expensesData || expensesData.data.length === 0) {
    return (
      <Card className="flex flex-col shadow-none border-none">
        <CardHeader className="items-center pb-0">
          <CardTitle>Expense Distribution</CardTitle>
          <CardDescription>No expenses data available</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0 flex items-center justify-center min-h-[250px]">
          <p className="text-muted-foreground text-sm">
            Add expenses to see the distribution chart
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col shadow-none border-none">
      <CardHeader className="items-center pb-0">
        <CardTitle>Expense Distribution</CardTitle>
        <CardDescription>Total: {formatCurrency(totalAmount)}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto w-full h-[300px]"
        >
          <PieChart width={400} height={300}>
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="category"
              innerRadius={80}
              cx={150}
              cy={150}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Legend
              verticalAlign="middle"
              align="right"
              layout="vertical"
              formatter={(value: string) => {
                if (!value) return "";
                const item = chartData.find((d) => d.category === value);
                const categoryLabel = String(value).replace("_", " ");
                const percentage = item
                  ? ((item.amount / totalAmount) * 100).toFixed(1)
                  : "0";
                return `${
                  categoryLabel.charAt(0).toUpperCase() + categoryLabel.slice(1)
                } (${percentage}%)`;
              }}
              iconType="circle"
              wrapperStyle={{
                fontSize: "16px",
              }}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default ExpensesChart;
