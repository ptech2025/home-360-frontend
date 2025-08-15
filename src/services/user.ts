import { API_URL } from "@/utils/constants";
import {
  CompanyTradeSchemaType,
  OrgInfoSchemaType,
  PricingSchemaType,
} from "@/utils/zod-schemas";
import axios from "axios";
import { AuthUserType } from "@/types";

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

export const saveUserLocation = async ({
  lat,
  lng,
}: {
  lat: number;
  lng: number;
}) => {
  return await axios.put(
    `${API_URL}/api/user/location`,
    { lat, lng },
    {
      withCredentials: true,
    }
  );
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
