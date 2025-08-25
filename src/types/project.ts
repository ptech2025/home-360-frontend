import { AuthUserType } from ".";
import { Client } from "./client";

export enum ProjectStatus {
  draft,
  bidding,
  approved,
  in_progress,
  completed,
  archived,
}

export interface Project {
  id: string;
  title: string;
  address: string;
  clientId: string | null;
  client: Client | null;
  user: AuthUserType;
  status: ProjectStatus;
  createdAt: Date;
}

export interface ProjectPagination {
  size: number;
  totalRecords: number;
  currentPage: number;
  totalPages: number;
}

export interface FetchAllProjectsRequestSearchParams {
  page: number;
  title: string | undefined;
}

export interface FetchAllProjectsResponse {
  projects: Project[];
  pagination: ProjectPagination;
}
