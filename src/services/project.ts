import { API_URL } from "@/utils/constants";

import axios from "axios";

export const initiateProject = async ({
  prompt,
  projectTitle,
}: {
  prompt: string;
  projectTitle: string;
}) => {
  const res = await axios.post(
    `${API_URL}/api/chat-session/initiate-project`,
    {
      prompt,
      title: projectTitle.length > 0 ? projectTitle : "Untitled",
    },
    {
      withCredentials: true,
    }
  );

  const sessionId = res.data.sessionId as string;
  return sessionId;
};

export const createProject = async () => {
  const res = await axios.post(`${API_URL}/api/chat-session/create-`, {
    withCredentials: true,
  });

  const sessionId = res.data.sessionId;

  return sessionId;
};

export const fetchAllProjects = async () => {
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

export const fetchSingleProject = async (sessionId: string) => {
  try {
    const res: { data: { messages: string[] } } = await axios.get(
      `${API_URL}/api/chat-session/history/${sessionId}`,
      {
        withCredentials: true,
      }
    );
    return res.data.messages;
  } catch (error) {
    console.error(error);
    return [];
  }
};
