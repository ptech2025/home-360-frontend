import { api, withAuthHeaders } from "@/lib/axios-client";
import { Appliance, ApplianceMaintenance } from "@/types/prisma-schema-types";
import {
  ApplianceHistory,
  SuggestedAppliance,
  FetchAllAppliancesResponse,
  FetchApplianceMetricsResponse,
  FetchApplianceReminderResponse,
  FetchAppliancesParams,
  FetchSingleApplianceResponse,
} from "@/types";
import {
  CreateApplianceSchemaType,
  CreateApplianceMaintenanceSchemaType,
} from "@/types/zod-schemas";

export const applianceService = {
  fetchAll: async (
    homeId: string,
    params: FetchAppliancesParams,
    cookies?: string
  ) => {
    const res = await api.get(`/api/appliance/get-appliances/${homeId}`, {
      ...withAuthHeaders(cookies),
      params,
    });
    return res.data as FetchAllAppliancesResponse;
  },

  fetchSingle: async (
    homeId: string,
    applianceId: string,
    cookies?: string
  ) => {
    const res = await api.get(
      `/api/appliance/get-appliance/${homeId}/${applianceId}`,
      withAuthHeaders(cookies)
    );
    return res.data as FetchSingleApplianceResponse;
  },
  fetchSingleHistory: async (applianceId: string, cookies?: string) => {
    const res = await api.get(
      `/api/appliance/get-appliance-history/${applianceId}`,
      withAuthHeaders(cookies)
    );
    return res.data as ApplianceHistory[];
  },

  fetchApplianceMetrics: async (homeId: string, cookies?: string) => {
    const res = await api.get(
      `/api/appliance/metrics/${homeId}`,
      withAuthHeaders(cookies)
    );
    return res.data as FetchApplianceMetricsResponse;
  },

  create: async (homeId: string, data: CreateApplianceSchemaType) => {
    const formData = new FormData();
    if (data.image) {
      formData.append("image", data.image);
    }
    if (data.receipt) {
      formData.append("receipt", data.receipt);
    }
    Object.entries(data).forEach(([key, value]) => {
      if (
        key !== "image" &&
        key !== "receipt" &&
        value !== undefined &&
        value !== null
      ) {
        if (typeof value === "object" && value instanceof Date) {
          formData.append(key, value.toISOString());
        } else if (typeof value === "object" || Array.isArray(value)) {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, String(value));
        }
      }
    });
    const res = await api.post(
      `/api/appliance/add-appliance/${homeId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return res.data as Appliance;
  },

  update: async (
    homeId: string,
    applianceId: string,
    data: CreateApplianceSchemaType
  ) => {
    const formData = new FormData();
    if (data.image) {
      formData.append("image", data.image);
    }
    if (data.receipt) {
      formData.append("receipt", data.receipt);
    }
    Object.entries(data).forEach(([key, value]) => {
      if (
        key !== "image" &&
        key !== "receipt" &&
        value !== undefined &&
        value !== null
      ) {
        if (typeof value === "object" && value instanceof Date) {
          formData.append(key, value.toISOString());
        } else if (typeof value === "object" || Array.isArray(value)) {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, String(value));
        }
      }
    });
    const res = await api.patch(
      `/api/appliance/${homeId}/${applianceId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return res.data as Appliance;
  },

  delete: async (applianceId: string) => {
    await api.delete(`/api/appliance/${applianceId}`);
  },

  fetchApplianceEvents: async (
    homeId: string,
    date?: string,
    cookies?: string
  ) => {
    const res = await api.get(`/api/appliance/upcoming-reminders/${homeId}`, {
      ...withAuthHeaders(cookies),
      params: {
        date,
      },
    });
    return res.data as FetchApplianceReminderResponse;
  },

  createMaintenance: async (
    applianceId: string,
    data: CreateApplianceMaintenanceSchemaType
  ) => {
    const res = await api.post(`/api/appliance/maintenance/${applianceId}`, {
      ...data,
      maintenanceDate: data.maintenanceDate
        ? data.maintenanceDate.toISOString()
        : undefined,
    });
    return res.data as ApplianceMaintenance;
  },
  updateMaintenance: async (
    applianceId: string,
    maintenanceId: string,
    data: CreateApplianceMaintenanceSchemaType
  ) => {
    const res = await api.patch(`/api/appliance/maintenance/${applianceId}/${maintenanceId}`, {
      ...data,
      maintenanceDate: data.maintenanceDate
        ? data.maintenanceDate.toISOString()
        : undefined,
    });
    return res.data as ApplianceMaintenance;
  },
  fetchSuggestedAppliances: async (homeId: string, cookies?: string) => {
    const res = await api.get(
      `/api/appliance/suggestions/${homeId}`,
      withAuthHeaders(cookies)
    );
    return res.data as SuggestedAppliance[];
  },
  addSuggestedAppliance: async (
    homeId: string,
    applianceId: string,
    cookies?: string
  ) => {
    await api.post(
      `/api/appliance/suggestion/add-appliance/${homeId}/${applianceId}`,
      {},
      withAuthHeaders(cookies)
    );
  },
  markApplianceMaintenanceAsCompleted: async (
    applianceId: string,
    maintenanceId: string
  ) => {
    await api.patch(
      `/api/appliance/maintenance/${applianceId}/${maintenanceId}`
    );
  },
};
