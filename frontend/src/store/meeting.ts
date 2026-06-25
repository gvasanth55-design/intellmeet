import { create } from 'zustand';

interface MeetingState {
  activeMeetingId: string | null;
  participants: any[];
  isMuted: boolean;
  isVideoOff: boolean;
  isScreenSharing: boolean;
  setActiveMeeting: (id: string | null) => void;
  setParticipants: (participants: any[]) => void;
  toggleMute: () => void;
  toggleVideo: () => void;
  setScreenSharing: (sharing: boolean) => void;
}

export const useMeetingStore = create<MeetingState>((set) => ({
  activeMeetingId: null,
  participants: [],
  isMuted: false,
  isVideoOff: false,
  isScreenSharing: false,
  setActiveMeeting: (id) => set({ activeMeetingId: id }),
  setParticipants: (participants) => set({ participants }),
  toggleMute: () => set((s) => ({ isMuted: !s.isMuted })),
  toggleVideo: () => set((s) => ({ isVideoOff: !s.isVideoOff })),
  setScreenSharing: (sharing) => set({ isScreenSharing: sharing }),
}));
