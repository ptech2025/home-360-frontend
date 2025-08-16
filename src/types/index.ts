import { SessionType } from "@/lib/auth-client";

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
