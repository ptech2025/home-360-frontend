import { Project } from "./project";

export interface Client {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
}

export interface ClientPagination {
  size: number;
  totalRecords: number;
  currentPage: number;
  totalPages: number;
}

export interface FetchAllClientRequestSearchParams {
  page: number;
  client?: string;
  size?: number;
}

export interface FetchAllClientsResponse {
  clients: Client[];
  pagination: ClientPagination;
}

export interface FetchClientRequestSearchParams {
  page: number;
  status?: string;
}

export interface FetchClientResponse {
  client: Client;
  projects: Project[];
  pagination: ClientPagination;
}

