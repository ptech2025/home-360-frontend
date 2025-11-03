"use client";
import { ProviderType } from "@/types/prisma-schema-types";
import { create } from "zustand";

export interface GoogleFilterState {
  search: string | undefined;
  setSearch: (search: string) => void;
  clearAll: () => void;
  category: ProviderType;
  setCategory: (category: ProviderType) => void;
  rating: number | undefined;
  setRating: (rating: number) => void;
}

export const useGoogleFilterStore = create<GoogleFilterState>()((set) => ({
  
}));
