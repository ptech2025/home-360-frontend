import { API_URL } from "@/utils/constants";
import {
  CompanyTradeSchemaType,
  OrgInfoSchemaType,
  PricingSchemaType,
} from "@/utils/zod-schemas";
import axios from "axios";
import { AuthUserType, PlaceSuggestion } from "@/types";

export const fetchUserClient = async () => {
  try {
    const res: { data: { user: AuthUserType } } = await axios.get(
      `${API_URL}/api/auth/get-session`,
      {
        withCredentials: true,
      }
    );

    const user = res.data.user;

    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const validateUserLocation = async ({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) => {
  const res: { data: { address: string; isInUSA: boolean } } = await axios.post(
    `${API_URL}/api/user/validate-location`,
    { latitude, longitude },
    {
      withCredentials: true,
    }
  );

  return res.data;
};

export const saveOrgOnboardingInfo = async (data: OrgInfoSchemaType) => {
  const formData = new FormData();

  if (data.companyLogo) {
    formData.append("file", data.companyLogo);
  }

  Object.entries(data).forEach(([key, value]) => {
    if (key !== "companyLogo" && value !== undefined && value !== null) {
      formData.append(key, String(value));
    }
  });

  return await axios.patch(
    `${API_URL}/api/user/organisation-onboarding`,
    formData,
    {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

export const saveTradeOnboardingInfo = async (data: CompanyTradeSchemaType) => {
  return await axios.patch(`${API_URL}/api/user/trading-onboarding`, data, {
    withCredentials: true,
  });
};
export const savePricingOnboardingInfo = async (data: PricingSchemaType) => {
  return await axios.patch(`${API_URL}/api/user/complete-onboarding`, data, {
    withCredentials: true,
  });
};

export const fetchPlaces = async (
  query: string
): Promise<PlaceSuggestion[]> => {
  const res: { data: { suggestions: PlaceSuggestion[] } } = await axios.get(
    `${API_URL}/api/user/places`,
    {
      params: { query },
      withCredentials: true,
    }
  );

  if (res.data.suggestions.length === 0) return [];

  return res.data.suggestions.map((s) => ({
    description: s.description.trim(),
    placeId: s.placeId,
  }));
};
