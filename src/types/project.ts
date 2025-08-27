import { AuthUserType } from ".";
import { Client } from "./client";
import { Estimate } from "./estimate";

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
  estimates: Estimate[];
}

export interface ProjectPagination {
  size: number;
  totalRecords: number;
  currentPage: number;
  totalPages: number;
}

export interface FetchAllProjectsRequestSearchParams {
  page: number;
  title?: string;
  status?: string;
}

export interface FetchAllProjectsResponse {
  projects: Project[];
  pagination: ProjectPagination;
}
export interface FetchSingleProjectResponse {
  project: Project;
  projectTotalValue: number;
}
