import { api, withAuthHeaders } from "@/lib/axios-client";
import {
  FetchPlacesParams,
  FetchLocationParams,
  PlaceSuggestion,
  FetchHomesParams,
  FetchAllHomesResponse,
  AuthUserType,
} from "@/types";
import { Home, PublicRecord } from "@/types/prisma-schema-types";
import {
  PersonalInfoSchemaType,
  UpdateHomeDetailsSchemaType,
} from "@/types/zod-schemas";

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

  createHome: async (data: { address: string }) => {
    const res = await api.post("/api/public-record/lookup", data);
    return res.data as {
      home: Home | null;
      record: PublicRecord | null;
      message: string;
    };
  },
  updateHome: async (data: { address: string; homeId: string }) => {
    const res = await api.post(`/api/public-record/refetch/lookup`, data);
    return res.data as {
      home: Home | null;
      record: PublicRecord | null;
      message: string;
    };
  },
  updateHomeDetails: async (
    homeId: string,
    data: UpdateHomeDetailsSchemaType
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
    const res = await api.patch(`/api/home/${homeId}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data as Home;
  },
  updateProfile: async (data: PersonalInfoSchemaType) => {
    const formData = new FormData();
    formData.append("name", `${data.firstName} ${data.lastName}`);
    if (data.image) {
      formData.append("file", data.image);
    }

    const res = await api.patch("/api/user/update-user-info", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return res.data as AuthUserType;
  },
  getHome: async (id: string, cookies?: string) => {
    const res = await api.get(`/api/home/${id}`, withAuthHeaders(cookies));
    return res.data as Home | null;
  },
  getHomes: async (params: FetchHomesParams, cookies?: string) => {
    const res = await api.get(`/api/home`, {
      ...withAuthHeaders(cookies),
      params,
    });
    return res.data as FetchAllHomesResponse;
  },
};
