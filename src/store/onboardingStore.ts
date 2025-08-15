"use client";
import { create } from "zustand";

export interface OnboardingState {
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

export const useOnboardingStore = create<OnboardingState>()((set) => ({
  currentPage: 1,
  setCurrentPage: (page) => set({ currentPage: page }),
}));
