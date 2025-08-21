"use server";
import { AuthUserType } from "@/types";
import { ChatSession } from "@/types/chat";
import { MyUIMessage } from "@/types/message-schema";
import { API_URL } from "@/utils/constants";

import axios from "axios";
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

export const createChatSessionServer = async () => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  let redirectUrl = "/dashboard/projects";

  try {
    const res = await axios.post(
      `${API_URL}/api/chat-session/create`,
      {},
      {
        headers: { Cookie: cookieHeader },
      }
    );
    const sessionId = res.data.sessionId;
    redirectUrl = `/dashboard/chat/${sessionId}`;
  } catch (error) {
    console.error("Error creating session:", error);
  }
  revalidateTag("chat-sessions");
  revalidatePath("/dashboard", "layout");

  redirect(redirectUrl);
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
      prompt: prompt.trim(),
      title: projectTitle.length > 0 ? projectTitle : "Untitled",
    },
    {
      headers: { Cookie: cookieHeader },
      withCredentials: true,
    }
  );
  const sessionId = res.data.sessionId as string;

  redirectUrl = `/dashboard/chat/${sessionId}`;

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
