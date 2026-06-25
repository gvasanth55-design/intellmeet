import { useState } from 'react';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { PageTransition, SlideUp } from '@/components/shared/PageTransition';
import { mockUsers } from '@/mock/users';
import { Search, Send, Paperclip, Smile, MoreVertical, Phone, Video } from 'lucide-react';

const conversations = [
  { id: 'c1', user: mockUsers[1], lastMsg: 'Sounds good! See you at the meeting.', time: '2m ago', unread: 2, online: true },
  { id: 'c2', user: mockUsers[2], lastMsg: 'The design mockups are ready for review.', time: '1h ago', unread: 0, online: true },
  { id: 'c3', user: mockUsers[3], lastMsg: 'Can you check the PR I just opened?', time: '3h ago', unread: 1, online: false },
  { id: 'c4', user: mockUsers[4], lastMsg: 'Meeting summary has been generated.', time: '1d ago', unread: 0, online: false },
];

export const MessagesPage = () => {
  const [active, setActive] = useState(conversations[0]);
  const [msg, setMsg] = useState('');

  return (
    <PageTransition>
      <div className="flex h-[calc(100vh-8rem)] rounded-2xl border border-[var(--border-default)] bg-[var(--bg-card)] overflow-hidden">
        {/* Left panel */}
        <div className="w-80 border-r border-[var(--border-divider)] flex flex-col shrink-0">
          <div className="p-4 border-b border-[var(--border-divider)]">
            <h2 className="text-base font-semibold text-[var(--text-primary)] mb-3">Messages</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-disabled)]" />
              <input type="text" placeholder="Search conversations..."
                className="w-full rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] py-2 pl-9 pr-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-disabled)] outline-none focus:border-brand-300 focus:ring-2 focus:ring-brand-200/30 transition-all duration-200"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {conversations.map(c => (
              <button key={c.id} onClick={() => setActive(c)}
                className={`w-full flex items-center gap-3 px-4 py-3.5 transition-colors text-left ${
                  active.id === c.id ? 'bg-brand-50 dark:bg-brand-900/20' : 'hover:bg-[var(--hover-bg)]'
                }`}
              >
                <Avatar name={c.user.name} size="md" status={c.online ? 'online' : 'offline'} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-[var(--text-primary)]">{c.user.name}</span>
                    <span className="text-[10px] text-[var(--text-disabled)]">{c.time}</span>
                  </div>
                  <p className="text-xs text-[var(--text-muted)] truncate mt-0.5">{c.lastMsg}</p>
                </div>
                {c.unread > 0 && <Badge variant="brand" size="sm">{c.unread}</Badge>}
              </button>
            ))}
          </div>
        </div>

        {/* Right panel */}
        <div className="flex-1 flex flex-col">
          <div className="flex items-center justify-between px-5 py-3 border-b border-[var(--border-divider)]">
            <div className="flex items-center gap-3">
              <Avatar name={active.user.name} size="sm" status={active.online ? 'online' : 'offline'} />
              <div>
                <p className="text-sm font-medium text-[var(--text-primary)]">{active.user.name}</p>
                <p className="text-xs text-[var(--text-muted)]">{active.online ? 'Online' : 'Offline'}</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button className="rounded-lg p-2 text-[var(--text-muted)] hover:bg-[var(--hover-bg)] transition-colors"><Phone className="h-4 w-4" /></button>
              <button className="rounded-lg p-2 text-[var(--text-muted)] hover:bg-[var(--hover-bg)] transition-colors"><Video className="h-4 w-4" /></button>
              <button className="rounded-lg p-2 text-[var(--text-muted)] hover:bg-[var(--hover-bg)] transition-colors"><MoreVertical className="h-4 w-4" /></button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {[
              { from: 'them', text: 'Hey! How are the sprint plans looking?', time: '10:30 AM' },
              { from: 'me', text: 'Almost done! Just reviewing the last few tickets.', time: '10:32 AM' },
              { from: 'them', text: 'Great, can we go over them in the standup?', time: '10:33 AM' },
              { from: 'me', text: 'Sounds good! See you at the meeting.', time: '10:34 AM' },
              { from: 'them', text: active.lastMsg, time: active.time },
            ].map((m, i) => (
              <div key={i} className={`flex ${m.from === 'me' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[70%] rounded-2xl px-4 py-2.5 ${
                  m.from === 'me'
                    ? 'bg-brand-400 text-white rounded-br-sm'
                    : 'bg-[var(--bg-surface)] text-[var(--text-primary)] rounded-bl-sm'
                }`}>
                  <p className="text-sm">{m.text}</p>
                  <p className={`text-[10px] mt-1 ${m.from === 'me' ? 'text-white/60' : 'text-[var(--text-disabled)]'}`}>{m.time}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-[var(--border-divider)] p-4">
            <div className="flex items-center gap-2">
              <button className="rounded-lg p-2 text-[var(--text-muted)] hover:bg-[var(--hover-bg)] transition-colors"><Paperclip className="h-4 w-4" /></button>
              <input value={msg} onChange={(e) => setMsg(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-disabled)] outline-none focus:border-brand-300 focus:ring-2 focus:ring-brand-200/30 transition-all duration-200"
              />
              <button className="rounded-lg p-2 text-[var(--text-muted)] hover:bg-[var(--hover-bg)] transition-colors"><Smile className="h-4 w-4" /></button>
              <Button size="sm" className="h-10 w-10 p-0"><Send className="h-4 w-4" /></Button>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};
