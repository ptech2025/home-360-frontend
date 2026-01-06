"use server";
import { AuthUserType } from "@/types";

import { PersonalInfoSchemaType } from "@/types/zod-schemas";
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

// export const fetchUserServer = async (): Promise<AuthUserType | null> => {
//   const cookieStore = cookies();

//   const cookieHeader = cookieStore
//   // @ts-ignore
//     .getAll()
//     .map((c:any) => `${c.name}=${c.value}`)
//     .join("; ");

//   try {
//     const res = await fetch(`${API_URL}/api/user/details`, {
//       headers: {
//         cookie: cookieHeader,
//       },
//       credentials: "include",
//       cache: "no-store",
//     });

//     if (!res.ok) return null;

//     return (await res.json()) as AuthUserType;
//   } catch (err) {
//     console.error("fetchUserServer failed:", err);
//     return null;
//   }
// };

export const fetchUserServerWithCookies = async (cookieHeader: string) => {
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
