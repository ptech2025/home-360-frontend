import { api, withAuthHeaders } from "@/lib/axios-client";
import { Home, PublicRecord } from "@/types/prisma-schema-types";

export const userService = {
  saveToWaitList: async (data: { email: string }) => {
    await api.post(`/api/waitlist`, data);
  },
  unSubscribeFromWaitList: async (email: string) => {
    await api.patch(`/api/waitlist/unsubscribe`, { email });
  },

  onboarded: async () => {
    await api.post(`/api/onboarded`);
  },

  createHome: async (address: string) => {
    const res = await api.post("/api/public-record/lookup", { address });
    return res.data as {
      home: Home | null;
      record: PublicRecord | null;
      message: string;
    };
  },
  getHome: async (id: string, cookies?: string) => {
    const res = await api.get(`/api/home/${id}`, withAuthHeaders(cookies));
    return res.data as Home | null;
  },
};
