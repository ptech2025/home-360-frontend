import { api, withAuthHeaders } from "@/lib/axios-client";
import { Expense } from "@/types/prisma-schema-types";
import {
  FetchAllExpensesResponse,
  FetchExpensesMetricsResponse,
} from "@/types";
import { CreateExpenseSchemaType } from "@/types/zod-schemas";

export const expenseService = {
  fetchAll: async (homeId: string, cookies?: string) => {
    const res = await api.get(
      `/api/expense/${homeId}/expense-breakdown`,
      withAuthHeaders(cookies)
    );
    return res.data as FetchAllExpensesResponse;
  },

  create: async (homeId: string, data: CreateExpenseSchemaType) => {
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
    const res = await api.post(`/api/expense/${homeId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data as Expense;
  },

  update: async (
    homeId: string,
    expenseId: string,
    data: CreateExpenseSchemaType
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
    const res = await api.patch(
      `/api/expense/${homeId}/${expenseId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return res.data as Expense;
  },

  delete: async (homeId: string, expenseId: string) => {
    await api.delete(`/api/expense/${homeId}/${expenseId}`);
  },

  fetchMetrics: async (homeId: string, cookies?: string) => {
    const res = await api.get(
      `/api/expense/${homeId}/summary`,
      withAuthHeaders(cookies)
    );
    return res.data as FetchExpensesMetricsResponse;
  },
};
