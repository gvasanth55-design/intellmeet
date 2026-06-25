import { useState } from 'react';
import { Link } from 'react-router-dom';
import { mockMeetings } from '@/mock/meetings';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { StatusBadge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { PageTransition, SlideUp } from '@/components/shared/PageTransition';
import { Plus, Search, CalendarDays, Clock, Users } from 'lucide-react';
import { format } from 'date-fns';

const filters = ['All', 'Live', 'Scheduled', 'Ended'];

export const MeetingsPage = () => {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = mockMeetings.filter(m => {
    const matchesSearch = m.title.toLowerCase().includes(search.toLowerCase()) || m.hostName.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = activeFilter === 'All' || m.status === activeFilter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  return (
    <PageTransition>
      <div className="space-y-6">
        <SlideUp>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[var(--text-primary)]">Meetings</h1>
              <p className="mt-1 text-sm text-[var(--text-muted)]">Manage and join your meetings.</p>
            </div>
            <Button><Plus className="h-4 w-4" />New Meeting</Button>
          </div>
        </SlideUp>

        <SlideUp delay={0.1}>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-disabled)]" />
              <input
                type="text" placeholder="Search meetings..."
                value={search} onChange={(e) => setSearch(e.target.value)}
                className="block w-full rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)] py-2.5 pl-10 pr-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-disabled)] transition-all duration-200 focus:border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-200/30"
              />
            </div>
            <div className="flex gap-1 rounded-xl bg-[var(--bg-surface)] p-1">
              {filters.map(f => (
                <button key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`rounded-lg px-3.5 py-1.5 text-xs font-medium transition-all duration-200 ${
                    activeFilter === f ? 'bg-[var(--bg-card)] text-brand-500 shadow-sm' : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
                  }`}
                >{f}</button>
              ))}
            </div>
          </div>
        </SlideUp>

        <div className="space-y-3">
          {filtered.map((meeting, i) => (
            <SlideUp key={meeting.id} delay={0.2 + i * 0.06}>
              <Link to={`/meeting/${meeting.id}`}>
                <Card className="group transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
                  <CardContent className="flex items-center gap-4 p-4 sm:gap-5">
                    <Avatar name={meeting.hostName} size="lg" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold text-[var(--text-primary)]">{meeting.title}</h3>
                        <StatusBadge status={meeting.status} />
                      </div>
                      <p className="mt-1 text-sm text-[var(--text-muted)] line-clamp-1">{meeting.description}</p>
                      <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-[var(--text-disabled)]">
                        <span className="flex items-center gap-1.5"><CalendarDays className="h-3.5 w-3.5" />{format(new Date(meeting.startTime), 'MMM d, yyyy')}</span>
                        <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{format(new Date(meeting.startTime), 'h:mm a')}</span>
                        <span className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5" />{meeting.participantCount} participants</span>
                      </div>
                    </div>
                    <div className="shrink-0">
                      {meeting.status === 'live' && <Button size="sm">Join Now</Button>}
                      {meeting.status === 'scheduled' && <Button variant="outline" size="sm">Details</Button>}
                      {meeting.status === 'ended' && <Button variant="ghost" size="sm">Summary</Button>}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </SlideUp>
          ))}
        </div>
      </div>
    </PageTransition>
  );
};
