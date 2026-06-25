export interface Meeting {
  id: string;
  title: string;
  description?: string;
  hostId: string;
  status: 'scheduled' | 'live' | 'ended' | 'cancelled';
  startTime: string;
  endTime?: string;
  participants: Participant[];
  recording?: boolean;
  transcript?: string;
  summary?: string;
  createdAt: string;
}

export interface Participant {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  joinedAt: string;
  isMuted: boolean;
  isVideoOn: boolean;
  role: 'host' | 'co-host' | 'participant';
}
