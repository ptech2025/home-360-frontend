"use client";
import { ProviderType } from "@/types/prisma-schema-types";
import { create } from "zustand";

export interface ServiceProviderState {
  mode: "saved" | "hired" | "nearby";
  setMode: (mode: "saved" | "hired" | "nearby") => void;
  search: string | undefined;
  setSearch: (search: string) => void;
  clearAll: () => void;
  category: ProviderType;
  setCategory: (category: ProviderType) => void;
  rating: number | undefined;
  setRating: (rating: number) => void;
}

export const useServiceProviderStore = create<ServiceProviderState>()(
  (set) => ({
    mode: "saved",
    setMode: (mode) => set({ mode }),
    search: undefined,
    setSearch: (search) => set({ search }),
    clearAll: () =>
      set({
        search: undefined,
        category: ProviderType.plumbing,
        rating: 1,
      }),
    category: ProviderType.plumbing,
    setCategory: (category) => set({ category }),
    rating: 1,
    setRating: (rating) => set({ rating }),
  })
);
