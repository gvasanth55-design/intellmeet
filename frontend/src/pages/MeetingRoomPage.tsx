import { useParams, Link, useNavigate } from 'react-router-dom';
import { getMeetingById } from '@/mock/meetings';
import { mockMessages } from '@/mock/messages';
import { useMeetingStore } from '@/store/meeting';
import { useUIStore } from '@/store/ui';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { Mic, MicOff, Video, VideoOff, Monitor, MessageSquare, Users, PhoneOff, ChevronLeft } from 'lucide-react';
import { useState } from 'react';

export const MeetingRoomPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const meeting = getMeetingById(id || '');
  const { isMuted, isVideoOff, toggleMute, toggleVideo, isScreenSharing, setScreenSharing } = useMeetingStore();
  const { chatPanelOpen, participantPanelOpen, toggleChatPanel, toggleParticipantPanel } = useUIStore();
  const [msg, setMsg] = useState('');

  if (!meeting) return <div className="flex h-full items-center justify-center text-gray-500">Meeting not found</div>;

  const chatMessages = mockMessages.filter(m => m.meetingId === meeting.id);

  const handleEnd = () => {
    navigate('/meetings');
  };

  return (
    <div className="flex h-full flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between border-b border-gray-200 bg-white p-3 dark:border-gray-700 dark:bg-gray-950">
        <div className="flex items-center gap-3">
          <Link to="/meetings"><Button variant="ghost" size="sm"><ChevronLeft className="h-4 w-4 mr-1" />Back</Button></Link>
          <div>
            <h1 className="font-semibold text-gray-900 dark:text-white">{meeting.title}</h1>
            <p className="text-xs text-gray-500">{meeting.participants.length} participants</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="success">Recording</Badge>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Main video grid */}
        <div className="flex-1 overflow-y-auto bg-gray-900 p-4">
          <div className="grid gap-4 sm:grid-cols-2">
            {meeting.participants.map((p) => (
              <div key={p.id} className="relative flex aspect-video items-center justify-center rounded-xl bg-gray-800">
                <Avatar name={p.name} size="xl" />
                <div className="absolute bottom-2 left-2 flex items-center gap-2">
                  <span className="rounded bg-black/60 px-2 py-0.5 text-xs text-white">{p.name}</span>
                  {p.id === meeting.hostId && <span className="rounded bg-yellow-500/80 px-1.5 py-0.5 text-xs text-white">Host</span>}
                </div>
                <div className="absolute bottom-2 right-2 flex gap-1">
                  {p.isMuted ? <MicOff className="h-4 w-4 text-red-400" /> : <Mic className="h-4 w-4 text-green-400" />}
                  {!p.isVideoOn && <VideoOff className="h-4 w-4 text-red-400" />}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat panel */}
        {chatPanelOpen && (
          <div className="flex w-80 flex-col border-l border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-950">
            <div className="flex items-center justify-between border-b border-gray-200 p-3 dark:border-gray-700">
              <span className="font-medium text-gray-900 dark:text-white">Chat</span>
              <Button variant="ghost" size="sm" onClick={toggleChatPanel}>✕</Button>
            </div>
            <div className="flex-1 overflow-y-auto space-y-3 p-3">
              {chatMessages.map(m => (
                <div key={m.id} className="text-sm">
                  <span className="font-medium text-gray-900 dark:text-white">{m.senderName}</span>
                  <p className="text-gray-600 dark:text-gray-400">{m.text}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-200 p-3 dark:border-gray-700">
              <input
                value={msg} onChange={(e) => setMsg(e.target.value)}
                placeholder="Type a message..."
                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm outline-hidden focus:border-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
              />
            </div>
          </div>
        )}

        {/* Participants panel */}
        {participantPanelOpen && (
          <div className="w-72 border-l border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-950">
            <div className="flex items-center justify-between mb-4">
              <span className="font-medium text-gray-900 dark:text-white">Participants ({meeting.participants.length})</span>
              <Button variant="ghost" size="sm" onClick={toggleParticipantPanel}>✕</Button>
            </div>
            <div className="space-y-2">
              {meeting.participants.map(p => (
                <div key={p.id} className="flex items-center gap-2 rounded-lg p-2 hover:bg-gray-50 dark:hover:bg-gray-800">
                  <Avatar name={p.name} size="sm" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">{p.name}</p>
                    <p className="text-xs text-gray-400">{p.role}</p>
                  </div>
                  {p.isMuted ? <MicOff className="h-3.5 w-3.5 text-red-400" /> : <Mic className="h-3.5 w-3.5 text-green-400" />}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Controls bar */}
      <div className="flex items-center justify-center gap-4 border-t border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-950">
        <button onClick={toggleMute} className={`rounded-full p-3 ${isMuted ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'}`}>
          {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
        </button>
        <button onClick={toggleVideo} className={`rounded-full p-3 ${isVideoOff ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'}`}>
          {isVideoOff ? <VideoOff className="h-5 w-5" /> : <Video className="h-5 w-5" />}
        </button>
        <button onClick={() => setScreenSharing(!isScreenSharing)} className={`rounded-full p-3 ${isScreenSharing ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'}`}>
          <Monitor className="h-5 w-5" />
        </button>
        <button onClick={toggleChatPanel} className={`rounded-full p-3 ${chatPanelOpen ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'}`}>
          <MessageSquare className="h-5 w-5" />
        </button>
        <button onClick={toggleParticipantPanel} className={`rounded-full p-3 ${participantPanelOpen ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'}`}>
          <Users className="h-5 w-5" />
        </button>
        <button onClick={handleEnd} className="rounded-full bg-red-500 p-3 text-white hover:bg-red-600">
          <PhoneOff className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};
