import { AuthUserType } from "@/types";
import {
  DocumentCategory,
  Document,
  SubscriptionPlan,
} from "@/types/prisma-schema-types";
import { format } from "date-fns";

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

export const getPlanLabel = (plan: SubscriptionPlan, user: AuthUserType) => {
  const label =
    user.subscription && user.subscription.plan
      ? user.subscription.plan.id === plan.id
        ? "Current Plan"
        : `${
            plan.name.toLowerCase() === "pro plan" ? "Upgrade" : "Change"
          } to ${plan.name}`
      : `Upgrade to ${plan.name}`;
  return label;
};

export const isCurrentPlan = (plan: SubscriptionPlan, user: AuthUserType) => {
  if (!user.subscription || !user.subscription.plan) return false;
  return user.subscription.plan.id === plan.id;
};

export const getDocumentCategoryCount = (
  category: DocumentCategory,
  documents: Document[]
) => {
  const count = documents.filter((doc) => doc.category === category).length;
  return count;
};

export function formatFileSize(size: number) {
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`;
  return `${(size / 1024 / 1024).toFixed(2)} MB`;
}

export const renderDocumentCategoryStyle = (category: DocumentCategory) => {
  switch (category) {
    case DocumentCategory.deed:
      return "bg-emerald-100 text-emerald-700"; // legal/ownership → trustworthy green

    case DocumentCategory.mortgage:
      return "bg-blue-100 text-blue-700"; // finance → stability

    case DocumentCategory.warranty:
      return "bg-green-100 text-green-700"; // assurance → green tone

    case DocumentCategory.insurance:
      return "bg-yellow-100 text-yellow-700"; // safety → yellow

    case DocumentCategory.tax_record:
      return "bg-orange-100 text-orange-700"; // government → orange

    case DocumentCategory.utility_bill:
      return "bg-purple-100 text-purple-700"; // recurring → purple

    case DocumentCategory.other:
      return "bg-gray-100 text-gray-700"; // fallback → neutral

    default:
      throw new Error("Invalid Document Category");
  }
};

export const renderValue = (key: string, value: any) => {
  // dates
  if (["taxDueDate", "lastSaleDate"].includes(key)) {
    return value ? format(new Date(value.toString()), "MMM dd, yyyy") : "N/A";
  }
  // amount numbers
  if (
    [
      "homeValue",
      "landValue",
      "annualTax",
      "appraisedValue",
      "assessedValue",
      "lastSalePrice",
      "improvementValue",
    ].includes(key)
  ) {
    return value ? `$${value?.toLocaleString()}` : "N/A";
  }
  // other numbers
  if (
    [
      "bedrooms",
      "lotSizeSqFt",
      "bathrooms",
      "squareFeet",
      "buildingSqft",
      "lotSizeSqft",
    ].includes(key)
  ) {
    return value ? value?.toLocaleString() : "N/A";
  }
  // strings
  return value ? value.toString() : "N/A";
};

export const getDefaultImage = (name: string) => {
  return `https://ui-avatars.com/api/?size=60&background=2d6a4f&color=fff&rounded=true&name=${name}`;
};
