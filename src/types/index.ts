import { SessionType } from "@/lib/auth-client";
import { Route } from "next";
import { JSX } from "react";
import {
  DocumentCategory,
  Home,
  Document,
  ServiceProvider,
  ProviderType,
  MaintenanceInstance,
  ReminderStatus,
  MaintenanceFrequency,
  ExpenseCategory,
  Reminder,
  Appliance,
  ApplianceCategory,
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
  items?: DashboardLink[];
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

export interface FetchAllServiceProvidersResponse {
  providers: ServiceProvider[];
  pagination: Pagination;
}
export interface FetchAllHomeTasksResponse {
  maintenances: MaintenanceInstance[];
  pagination: Pagination;
}

export interface FetchGoogleServiceProviderParams {
  homeId?: string;
  type: ProviderType;
  search?: string;
  rating?: number;
}

export interface FetchServiceProviderParams {
  search?: string;
  homeId?: string;
  type?: ProviderType;
  rating?: number;
  size?: number;
  page?: number;
}
export interface FetchHomeTasksParams {
  search?: string;
  status?: ReminderStatus;
  frequency?: MaintenanceFrequency;
  size?: number;
  page?: number;
  instanceType?: "all" | "custom" | "default";
}

export interface FetchApplianceReminderResponse {
  message: string;
  data: Reminder[];
}

export interface GoogleProviderInfo {
  id: string;
  name: string;
  address: string;
  phone: string | null;
  website: string | null;
  rating: number | null;
  totalReviews: number;
  distance: number;
  email: string | null;
}

export interface CreateJobBody {
  homeId: string;
  jobDescription: string;
  date: string;
  rating: number;
  amount: number;
  file?: File;
}

export interface FetchExpensesMetricsResponse {
  homeValue: number;
  totalMortgage: number;
  totalMonthlyExpenses: number;
}

export interface FetchAllExpensesResponse {
  data: {
    category: ExpenseCategory;
    totalAmount: number;
  }[];
}

export interface FetchApplianceMetricsResponse {
  totalAppliances: number;
  underWarranty: number;
  totalMaintenance: number;
  pendingMaintenance: number;
}

export type ApplianceWithWarranty = Appliance & {
  warrantyStatus: WarrantyStatus;
};

export type WarrantyStatus =
  | "No Warranty"
  | "Expired"
  | "Under Warranty"
  | "Expiring Soon";

export interface FetchAllAppliancesResponse {
  appliances: ApplianceWithWarranty[];
  pagination: Pagination;
}

export interface FetchSingleApplianceResponse extends Appliance {
  warranty?: {
    status: WarrantyStatus;
    expiryDate: Date | null;
  };
  reminder: {
    id: string;
    title: string;
    dueDate: Date;
    status: ReminderStatus;
  } | null;
  documents: { url: string; previewUrl: string | null }[];
}

export interface ApplianceHistory {
  type: "Maintenance" | "Installation" | "Purchase" | "Warranty";
  date: Date;
  title: string;
  details?: string;
  cost?: number;
  status?: string;
}

export interface FetchAppliancesParams {
  page?: number;

  size?: number;

  search?: string;

  category?: ApplianceCategory;
}
