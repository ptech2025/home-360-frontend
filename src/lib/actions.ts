"use server";
import { AuthUserType } from "@/types";
import { API_URL } from "@/utils/constants";

import axios from "axios";
import { cookies } from "next/headers";

export const fetchUserServer = async () => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  console.log("server cookie", cookieHeader);

  try {
    const res: { data: { user: AuthUserType } } = await axios.get(
      `${API_URL}/api/auth/get-session`,
      {
        headers: { Cookie: cookieHeader },
      }
    );

    const user = res.data.user;

    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
};
