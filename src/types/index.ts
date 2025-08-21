import { SessionType } from "@/lib/auth-client";
import { JSX } from "react";
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
  profile: ProfileType | null;
};

export type PlaceSuggestion = {
  description: string;
  placeId: string;
};

export type UserRole = "user" | "admin";

export interface DashboardLink {
  icon: JSX.Element;
  title: string;
  url: string;
  access: UserRole[];
  items?: {
    title: string;
    url: string;
  }[];
}
