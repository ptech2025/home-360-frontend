import { api, withAuthHeaders } from "@/lib/axios-client";
import {
  FetchPlacesParams,
  FetchLocationParams,
  PlaceSuggestion,
} from "@/types";
import { Home, PublicRecord } from "@/types/prisma-schema-types";

export const userService = {
  fetchPlaces: async (params: FetchPlacesParams) => {
    const res = await api.get(`/api/user/places`, {
      params,
    });
    return res.data.suggestions as PlaceSuggestion[];
  },
  fetchLocation: async (params: FetchLocationParams) => {
    const res = await api.get(`/api/user/dynamic-places`, {
      params,
    });
    return res.data.suggestions as PlaceSuggestion[];
  },
  saveToWaitList: async (data: { email: string }) => {
    await api.post(`/api/waitlist`, data);
  },
  unSubscribeFromWaitList: async (email: string) => {
    await api.patch(`/api/waitlist/unsubscribe`, { email });
  },

  onboarded: async () => {
    await api.patch(`/api/user/complete-onboarding`);
  },

  createHome: async (data: { address: string; name: string }) => {
    const res = await api.post("/api/public-record/lookup", data);
    return res.data as {
      home: Home | null;
      record: PublicRecord | null;
      message: string;
    };
  },
  updateHome: async (data: {
    address: string;
    name: string;
    homeId: string;
  }) => {
    const res = await api.post(`/api/home/address/${data.homeId}`, data);
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
  getHomes: async (cookies?: string) => {
    const res = await api.get(`/api/home`, withAuthHeaders(cookies));
    return res.data as Home[];
  },
};
