import { create } from 'zustand';

interface UIState {
  sidebarOpen: boolean;
  chatPanelOpen: boolean;
  participantPanelOpen: boolean;
  toggleSidebar: () => void;
  toggleChatPanel: () => void;
  toggleParticipantPanel: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: true,
  chatPanelOpen: false,
  participantPanelOpen: false,
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  toggleChatPanel: () => set((s) => ({ chatPanelOpen: !s.chatPanelOpen })),
  toggleParticipantPanel: () => set((s) => ({ participantPanelOpen: !s.participantPanelOpen })),
}));
