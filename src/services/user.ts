import { api, withAuthHeaders } from "@/lib/axios-client";

export const userService = {
  getAll: async (cookies?: string) => {
    const res = await api.get("/users", withAuthHeaders(cookies));
    return res.data as { id: string; name: string }[];
  },
  getById: async (id: string, cookies?: string) => {
    const res = await api.get(`/users/${id}`, withAuthHeaders(cookies));
    return res.data as { id: string; name: string };
  },
  saveToWaitList: async (data: { email: string }) => {
    await api.post(`/api/waitlist`, data);
  },
  unSubscribeFromWaitList: async (email: string) => {
    await api.patch(`/api/waitlist/unsubscribe`, { email });
  },
};
