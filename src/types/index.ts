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
  subscription: UserSubscription | null;
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
