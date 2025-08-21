import { API_URL } from "@/utils/constants";
import axios from "axios";
import { MyUIMessage } from "@/types/message-schema";

export const createSession = async () => {
  const res = await axios.post(
    `${API_URL}/api/chat-session/create`,
    {},
    {
      withCredentials: true,
    }
  );
  const sessionId = res.data.sessionId as string;

  return sessionId;
};

export const fetchAllChatSession = async () => {
  try {
    const res: { data: { sessions: string[] } } = await axios.get(
      `${API_URL}/api/user/sessions`,
      {
        withCredentials: true,
      }
    );
    return res.data.sessions;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const fetchMessages = async (sessionId: string) => {
  try {
    const res = await axios.get(
      `${API_URL}/api/chat-session/history/${sessionId}`,
      {
        withCredentials: true,
      }
    );
    const messages: MyUIMessage[] = res.data;
    return messages;
  } catch (error) {
    console.error("Error fetching messages:", error);
    return null;
  }
};

export const sendChatMessage = async (sessionId: string, prompt: string) => {
  return await axios.post(
    `${API_URL}/api/chat-session/send`,
    {
      chatId: sessionId,
      prompt,
    },
    {
      withCredentials: true,
    }
  );
};

export const initiateNewChatSession = async (prompt: string) => {
  const sessionId = await createSession();
  sendChatMessage(sessionId, prompt);
  return sessionId;
};
