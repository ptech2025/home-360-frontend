import {
  FetchAllClientRequestSearchParams,
  FetchAllClientsResponse,
  FetchClientRequestSearchParams,
  FetchClientResponse,
} from "@/types/client";
import axios from "axios";
import { API_URL } from "@/utils/constants";
import { CreateClientSchemaType } from "@/types/zod-schemas";

export const fetchAllClients = async (
  searchParams: FetchAllClientRequestSearchParams
): Promise<FetchAllClientsResponse> => {
  try {
    const res: { data: FetchAllClientsResponse } = await axios.get(
      `${API_URL}/api/clients`,
      {
        withCredentials: true,
        params: {
          ...searchParams,
          search: searchParams.client,
        },
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

export const fetchClientById = async (
  clientId: string,
  searchParams: FetchClientRequestSearchParams
) => {
  try {
    const res: { data: FetchClientResponse } = await axios.get(
      `${API_URL}/api/clients/${clientId}`,
      {
        withCredentials: true,
        params: {
          ...searchParams,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const createClient = async (data: CreateClientSchemaType) => {
  return await axios.post(`${API_URL}/api/clients`, data, {
    withCredentials: true,
  });
};

export const updateClient = async (
  clientId: string,
  data: CreateClientSchemaType
) => {
  return await axios.patch(`${API_URL}/api/clients/${clientId}`, data, {
    withCredentials: true,
  });
};

export const deleteClient = async (clientId: string) => {
  return await axios.delete(`${API_URL}/api/clients/${clientId}`, {
    withCredentials: true,
  });
};
