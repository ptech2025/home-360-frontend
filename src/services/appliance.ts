import { api, withAuthHeaders } from "@/lib/axios-client";
import { FetchAllHomeTasksResponse, FetchApplianceReminderResponse, FetchHomeTasksParams } from "@/types";
import { MaintenanceInstance, Reminder } from "@/types/prisma-schema-types";
import { CreateHomeTaskSchemaType } from "@/types/zod-schemas";

export const applianceService = {
  addTask: async (
    homeId: string,
    data: CreateHomeTaskSchemaType,
    cookies?: string
  ) => {
    const res = await api.post(
      `/api/maintenance/add-maintenance-instance/${homeId}`,
      data,
      withAuthHeaders(cookies)
    );
    return res.data as MaintenanceInstance;
  },
  updateTask: async (
    homeId: string,
    taskId: string,
    data: CreateHomeTaskSchemaType,
    cookies?: string
  ) => {
    const res = await api.patch(
      `/api/maintenance/update-user-maintenance/${homeId}/${taskId}`,
     data,
      withAuthHeaders(cookies)
    );
    return res.data as MaintenanceInstance;
  },
  markAsCompleted: async (taskId: string, cookies?: string) => {
    await api.patch(
      `/api/maintenance/mark-as-completed/${taskId}`,
      withAuthHeaders(cookies)
    );
  },
  fetchAll: async (
    homeId: string,
    params: FetchHomeTasksParams,
    cookies?: string
  ) => {
    const res = await api.get(
      `/api/maintenance/get-user-maintenance/${homeId}`,
      {
        ...withAuthHeaders(cookies),
        params,
      }
    );
    return res.data as FetchAllHomeTasksResponse;
  },

  delete: async (homeId: string, taskId: string, cookies?: string) => {
    await api.delete(
      `/api/maintenance/delete-user-maintenance/${homeId}/${taskId}`,
      withAuthHeaders(cookies)
    );
  },
  fetchTaskEvents: async (homeId: string, date?: string, cookies?: string) => {
    const res = await api.get(
      `/api/maintenance/upcoming-maintenance/${homeId}`,
      {
        ...withAuthHeaders(cookies),
        params: {
          date,
        },
      }
    );
    return res.data as MaintenanceInstance[];
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
};
