import { AuthUserType, UserUsage } from "@/types";
import {
  DocumentCategory,
  Document,
  SubscriptionPlan,
} from "@/types/prisma-schema-types";
import { format, startOfDay } from "date-fns";
import { MaintenanceInstance, Reminder } from "@/types/prisma-schema-types";

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

export const renderValue = (key: string, value: string | number | null | undefined) => {
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

export function computeBookedCalendarDates(args: {
  type: "tasks" | "reminders";
  tasks?: MaintenanceInstance[];
  reminders?: Reminder[];
}): {
  bookedDefaultDates: Date[];
  bookedCustomDates: Date[];
  bookedApplianceDates: Date[];
} {
  const { type, tasks = [], reminders = [] } = args;

  const uniqueByDay = (dates: Date[]) => {
    const seen = new Set<string>();
    const result: Date[] = [];
    for (const d of dates) {
      const local = startOfDay(new Date(d));
      const key = `${local.getFullYear()}-${local.getMonth()}-${local.getDate()}`;
      if (!seen.has(key)) {
        seen.add(key);
        result.push(
          new Date(local.getFullYear(), local.getMonth(), local.getDate())
        );
      }
    }
    return result;
  };

  if (type === "tasks") {
    const defaultDates = uniqueByDay(
      tasks
        .filter((t) => !t.isCustom)
        .map((t) => new Date(t.dueDate as unknown as string | number | Date))
    );

    const customDates = uniqueByDay(
      tasks
        .filter((t) => t.isCustom)
        .map((t) => new Date(t.dueDate as unknown as string | number | Date))
    );

    return {
      bookedDefaultDates: defaultDates,
      bookedCustomDates: customDates,
      bookedApplianceDates: [],
    };
  }

  // reminders (appliance)
  const applianceDates = uniqueByDay(
    reminders.map(
      (r) => new Date(r.dueDate as unknown as string | number | Date)
    )
  );

  return {
    bookedDefaultDates: [],
    bookedCustomDates: [],
    bookedApplianceDates: applianceDates,
  };
}

// ==================== Subscription Permission Helpers ====================

type PlanTier = "starter" | "pro_plus" | "business" | "unknown";

/**
 * Determines the plan tier from plan name
 */
function getPlanTier(planName: string | null | undefined): PlanTier {
  if (!planName) return "unknown";
  const name = planName.toLowerCase();
  if (name.includes("starter")) return "starter";
  if (name.includes("pro plus") || name.includes("pro-plus")) return "pro_plus";
  if (name.includes("business")) return "business";
  return "unknown";
}

/**
 * Permission check result
 */
export type PermissionResult = {
  allowed: boolean;
  reason?: string;
  upgradeMessage?: string;
};

/**
 * Check if user can add a new home
 */
export function canAddHome(
  user: AuthUserType | null | undefined,
  currentHomeCount: number
): PermissionResult {
  if (!user?.subscription?.plan) {
    return {
      allowed: false,
      reason: "No active subscription",
      upgradeMessage: "Please subscribe to a plan to add homes.",
    };
  }

  const plan = user.subscription.plan;
  const maxHomes = plan.maxHomes || 1;
  const planTier = getPlanTier(plan.name);

  // Business plan has unlimited homes (maxHomes should be set to a high number or null)
  if (planTier === "business" && (!maxHomes || maxHomes >= 999)) {
    return {
      allowed: true,
      reason: "Unlimited homes",
      upgradeMessage: "You have unlimited homes for your Business Plan.",
    };
  }

  if (currentHomeCount >= maxHomes) {
    return {
      allowed: false,
      reason: `You've reached the limit of ${maxHomes} home(s) for your plan.`,
      upgradeMessage:
        planTier === "starter"
          ? "Upgrade to Pro Plus or Business Plan to add more homes."
          : "Upgrade to Business Plan for unlimited homes.",
    };
  }

  return { allowed: true };
}

/**
 * Check if user can add a new appliance
 */
export function canAddAppliance(
  user: AuthUserType | null | undefined,
  usage?: UserUsage["appliance"]
): PermissionResult {
  if (!user?.subscription?.plan) {
    return {
      allowed: false,
      reason: "No active subscription",
      upgradeMessage: "Please subscribe to a plan to add appliances.",
    };
  }

  const plan = user.subscription.plan;
  const applianceCredit = plan.applianceCredit;

  // If no limit set (null/undefined), assume unlimited
  if (!applianceCredit) {
    return {
      allowed: false,
      reason: "No appliance limit set",
      upgradeMessage:
        "Please upgrade to a plan with appliance limit or contact support.",
    };
  }

  // Check usage if provided
  if (usage) {
    const { used, allocated } = usage;
    if (used >= allocated) {
      return {
        allowed: false,
        reason: `You've reached your appliance limit of ${allocated}.`,
        upgradeMessage:
          getPlanTier(plan.name) === "starter"
            ? "Upgrade to Pro Plus Plan for 20 appliances or Business Plan for unlimited."
            : "Upgrade to Business Plan for unlimited appliances.",
      };
    }
  }

  return { allowed: true };
}

/**
 * Check if user can add a new document
 */
export function canAddDocument(
  user: AuthUserType | null | undefined,
  usage?: UserUsage["document"]
): PermissionResult {
  if (!user?.subscription?.plan) {
    return {
      allowed: false,
      reason: "No active subscription",
      upgradeMessage: "Please subscribe to a plan to upload documents.",
    };
  }

  const plan = user.subscription.plan;
  const documentCredit = plan.documentCredit;

  // If no limit set (null/undefined), assume unlimited
  if (!documentCredit) {
    return { allowed: true };
  }

  // Check usage if provided
  if (usage) {
    const { used, allocated } = usage;
    if (used >= allocated) {
      return {
        allowed: false,
        reason: `You've reached your document limit of ${allocated}.`,
        upgradeMessage:
          getPlanTier(plan.name) === "starter"
            ? "Upgrade to Pro Plus Plan for 25 documents or Business Plan for unlimited."
            : "Upgrade to Business Plan for unlimited documents.",
      };
    }
  }

  return { allowed: true };
}

/**
 * Check if user can perform AI Public Record Retrieval
 */
export function canPerformAIQuery(
  user: AuthUserType | null | undefined,
  usage?: UserUsage["ai_query"]
): PermissionResult {
  if (!user?.subscription?.plan) {
    return {
      allowed: false,
      reason: "No active subscription",
      upgradeMessage: "Please subscribe to a plan to use AI queries.",
    };
  }

  const plan = user.subscription.plan;
  const aiQueryCredit = plan.aiQueryCredit;

  // If no limit set (null/undefined), assume unlimited
  if (!aiQueryCredit) {
    return {
      allowed: false,
      reason: "No AI query limit set",
      upgradeMessage:
        "Please upgrade to a plan with AI query limit or contact support.",
    };
  }

  // Check usage if provided
  if (usage) {
    const { used, allocated } = usage;
    if (used >= allocated) {
      return {
        allowed: false,
        reason: `You've reached your monthly AI query limit of ${allocated}.`,
        upgradeMessage:
          getPlanTier(plan.name) === "starter"
            ? "Upgrade to Pro Plus Plan for 20 queries/month or Business Plan for unlimited."
            : "Upgrade to Business Plan for unlimited AI queries.",
      };
    }
  }

  return { allowed: true };
}

/**
 * Check if user can create custom maintenance tasks
 */
export function canCreateCustomTask(
  user: AuthUserType | null | undefined
): PermissionResult {
  if (!user?.subscription?.plan) {
    return {
      allowed: false,
      reason: "No active subscription",
      upgradeMessage: "Please subscribe to a plan to create custom tasks.",
    };
  }

  const planTier = getPlanTier(user.subscription.plan.name);

  if (planTier === "starter") {
    return {
      allowed: false,
      reason: "Custom maintenance scheduling is not available in Starter Plan.",
      upgradeMessage:
        "Upgrade to Pro Plus or Business Plan to create custom maintenance tasks.",
    };
  }

  return { allowed: true };
}

/**
 * Check if user can search providers with address
 */
export function canSearchProviders(
  user: AuthUserType | null | undefined
): PermissionResult {
  if (!user?.subscription?.plan) {
    return {
      allowed: false,
      reason: "No active subscription",
      upgradeMessage:
        "Please subscribe to a plan to search or view nearby providers.",
    };
  }

  const planTier = getPlanTier(user.subscription.plan.name);

  if (planTier === "starter") {
    return {
      allowed: false,
      reason: "Nearby provider is not available in Starter Plan.",
      upgradeMessage:
        "Upgrade to Pro Plus or Business Plan to search or view nearby providers.",
    };
  }

  return { allowed: true };
}

/**
 * Check if user can create general maintenance tasks (available in all plans)
 */
export function canCreateGeneralTask(
  user: AuthUserType | null | undefined
): PermissionResult {
  if (!user?.subscription?.plan) {
    return {
      allowed: false,
      reason: "No active subscription",
      upgradeMessage: "Please subscribe to a plan to create tasks.",
    };
  }

  return { allowed: true };
}

/**
 * Get plan limits summary for display
 */
export function getPlanLimits(user: AuthUserType | null | undefined): {
  maxHomes: number | null;
  maxAppliances: number | null;
  maxDocuments: number | null;
  maxAIQueries: number | null;
  customTasks: boolean;
  providerSearch: boolean;
} {
  if (!user?.subscription?.plan) {
    return {
      maxHomes: null,
      maxAppliances: null,
      maxDocuments: null,
      maxAIQueries: null,
      customTasks: false,
      providerSearch: false,
    };
  }

  const plan = user.subscription.plan;
  const planTier = getPlanTier(plan.name);

  return {
    maxHomes: plan.maxHomes || null,
    maxAppliances: plan.applianceCredit || null,
    maxDocuments: plan.documentCredit || null,
    maxAIQueries: plan.aiQueryCredit || null,
    customTasks: planTier !== "starter",
    providerSearch: planTier !== "starter",
  };
}
