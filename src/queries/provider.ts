// queries/users.ts
import { queryResult, mutationResult } from "@/lib/react-query-config";
import { providerService } from "@/services/provider";
import {
  CreateJobBody,
  FetchGoogleServiceProviderParams,
  FetchServiceProviderParams,
} from "@/types";
import {
  CreateServiceJobSchemaType,
  CreateServiceProviderSchemaType,
} from "@/types/zod-schemas";
export const providerQueries = {
  single: (homeId: string, provId: string) =>
    queryResult(["single-provider", homeId, provId], () =>
      providerService.getSingle(homeId, provId)
    ),
  allSaved: (params: FetchServiceProviderParams) =>
    queryResult(["all-providers-saved", params], () =>
      providerService.fetchAllSaved(params)
    ),
  allHired: (params: FetchServiceProviderParams) =>
    queryResult(["all-providers-hired", params], () =>
      providerService.fetchAllHired(params)
    ),

  getNearby: (params: FetchGoogleServiceProviderParams) =>
    queryResult(["nearby-providers", params], () =>
      providerService.fetchNearby(params)
    ),

  singleHistory: (homeId: string, provId: string, enabled: boolean) =>
    queryResult(
      ["single-provider-history", homeId, provId],
      () => providerService.getSingleHistory(homeId, provId),
      {
        enabled,
      }
    ),
  withCookies: (cookies: string) => ({
    single: (homeId: string, provId: string) =>
      queryResult(["single-provider", homeId, provId], () =>
        providerService.getSingle(homeId, provId, cookies)
      ),
    allSaved: (params: FetchServiceProviderParams) =>
      queryResult(["all-providers-saved", params], () =>
        providerService.fetchAllSaved(params, cookies)
      ),
    allHired: (params: FetchServiceProviderParams) =>
      queryResult(["all-providers-hired", params], () =>
        providerService.fetchAllHired(params, cookies)
      ),

    getNearby: (params: FetchGoogleServiceProviderParams) =>
      queryResult(["nearby-providers", params], () =>
        providerService.fetchNearby(params, cookies)
      ),

    singleHistory: (homeId: string, provId: string, enabled: boolean) =>
      queryResult(
        ["single-provider-history", homeId, provId],
        () => providerService.getSingleHistory(homeId, provId, cookies),
        {
          enabled,
        }
      ),
  }),
};

export const providerMutations = {
  delete: mutationResult((provId: string) => providerService.delete(provId)),
  create: mutationResult((data: CreateServiceProviderSchemaType) =>
    providerService.createProvider(data)
  ),
  update: mutationResult(
    (variables: { provId: string; data: CreateServiceProviderSchemaType }) =>
      providerService.updateProvider(variables.provId, variables.data)
  ),
  createJob: mutationResult(
    (variables: {
      provId: string;
      data: CreateJobBody;
    }) =>
      providerService.createProviderJob(
        variables.provId,
        variables.data
      )
  ),
};
