"use server";
import { AuthUserType, Subscription } from "@/types";

import {
  CompanyInfoSchemaType,
  PersonalInfoSchemaType,
} from "@/types/zod-schemas";
import { API_URL } from "@/utils/constants";

import axios from "axios";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const fetchUserServer = async () => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  try {
    const res = await axios.get(`${API_URL}/api/user/details`, {
      headers: { Cookie: cookieHeader },
    });
    const data: AuthUserType = res.data;

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const updateUserPersonalInfoServer = async (
  data: PersonalInfoSchemaType
) => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();
  const formData = new FormData();

  formData.append("name", `${data.firstName} ${data.lastName}`);

  if (data.image) {
    formData.append("file", data.image);
  }

  try {
    await axios.patch(`${API_URL}/api/user/update-user-info`, formData, {
      headers: {
        Cookie: cookieHeader,
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }

  revalidatePath("/dashboard", "layout");
  revalidatePath("/dashboard/settings", "page");
};

export const updateUserCompanyInfoServer = async (
  data: CompanyInfoSchemaType
) => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();
  const formData = new FormData();

  if (data.companyLogo) {
    formData.append("file", data.companyLogo);
  }

  Object.entries(data).forEach(([key, value]) => {
    if (key !== "companyLogo" && value !== undefined && value !== null) {
      if (typeof value === "object") {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, String(value));
      }
    }
  });

  try {
    await axios.patch(`${API_URL}/api/user/update-user-profile`, formData, {
      headers: { Cookie: cookieHeader, "Content-Type": "multipart/form-data" },
    });
  } catch (error) {
    throw error;
  }
  revalidatePath("/dashboard/settings", "page");
  revalidatePath("/dashboard", "layout");
};

export const fetchSubscriptionsServer = async (): Promise<Subscription[]> => {
  try {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();
    const res: { data: Subscription[] } = await axios.get(
      `${API_URL}/api/subscription`,
      {
        headers: { Cookie: cookieHeader },
        withCredentials: true,
      }
    );
    return res.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
