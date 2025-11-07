import { queryResult, mutationResult } from "@/lib/react-query-config";
import { applianceService } from "@/services/appliance";
import { FetchAppliancesParams } from "@/types";
import {
  CreateApplianceSchemaType,
  CreateApplianceMaintenanceSchemaType,
} from "@/types/zod-schemas";

export const applianceQueries = {
  allAppliances: (homeId: string, params: FetchAppliancesParams) =>
    queryResult(["all-appliances", homeId, params], () =>
      applianceService.fetchAll(homeId, params)
    ),

  singleAppliance: (homeId: string, applianceId: string) =>
    queryResult(["single-appliance", homeId, applianceId], () =>
      applianceService.fetchSingle(homeId, applianceId)
    ),

  singleApplianceHistory: (applianceId: string, enabled: boolean = true) =>
    queryResult(
      ["single-appliance-history", applianceId],
      () => applianceService.fetchSingleHistory(applianceId),
      {
        enabled,
      }
    ),

  applianceMetrics: (homeId: string) =>
    queryResult(["appliance-metrics", homeId], () =>
      applianceService.fetchApplianceMetrics(homeId)
    ),

  applianceEvents: (homeId: string, enabled: boolean, date?: string) =>
    queryResult(
      ["appliance-events", homeId, date],
      () => applianceService.fetchApplianceEvents(homeId, date),
      {
        enabled,
      }
    ),

  withCookies: (cookies: string) => ({
    allAppliances: (homeId: string, params: FetchAppliancesParams) =>
      queryResult(["all-appliances", homeId, params], () =>
        applianceService.fetchAll(homeId, params, cookies)
      ),

    singleAppliance: (homeId: string, applianceId: string) =>
      queryResult(["single-appliance", homeId, applianceId], () =>
        applianceService.fetchSingle(homeId, applianceId, cookies)
      ),

    singleApplianceHistory: (applianceId: string, enabled: boolean = true) =>
      queryResult(
        ["single-appliance-history", applianceId],
        () => applianceService.fetchSingleHistory(applianceId, cookies),
        {
          enabled,
        }
      ),

    applianceMetrics: (homeId: string) =>
      queryResult(["appliance-metrics", homeId], () =>
        applianceService.fetchApplianceMetrics(homeId, cookies)
      ),

    applianceEvents: (homeId: string, enabled: boolean, date?: string) =>
      queryResult(
        ["appliance-events", homeId, date],
        () => applianceService.fetchApplianceEvents(homeId, date, cookies),
        {
          enabled,
        }
      ),
  }),
};

export const applianceMutations = {
  create: mutationResult(
    (variables: { homeId: string; data: CreateApplianceSchemaType }) =>
      applianceService.create(variables.homeId, variables.data)
  ),

  update: mutationResult(
    (variables: {
      homeId: string;
      applianceId: string;
      data: CreateApplianceSchemaType;
    }) =>
      applianceService.update(
        variables.homeId,
        variables.applianceId,
        variables.data
      )
  ),

  delete: mutationResult((variables: { applianceId: string }) =>
    applianceService.delete(variables.applianceId)
  ),

  createMaintenance: mutationResult(
    (variables: {
      applianceId: string;
      data: CreateApplianceMaintenanceSchemaType;
    }) =>
      applianceService.createMaintenance(variables.applianceId, variables.data)
  ),
};
