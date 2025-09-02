"use client";
import { EstimateLineItem } from "@/types/estimate";
import { create } from "zustand";

export interface EstimatePanelState {
  estimatePanel: {
    isOpen: boolean;
    mode: "edit" | "add";
  };
  setEstimatePanel: (state: EstimatePanelState["estimatePanel"]) => void;
  estimateData: {
    lineItems: EstimateLineItem | null;
  };
  setEstimateData: (state: EstimatePanelState["estimateData"]) => void;
  estimateMode: "edit" | "preview";
  setEstimateMode: (state: "edit" | "preview") => void;
}

export const useEstimatePanelStore = create<EstimatePanelState>()((set) => ({
  estimatePanel: {
    isOpen: false,
    mode: "add",
  },
  setEstimatePanel: (state) => set({ estimatePanel: state }),
  estimateData: {
    lineItems: null,
  },
  setEstimateData: (state) => set({ estimateData: state }),
  estimateMode: "edit",
  setEstimateMode: (state) => set({ estimateMode: state }),
}));
