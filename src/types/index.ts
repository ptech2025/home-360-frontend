import { SessionType } from "@/lib/auth-client";
import { Route } from "next";
import { JSX } from "react";
import {
  DocumentCategory,
  Home,
  Document,
  Appliance,
} from "./prisma-schema-types";
export type ProfileType = {
  id: string;
  companyName: string;
  companyLogo?: string;
  license?: string;
  companyTrade: string[];
  phoneNumber: string;
  location?: string;
  markupPercentage?: number;
  userId: string;
};

export type AuthUserType = SessionType["user"] & {
  subscription: UserSubscription | null;
  homes: Home[];
};

export type UserSubscription = {
  status: "active" | "trailing" | "canceled" | "expired";
  plan: {
    id: string;
    name: string;
    active: boolean;
    price: number;
    interval: "monthly" | "yearly";
  };
};

export type PlaceSuggestion = {
  description: string;
  placeId: string;
};

export type UserRole =
  | "single_home_owner"
  | "multiple_home_owner"
  | "admin"
  | "super_admin";

export interface DashboardLink {
  icon: JSX.Element;
  title: string;
  url: Route;
  access: UserRole[];
}

export interface Subscription {
  id: string;
  name: string;
  price: number;
  interval: "monthly" | "yearly";
  active: boolean;
  benefits: {
    id: string;
    planId: string;
    benefit: string;
  }[];
}

export enum DynamicLocationStatus {
  street = "street",
  city = "city",
  state = "state",
}

export interface FetchPlacesParams {
  usOnly?: boolean;
  citiesOnly?: boolean;
  query: string;
}

export interface FetchLocationParams {
  query: string;
  mode: DynamicLocationStatus;
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalRecords: number;
  size: number;
}

export interface FetchDocumentParams {
  page?: number;
  size?: number;
  tags?: string[];
  category?: DocumentCategory;
  search?: string;
}

export interface FetchAllDocumentsResponse {
  documents: Document[];
  pagination: Pagination;
}

export interface FetchDashboardMetricResponse {
  appliancesCount: number;
  documentsCount: number;
  expenseMetrics: {
    currentMonthTotal: number;
    previousMonthTotal: number;
    percentageChange: number;
  };
}
