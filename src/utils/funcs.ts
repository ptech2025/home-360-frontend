import { AuthUserType, Subscription } from "@/types";
import { DocumentCategory, Document } from "@/types/prisma-schema-types";

export const getCurrentLocation = (): Promise<GeolocationPosition> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation not supported"));
      return;
    }

    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    });
  });
};

export function formatCurrencyWithSuffix(number: number): string {
  if (number < 1000) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    }).format(number);
  }

  const absNum = Math.abs(number);

  let suffix: string;
  let divisor: number;

  if (absNum >= 1_000_000_000) {
    divisor = 1_000_000_000;
    suffix = "B";
  } else if (absNum >= 1_000_000) {
    divisor = 1_000_000;
    suffix = "M";
  } else {
    divisor = 1_000;
    suffix = "K";
  }

  const divided = number / divisor;
  const rounded = Math.floor(divided * 10) / 10;
  const hasDecimal = rounded % 1 !== 0;
  const formatted = hasDecimal ? rounded.toFixed(1) : rounded.toFixed(0);

  // Determine if number is not perfectly divisible
  const isClean = number % divisor === 0;
  const plus = isClean ? "" : "+";

  return `$${formatted}${suffix}${plus}`;
}

export function formatCurrency(number: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(number);
}
export function formatEstimateId(id: string | undefined): string {
  const formattedId = `EST-${id?.slice(0, 6)}`;
  return formattedId.toUpperCase();
}

export function formatTimer(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
}

export function formatNameWithDot(name: string): string {
  const parts = name.trim().split(/\s+/);

  if (parts.length === 0) return "";

  const firstInitial = parts[0][0].toUpperCase();
  const lastName = parts.length > 1 ? parts[1].toLowerCase() : "";

  return lastName ? `${firstInitial}.${lastName}` : firstInitial;
}

export const getPlanLabel = (plan: Subscription, user: AuthUserType) => {
  const label = user.subscription
    ? user.subscription.plan.id === plan.id
      ? "Current Plan"
      : `${plan.name.toLowerCase() === "pro plan" ? "Upgrade" : "Change"} to ${
          plan.name
        }`
    : `Upgrade to ${plan.name}`;
  return label;
};

export const isCurrentPlan = (plan: Subscription, user: AuthUserType) => {
  if (!user.subscription) return false;
  return user.subscription.plan.id === plan.id;
};


export const getDocumentCategoryCount = (category: DocumentCategory, documents: Document[]) => {
  const count = documents.filter(doc => doc.category === category).length;
  return count;
}