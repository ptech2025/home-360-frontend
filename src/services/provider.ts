import { api, withAuthHeaders } from "@/lib/axios-client";
import {
  CreateJobBody,
  FetchAllServiceProvidersResponse,
  FetchGoogleServiceProviderParams,
  FetchServiceProviderParams,
  GoogleProviderInfo,
} from "@/types";
import { ServiceHistory, ServiceProvider } from "@/types/prisma-schema-types";
import { CreateServiceProviderSchemaType } from "@/types/zod-schemas";

export const providerService = {
  fetchAllSaved: async (
    params: FetchServiceProviderParams,
    cookies?: string
  ) => {
    const res = await api.get(`/api/service-provider/all-saved`, {
      ...withAuthHeaders(cookies),
      params,
    });
    return res.data as FetchAllServiceProvidersResponse;
  },
  fetchAllHired: async (
    params: FetchServiceProviderParams,
    cookies?: string
  ) => {
    const res = await api.get(`/api/service-provider/all-hired`, {
      ...withAuthHeaders(cookies),
      params,
    });
    return res.data as FetchAllServiceProvidersResponse;
  },
  fetchNearby: async (
    params: FetchGoogleServiceProviderParams,
    cookies?: string
  ) => {
    const res = await api.get(`/api/service-provider/search-providers`, {
      ...withAuthHeaders(cookies),
      params,
    });
    return res.data as GoogleProviderInfo[];
  },
  delete: async (id: string, cookies?: string) => {
    await api.delete(`/api/service-provider/${id}`, withAuthHeaders(cookies));
  },
  getSingle: async (id: string, homeId: string, cookies?: string) => {
    const res = await api.get(
      `/api/service-provider/single/${homeId}/${id}`,
      withAuthHeaders(cookies)
    );
    return res.data as ServiceProvider;
  },
  getSingleHistory: async (homeId: string, id: string, cookies?: string) => {
    const res = await api.get(
      `/api/service-provider/history/${homeId}/${id}`,
      withAuthHeaders(cookies)
    );
    return res.data as ServiceHistory[];
  },
  createProvider: async (
    data: CreateServiceProviderSchemaType,
    cookies?: string
  ) => {
    const res = await api.post(
      `/api/service-provider`,
      data,
      withAuthHeaders(cookies)
    );
    return res.data as ServiceProvider;
  },
  updateProvider: async (
    provId: string,
    data: CreateServiceProviderSchemaType,
    cookies?: string
  ) => {
    const res = await api.patch(
      `/api/service-provider/${provId}`,
      data,
      withAuthHeaders(cookies)
    );
    return res.data as ServiceProvider;
  },
  createProviderJob: async (
    provId: string,
    data: CreateJobBody
  ) => {
    const formData = new FormData();
    if (data.file) {
      formData.append("file", data.file);
    }
    Object.entries(data).forEach(([key, value]) => {
      if (key !== "file" && value !== undefined && value !== null) {
        if (typeof value === "object" || Array.isArray(value)) {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, String(value));
        }
      }
    });
    const res = await api.post(
      `/api/service-provider/rate-service-provider/${data.homeId}/${provId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return res.data as ServiceHistory;
  },
};
