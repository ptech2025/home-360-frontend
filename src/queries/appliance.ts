import { queryResult, mutationResult } from "@/lib/react-query-config";
import { applianceService } from "@/services/appliance";

export const applianceQueries = {
  applianceEvents: (homeId: string, enabled: boolean, date?: string) =>
    queryResult(["appliance-events", homeId, date], () =>
      applianceService.fetchApplianceEvents(homeId, date),
      {
        enabled,
      }
    ),
  withCookies: (cookies: string) => ({
   
  }),
};

export const applianceMutations = {};