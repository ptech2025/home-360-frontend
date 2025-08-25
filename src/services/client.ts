import {
  FetchAllClientRequestSearchParams,
  FetchAllClientsResponse,
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

export const createClient = async (data: CreateClientSchemaType) => {
  return await axios.post(`${API_URL}/api/clients`, data, {
    withCredentials: true,
  });
};
