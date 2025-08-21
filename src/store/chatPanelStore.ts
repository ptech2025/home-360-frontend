"use client";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface ChatPanelState {
  isChatPanelOpen: boolean;
  setIsChatPanelOpen: (state: boolean) => void;
  isSessionsPanelOpen: boolean;
  setIsSessionsPanelOpen: (state: boolean) => void;
}

export const useChatPanelStore = create<ChatPanelState>()(
  persist(
    (set) => ({
      isChatPanelOpen: true,
      setIsChatPanelOpen: (open) => set({ isChatPanelOpen: open }),
      isSessionsPanelOpen: false,
      setIsSessionsPanelOpen: (open) => set({ isSessionsPanelOpen: open }),
    }),
    {
      name: "panel-state",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        isSessionsPanelOpen: state.isSessionsPanelOpen,
      }),
    }
  )
);
