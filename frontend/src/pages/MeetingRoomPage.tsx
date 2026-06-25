import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getMeetingById } from '@/mock/meetings';
import { mockMessages } from '@/mock/messages';
import { useMeetingStore } from '@/store/meeting';
import { useUIStore } from '@/store/ui';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { PageTransition } from '@/components/shared/PageTransition';
import {
  Mic, MicOff, Video, VideoOff, Monitor, MessageSquare, Users,
  PhoneOff, ChevronLeft,
} from 'lucide-react';
import { useState, useMemo } from 'react';

export const MeetingRoomPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const meeting = getMeetingById(id || '');
  const { isMuted, isVideoOff, toggleMute, toggleVideo, isScreenSharing, setScreenSharing } = useMeetingStore();
  const { chatPanelOpen, participantPanelOpen, toggleChatPanel, toggleParticipantPanel } = useUIStore();
  const [msg, setMsg] = useState('');

  const chatMessages = useMemo(() => mockMessages.filter(m => m.meetingId === meeting?.id), [meeting?.id]);
  const handleEnd = () => navigate('/meetings');

  if (!meeting) return (
    <div className="flex h-full items-center justify-center">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-[var(--text-primary)]">Meeting not found</h2>
        <Link to="/meetings"><Button variant="ghost" className="mt-4">Back to Meetings</Button></Link>
      </div>
    </div>
  );

  return (
    <PageTransition>
      <div className="flex h-full flex-col rounded-2xl overflow-hidden border border-[var(--border-default)] bg-[var(--bg-card)]">
        <div className="flex items-center justify-between border-b border-[var(--border-divider)] bg-[var(--bg-surface)] p-3">
          <div className="flex items-center gap-3">
            <Link to="/meetings"><Button variant="ghost" size="sm"><ChevronLeft className="h-4 w-4 mr-1" />Back</Button></Link>
            <div>
              <h1 className="font-semibold text-[var(--text-primary)]">{meeting.title}</h1>
              <p className="text-xs text-[var(--text-muted)]">{meeting.participants.length} participants</p>
            </div>
          </div>
          <Badge variant="success" dot>Recording</Badge>
        </div>

        <div className="flex flex-1 overflow-hidden">
          <div className="flex-1 overflow-y-auto bg-grey-900 p-4">
            <div className="grid gap-3 sm:grid-cols-2">
              {meeting.participants.map((p, i) => (
                <motion.div key={p.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.08 }}
                  className="relative flex aspect-video items-center justify-center rounded-2xl bg-gradient-to-br from-grey-800 to-grey-900 border border-white/5 overflow-hidden"
                >
                  <Avatar name={p.name} size="xl" />
                  <div className="absolute bottom-2 left-2 flex items-center gap-2">
                    <span className="rounded-lg bg-black/60 backdrop-blur-sm px-2.5 py-1 text-xs text-white">{p.name}</span>
                    {p.id === meeting.hostId && <span className="rounded-lg bg-gradient-to-r from-amber-500/80 to-orange-500/80 px-2 py-1 text-[10px] font-medium text-white">Host</span>}
                  </div>
                  <div className="absolute bottom-2 right-2 flex gap-1">
                    <div className={`rounded-lg p-1.5 backdrop-blur-sm ${p.isMuted ? 'bg-red-500/60' : 'bg-white/10'}`}>
                      {p.isMuted ? <MicOff className="h-3.5 w-3.5 text-white" /> : <Mic className="h-3.5 w-3.5 text-green-400" />}
                    </div>
                    <div className={`rounded-lg p-1.5 backdrop-blur-sm ${!p.isVideoOn ? 'bg-red-500/60' : 'bg-white/10'}`}>
                      {!p.isVideoOn ? <VideoOff className="h-3.5 w-3.5 text-white" /> : <Video className="h-3.5 w-3.5 text-green-400" />}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {chatPanelOpen && (
            <div className="flex w-80 flex-col border-l border-[var(--border-divider)] bg-[var(--bg-card)] animate-fade-in">
              <div className="flex items-center justify-between border-b border-[var(--border-divider)] p-3">
                <span className="font-medium text-[var(--text-primary)]">Chat</span>
                <Button variant="ghost" size="sm" onClick={toggleChatPanel}>✕</Button>
              </div>
              <div className="flex-1 overflow-y-auto space-y-3 p-3">
                {chatMessages.map(m => (
                  <div key={m.id}>
                    <span className="text-xs font-medium text-brand-500">{m.senderName}</span>
                    <p className="mt-0.5 text-sm text-[var(--text-secondary)]">{m.text}</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-[var(--border-divider)] p-3">
                <input value={msg} onChange={(e) => setMsg(e.target.value)}
                  placeholder="Type a message..."
                  className="w-full rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] px-3.5 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-disabled)] outline-none focus:border-brand-300 focus:ring-2 focus:ring-brand-200/30 transition-all duration-200"
                />
              </div>
            </div>
          )}

          {participantPanelOpen && (
            <div className="w-72 border-l border-[var(--border-divider)] bg-[var(--bg-card)] p-4 animate-fade-in">
              <div className="flex items-center justify-between mb-4">
                <span className="font-medium text-[var(--text-primary)]">Participants ({meeting.participants.length})</span>
                <Button variant="ghost" size="sm" onClick={toggleParticipantPanel}>✕</Button>
              </div>
              <div className="space-y-1.5">
                {meeting.participants.map(p => (
                  <div key={p.id} className="flex items-center gap-3 rounded-xl p-2.5 transition-colors hover:bg-[var(--hover-bg)]">
                    <Avatar name={p.name} size="sm" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[var(--text-primary)] truncate">{p.name}</p>
                      <p className="text-xs text-[var(--text-muted)]">{p.role}</p>
                    </div>
                    {p.isMuted ? <MicOff className="h-3.5 w-3.5 text-danger" /> : <Mic className="h-3.5 w-3.5 text-success" />}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-center gap-3 border-t border-[var(--border-divider)] bg-[var(--bg-surface)] p-4">
          <ControlBtn icon={isMuted ? MicOff : Mic} active={!isMuted} danger={isMuted} onClick={toggleMute} />
          <ControlBtn icon={isVideoOff ? VideoOff : Video} active={!isVideoOff} danger={isVideoOff} onClick={toggleVideo} />
          <ControlBtn icon={Monitor} active={isScreenSharing} onClick={() => setScreenSharing(!isScreenSharing)} />
          <ControlBtn icon={MessageSquare} active={chatPanelOpen} onClick={toggleChatPanel} />
          <ControlBtn icon={Users} active={participantPanelOpen} onClick={toggleParticipantPanel} />
          <button onClick={handleEnd} className="rounded-xl bg-danger p-3 text-white shadow-sm transition-all duration-200 hover:bg-red-600 hover:scale-105 active:scale-95">
            <PhoneOff className="h-5 w-5" />
          </button>
        </div>
      </div>
    </PageTransition>
  );
};

const ControlBtn = ({ icon: Icon, active, danger, onClick }: { icon: any; active: boolean; danger?: boolean; onClick: () => void }) => (
  <motion.button whileTap={{ scale: 0.9 }}
    onClick={onClick}
    className={`rounded-xl p-3 transition-all duration-200 ${
      danger ? 'bg-danger/80 text-white' : active ? 'bg-brand-500/80 text-white' : 'bg-[var(--bg-card)] text-[var(--text-muted)] hover:bg-[var(--hover-bg)]'
    }`}
  >
    <Icon className="h-5 w-5" />
  </motion.button>
);
