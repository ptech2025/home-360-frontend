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
  Subscription,
  UserQuota,
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
  subscription: Subscription;
  homes: Home[];
  userQuotas?: UserQuota;
};

export type UserUsage = {
  document?: {
    allocated: number;
    used: number;
    remaining: number;
  };
  ai_query?: {
    allocated: number;
    used: number;
    remaining: number;
  };
  appliance?: {
    allocated: number;
    used: number;
    remaining: number;
  };
};

export interface FetchHomesParams {
  search?: string;
  size?: number;
  page?: number;
}

export type PlaceSuggestion = {
  description: string;
  placeId: string;
};

export type UserRole = "user" | "admin" | "super_admin";

export interface DashboardLink {
  icon: JSX.Element;
  title: string;
  url: Route;
  access: UserRole[];
  items?: DashboardLink[];
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
  tag?: string;
  category?: DocumentCategory;
  search?: string;
}

export interface FetchAllDocumentsResponse {
  documents: Document[];
  pagination: Pagination;
  documentUsage: UserUsage["document"];
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
  applianceUsage: UserUsage["appliance"];
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
  maintenanceId?: string;
  applianceId?: string;
}

export interface FetchAppliancesParams {
  page?: number;

  size?: number;

  search?: string;

  category?: ApplianceCategory;
}

export interface FetchAllHomesResponse {
  homes: Home[];
  pagination: Pagination;
}

export interface SuggestedAppliance {
  selected: boolean;
  applianceId: string | null;
  id: string;
  name: string;
  category: ApplianceCategory;
  createdAt: Date;
  updatedAt: Date;
  applianceCategory: ApplianceCategory | null;
}
