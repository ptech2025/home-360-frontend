"use server";
import { AuthUserType } from "@/types";
import { ChatSession } from "@/types/chat";
import {
  FetchAllClientRequestSearchParams,
  FetchAllClientsResponse,
  FetchClientRequestSearchParams,
  FetchClientResponse,
} from "@/types/client";
import { Estimate } from "@/types/estimate";
import { MyUIMessage } from "@/types/message-schema";
import {
  FetchAllProjectsRequestSearchParams,
  FetchAllProjectsResponse,
  FetchProjectEstimateResponse,
  FetchSingleProjectResponse,
} from "@/types/project";
import {
  CompanyInfoSchemaType,
  PersonalInfoSchemaType,
} from "@/types/zod-schemas";
import { API_URL } from "@/utils/constants";

import axios  from "axios";
import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const fetchUserServer = async () => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  try {
    const res = await axios.get(`${API_URL}/api/user/details`, {
      headers: { Cookie: cookieHeader },
    });
    const data: AuthUserType & { hasProjects: boolean } = res.data;

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

export const createChatSessionServer = async () => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  let redirectUrl = "/dashboard/projects";

  const res = await axios.post(
    `${API_URL}/api/chat-session/create`,
    {},
    {
      headers: { Cookie: cookieHeader },
      withCredentials: true,
    }
  );
  redirectUrl = `/dashboard/c/${res.data.sessionId}`;

  revalidateTag("chat-sessions");
  revalidatePath("/dashboard", "layout");

  redirect(redirectUrl);
};

export const deleteChatSessionServer = async (sessionId: string) => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();
  await axios.delete(`${API_URL}/api/chat-session/history/${sessionId}`, {
    headers: { Cookie: cookieHeader },
    withCredentials: true,
  });
  revalidateTag("chat-sessions");
  revalidatePath("/dashboard", "layout");
};

export const initiateProjectServer = async ({
  prompt,
  projectTitle,
}: {
  prompt: string;
  projectTitle: string;
}) => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  let redirectUrl: string | null = null;
  const res = await axios.post(
    `${API_URL}/api/chat-session/initiate-project`,
    {
      prompt,
      title: projectTitle.length > 0 ? projectTitle : "Untitled",
    },
    {
      headers: { Cookie: cookieHeader },
      withCredentials: true,
    }
  );
  const sessionId = res.data.sessionId as string;

  redirectUrl = `/dashboard/c/${sessionId}`;

  if (redirectUrl) {
    redirect(redirectUrl);
  }
};

export const fetchUserSessionsServer = async () => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  try {
    const res = await fetch(`${API_URL}/api/chat-session/all`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader,
      },
      next: { tags: ["chat-sessions"] },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch chat sessions");
    }
    const data: { sessions: ChatSession[] } = await res.json();
    const sessions = data.sessions;
    return sessions;
  } catch (error) {
    console.error("Error fetching chat sessions:", error);
    return [];
  }
};

export const fetchMessagesServer = async (sessionId: string) => {
  try {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();

    const res = await axios.get(
      `${API_URL}/api/chat-session/history/${sessionId}`,
      {
        headers: { Cookie: cookieHeader },
        withCredentials: true,
      }
    );
    const messages: MyUIMessage[] = res.data;
    return messages;
  } catch (error) {
    console.error("Error fetching messages (server)", error);
    return null;
  }
};
export const fetchEstimateByIdServer = async (id: string) => {
  try {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();

    const res = await axios.get(`${API_URL}/api/estimate/${id}`, {
      headers: { Cookie: cookieHeader },
      withCredentials: true,
    });
    const estimate: Estimate = res.data;
    return estimate;
  } catch (error) {
    console.error("Error fetching estimate (server)", error);
    return null;
  }
};

export const fetchAllProjectsServer = async (
  searchParams: FetchAllProjectsRequestSearchParams
): Promise<FetchAllProjectsResponse> => {
  try {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();
    const res: { data: FetchAllProjectsResponse } = await axios.get(
      `${API_URL}/api/project`,
      {
        headers: { Cookie: cookieHeader },
        withCredentials: true,
        params: searchParams,
      }
    );
    return res.data;
  } catch (error) {
    console.error(error);
    return {
      projects: [],
      pagination: {
        size: 10,
        totalRecords: 0,
        currentPage: 1,
        totalPages: 1,
      },
    };
  }
};

export const fetchAllClientsServer = async (
  searchParams: FetchAllClientRequestSearchParams
): Promise<FetchAllClientsResponse> => {
  try {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();
    const res: { data: FetchAllClientsResponse } = await axios.get(
      `${API_URL}/api/clients`,
      {
        headers: { Cookie: cookieHeader },
        withCredentials: true,
        params: searchParams,
      }
    );
    return res.data;
  } catch (error) {
    console.error(error);
    return {
      clients: [],
      pagination: {
        size: 10,
        totalRecords: 0,
        currentPage: 1,
        totalPages: 1,
      },
    };
  }
};

export const fetchSingleProjectServer = async (projectId: string) => {
  try {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();
    const res: { data: FetchSingleProjectResponse } = await axios.get(
      `${API_URL}/api/project/single/${projectId}`,
      {
        headers: { Cookie: cookieHeader },
        withCredentials: true,
      }
    );
    return res.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const fetchClientByIdServer = async (
  clientId: string,
  searchParams: FetchClientRequestSearchParams
) => {
  try {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();
    const res: { data: FetchClientResponse } = await axios.get(
      `${API_URL}/api/clients/${clientId}`,
      {
        headers: { Cookie: cookieHeader },
        withCredentials: true,
        params: searchParams,
      }
    );
    return res.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const fetchProjectEstimatesServer = async (projectId: string) => {
  try {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();
    const res: { data: FetchProjectEstimateResponse } = await axios.get(
      `${API_URL}/api/project/estimates/${projectId}`,
      {
        headers: { Cookie: cookieHeader },
        withCredentials: true,
      }
    );
    return res.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
