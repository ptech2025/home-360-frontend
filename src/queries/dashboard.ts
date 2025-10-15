// queries/users.ts
import { queryResult, mutationResult } from "@/lib/react-query-config";
import { dashboardService } from "@/services/dashboard";

export const dashboardQueries = {
  metrics: (homeId: string) =>
    queryResult(["dashboard-metrics", homeId], () =>
      dashboardService.metrics(homeId)
    ),
  withCookies: (cookies: string) => ({
    metrics: (homeId: string) =>
      queryResult(["dashboard-metrics", homeId], () =>
        dashboardService.metrics(homeId, cookies)
      ),
  }),
};

export const dashboardMutations = {};
