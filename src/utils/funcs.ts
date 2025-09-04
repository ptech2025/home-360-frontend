
import { MyUIMessage } from "@/types/message-schema";
import { createIdGenerator } from "ai";

const messageId = createIdGenerator({
  prefix: "msgc",
  size: 16,
});
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

export const getChatHeading = (
  firstMessage: MyUIMessage | null,
  inPanel: boolean
): string => {
  if (firstMessage) {
    const firstPart = firstMessage.parts[0];
    if (firstPart.type === "text") {
      return firstPart.text;
    }
  }
  return inPanel ? "New Chat" : "Untitled Chat";
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

export function generateUserTempMessage(
  prompt: string,
  sessionId: string
): MyUIMessage {
  const temporaryMessage: MyUIMessage = {
    id: messageId(),
    role: "user",
    parts: [{ type: "text", text: prompt }],
    metadata: {
      sessionId,
      createdAt: new Date(),
      confidence: "medium",
    },
  };
  return temporaryMessage;
}

export function formatNameWithDot(name: string): string {
  const parts = name.trim().split(/\s+/);

  if (parts.length === 0) return "";

  const firstInitial = parts[0][0].toUpperCase();
  const lastName = parts.length > 1 ? parts[1].toLowerCase() : "";

  return lastName ? `${firstInitial}.${lastName}` : firstInitial;
}
