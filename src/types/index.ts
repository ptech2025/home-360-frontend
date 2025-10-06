import { SessionType } from "@/lib/auth-client";
import { Route } from "next";
import { JSX } from "react";
import { Home } from "./home";
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

export type UserRole = "single_home_owner" | "multiple_home_owner" | "admin";

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
