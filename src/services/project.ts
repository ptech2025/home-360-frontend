import {
  FetchAllProjectsRequestSearchParams,
  FetchAllProjectsResponse,
} from "@/types/project";
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

export const createProject = async (title: string) => {
  return await axios.post(
    `${API_URL}/api/project`,
    {
      title,
    },
    {
      withCredentials: true,
    }
  );
};
export const updateProjectTitle = async (title: string, projectId: string) => {
  return await axios.patch(
    `${API_URL}/api/project/update-title/${projectId}`,
    {
      title,
    },
    {
      withCredentials: true,
    }
  );
};
export const deleteProject = async (projectId: string) => {
  return await axios.delete(`${API_URL}/api/project/${projectId}`, {
    withCredentials: true,
  });
};

export const fetchAllProjects = async (
  searchParams: FetchAllProjectsRequestSearchParams
): Promise<FetchAllProjectsResponse> => {
  try {
    const res: { data: FetchAllProjectsResponse } = await axios.get(
      `${API_URL}/api/project`,
      {
        withCredentials: true,
        params: {
          ...searchParams,
          search: searchParams.title,
        },
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

export const addClientToProject = async (
  projectId: string,
  clientId: string
) => {
  return await axios.patch(
    `${API_URL}/api/project/add-client/${projectId}/${clientId}`,
    {},
    {
      withCredentials: true,
    }
  );
};
