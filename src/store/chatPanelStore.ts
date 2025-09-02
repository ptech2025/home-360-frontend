"use client";
import { create } from "zustand";

export interface ChatPanelState {
  isChatPanelOpen: boolean;
  setIsChatPanelOpen: (state: boolean) => void;
  isSessionsPanelOpen: boolean;
  setIsSessionsPanelOpen: (state: boolean) => void;
  isEstimatePanelOpen: boolean;
  setIsEstimatePanelOpen: (state: boolean) => void;
}

export const useChatPanelStore = create<ChatPanelState>()((set) => ({
  isChatPanelOpen: true,
  setIsChatPanelOpen: (open) => set({ isChatPanelOpen: open }),
  isSessionsPanelOpen: false,
  setIsSessionsPanelOpen: (open) => set({ isSessionsPanelOpen: open }),
  isEstimatePanelOpen: false,
  setIsEstimatePanelOpen: (open) => set({ isEstimatePanelOpen: open }),
}));
