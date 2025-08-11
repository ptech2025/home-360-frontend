import axios, { AxiosError } from "axios";
import type { ErrorContext } from "better-auth/react";

function isErrorContext(error: unknown): error is ErrorContext {
  return (
    typeof error === "object" &&
    error !== null &&
    "error" in error &&
    (error as any).error instanceof Error
  );
}
export const createAxios = (cookie?: string) => {
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
    headers: cookie ? { Cookie: cookie } : {},
  });
};

export const renderAxiosOrAuthError = (error: unknown): string => {
  if (error instanceof AxiosError) {
    return (
      error.response?.data?.error ||
      error.message ||
      "Request failed. Try again later."
    );
  }

  if (isErrorContext(error)) {
    return error.error?.message || "Authentication error occurred.";
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Something went wrong, try again later.";
};
