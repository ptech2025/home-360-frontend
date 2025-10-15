import { api, withAuthHeaders } from "@/lib/axios-client";
import { FetchDashboardMetricResponse } from "@/types";

export const dashboardService = {
  metrics: async (homeId: string, cookies?: string) => {
    const res = await api.get(
      `/api/home/overview-card-metrics/${homeId}`,
      withAuthHeaders(cookies)
    );
    return res.data as FetchDashboardMetricResponse;
  },
};
