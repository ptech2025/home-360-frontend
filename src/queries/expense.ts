import { queryResult, mutationResult } from "@/lib/react-query-config";
import {
  expenseService,
 
} from "@/services/expense";
import { CreateExpenseSchemaType } from "@/types/zod-schemas";

export const expenseQueries = {
  allExpenses: (homeId: string) =>
    queryResult(["all-expenses", homeId], () =>
      expenseService.fetchAll(homeId, )
    ),

 

  expenseMetrics: (homeId: string) =>
    queryResult(["expense-metrics", homeId], () =>
      expenseService.fetchMetrics(homeId)
    ),

  withCookies: (cookies: string) => ({
    allExpenses: (homeId: string) =>
      queryResult(["all-expenses", homeId], () =>
        expenseService.fetchAll(homeId, cookies)
      ),
  
    expenseMetrics: (homeId: string) =>
      queryResult(["expense-metrics", homeId], () =>
        expenseService.fetchMetrics(homeId, cookies)
      ),
  }),
};

export const expenseMutations = {
  create: mutationResult(
    (variables: { homeId: string; data: CreateExpenseSchemaType  }) =>
      expenseService.create(variables.homeId, variables.data)
  ),

  update: mutationResult(
    (variables: {
      homeId: string;
      expenseId: string;
      data: CreateExpenseSchemaType;
    }) =>
      expenseService.update(
        variables.homeId,
        variables.expenseId,
        variables.data
      )
  ),

  delete: mutationResult((variables: { homeId: string; expenseId: string }) =>
    expenseService.delete(variables.homeId, variables.expenseId)
  ),
};
